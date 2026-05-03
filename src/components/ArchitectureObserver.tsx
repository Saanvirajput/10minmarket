'use client';
import { useSimulation } from '@/lib/simulation-engine';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Database, Cpu, Activity, ShieldAlert, X } from 'lucide-react';
import { useState } from 'react';

export default function ArchitectureObserver() {
  const { logs, activeSagas, clearLogs } = useSimulation();
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-2xl z-[100] flex items-center gap-2 hover:scale-105 transition-all"
      >
        <Terminal size={20} />
        <span className="text-xs font-bold">System Monitor</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] glass z-[100] rounded-2xl flex flex-col overflow-hidden border-2 border-purple-500/30">
      {/* Header */}
      <div className="bg-black text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu size={18} className="text-green-400" />
          <h2 className="text-xs font-black uppercase tracking-widest">Architecture Observer</h2>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={clearLogs} className="text-[10px] hover:underline">Clear</button>
          <button onClick={() => setIsOpen(false)}><X size={18} /></button>
        </div>
      </div>

      {/* State Overview */}
      <div className="p-3 bg-gray-900 text-[10px] text-gray-400 flex justify-around border-b border-gray-800">
        <div className="flex flex-col items-center">
          <Database size={14} className="mb-1 text-blue-400" />
          <span>REDIS: ACTIVE</span>
        </div>
        <div className="flex flex-col items-center">
          <Activity size={14} className="mb-1 text-purple-400" />
          <span>KAFKA: RUNNING</span>
        </div>
        <div className="flex flex-col items-center">
          <ShieldAlert size={14} className="mb-1 text-red-400" />
          <span>SAGA: READY</span>
        </div>
      </div>

      {/* Logs Window */}
      <div className="flex-1 overflow-y-auto p-3 font-mono text-[11px] bg-black/95">
        <AnimatePresence initial={false}>
          {logs.length === 0 && (
            <div className="text-gray-600 italic mt-4 text-center">Awaiting system events...</div>
          )}
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-2 border-l-2 pl-2"
              style={{ borderColor: getLogColor(log.service) }}
            >
              <div className="flex justify-between items-center opacity-60 mb-0.5">
                <span className="font-bold" style={{ color: getLogColor(log.service) }}>[{log.service}]</span>
                <span>{new Date(log.timestamp).toLocaleTimeString([], { hour12: false, fractionalSecondDigits: 2 } as any)}</span>
              </div>
              <div className={log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-green-400' : 'text-gray-300'}>
                {log.message}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Active Sagas */}
      {Object.keys(activeSagas).length > 0 && (
        <div className="bg-gray-900 p-2 border-t border-gray-800">
          <div className="text-[10px] font-bold text-gray-500 mb-2 px-1 uppercase">Active Saga Transactions</div>
          {Object.entries(activeSagas).map(([id, status]) => (
            <div key={id} className="flex items-center justify-between px-2 py-1 bg-gray-800 rounded mb-1 text-[10px]">
              <span className="text-gray-400">#{id.slice(-6)}</span>
              <span className="text-purple-400 font-bold">{status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getLogColor(service: string) {
  switch (service) {
    case 'KAFKA': return '#A855F7';
    case 'REDIS': return '#EF4444';
    case 'SAGA': return '#3B82F6';
    case 'PAYMENT': return '#F59E0B';
    default: return '#6B7280';
  }
}
