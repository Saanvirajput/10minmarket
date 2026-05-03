import { create } from 'zustand';

export interface SystemLog {
  id: string;
  service: string;
  message: string;
  timestamp: number;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface SimulationState {
  logs: SystemLog[];
  inventory: Record<string, number>;
  activeSagas: Record<string, string>; // orderId -> status
  addLog: (log: SystemLog) => void;
  setSagaStatus: (orderId: string, status: string) => void;
  updateLocalInventory: (productId: string, stock: number) => void;
  clearLogs: () => void;
  connect: () => void;
}

const BACKEND_URL = 'http://localhost:8080';

export const useSimulation = create<SimulationState>((set, get) => ({
  logs: [],
  activeSagas: {},
  inventory: {}, // Not used locally anymore, but kept for compatibility

  addLog: (log) => {
    set((state) => ({ logs: [log, ...state.logs].slice(0, 50) }));
  },

  setSagaStatus: (orderId, status) => {
    set((state) => ({
      activeSagas: { ...state.activeSagas, [orderId]: status }
    }));
  },

  updateLocalInventory: (productId, stock) => {
    set((state) => ({
      inventory: { ...state.inventory, [productId]: stock }
    }));
  },

  clearLogs: () => set({ logs: [], activeSagas: {}, inventory: {} }),

  connect: () => {
    if (typeof window === 'undefined') return;
    
    console.log('Connecting to Spring Boot Event Stream...');
    const eventSource = new EventSource(`${BACKEND_URL}/api/events`);
    
    eventSource.onmessage = (event) => {
      const log: SystemLog = JSON.parse(event.data);
      get().addLog(log);
      
      // Update Saga status
      if (log.service === 'SAGA') {
        const orderIdMatch = log.message.match(/Order (ORD-[A-Z0-9]+)/);
        const statusMatch = log.message.match(/status: ([A-Z_]+)/);
        if (orderIdMatch && statusMatch) {
          get().setSagaStatus(orderIdMatch[1], statusMatch[1]);
        }
      }

      // Update Inventory status from log messages like "Atomic DECR on stock:p1. New: 49"
      if (log.service === 'REDIS') {
        const stockMatch = log.message.match(/stock:([a-z0-9]+)\. New: (\d+)/);
        if (stockMatch) {
          get().updateLocalInventory(stockMatch[1], parseInt(stockMatch[2]));
        }
      }
    };

    eventSource.onerror = (err) => {
      console.error('SSE Error:', err);
      eventSource.close();
      // Retry connection after 5 seconds
      setTimeout(() => get().connect(), 5000);
    };
  }
}));

export const runOrderSaga = async (orderId: string, items: any[]) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, items }),
    });
    return response.ok;
  } catch (error) {
    console.error('Order API Error:', error);
    return false;
  }
};
