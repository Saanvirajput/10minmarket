import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: any) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCart = create<CartState>((set, get) => ({
  items: [],
  addItem: (product) => {
    const items = get().items;
    const existing = items.find((i) => i.id === product.id);
    if (existing) {
      set({
        items: items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] });
    }
  },
  clearCart: () => set({ items: [] }),
  total: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
}));
