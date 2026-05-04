'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, Zap } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import Image from 'next/image';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
  isProcessing: boolean;
}

export default function CartDrawer({ isOpen, onClose, onCheckout, isProcessing }: CartDrawerProps) {
  const { items, addItem, removeItem, total } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
          />

          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[201] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="bg-[var(--zepto-purple)] p-2 rounded-xl text-white">
                  <ShoppingBag size={20} />
                </div>
                <h2 className="text-xl font-black">My Cart</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-all">
                <X size={24} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <motion.div 
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="w-48 h-48 bg-purple-50 rounded-full flex items-center justify-center text-8xl mb-8 relative"
                  >
                    🛒
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-2 -right-2 text-4xl"
                    >
                      ✨
                    </motion.div>
                  </motion.div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Your cart is feeling light!</h3>
                  <p className="text-sm text-gray-500 font-bold max-w-[240px] leading-relaxed mb-10">
                    Add some items from our freshest collection and get them in 10 minutes.
                  </p>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="bg-[var(--zepto-purple)] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-purple-100"
                  >
                    Browse Categories
                  </motion.button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex items-center gap-4 group"
                  >
                    <div className="relative w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden p-2 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill sizes="80px" className="object-contain p-2" />
                    </div>
                    
                    <div className="flex-grow">
                      <h4 className="text-sm font-bold text-gray-800 leading-tight mb-1">{item.name}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{item.unit}</p>
                      <div className="text-sm font-black mt-1">₹{item.price * item.quantity}</div>
                    </div>

                    <div className="flex flex-col items-center gap-2 bg-gray-50 p-1 rounded-xl">
                      <button 
                        onClick={() => addItem(item)}
                        className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-[var(--zepto-purple)] transition-all"
                      >
                        <Plus size={14} strokeWidth={3} />
                      </button>
                      <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-gray-400 hover:text-red-500 transition-all"
                      >
                        {item.quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} strokeWidth={3} />}
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Checkout Section */}
            {items.length > 0 && (
              <div className="p-8 border-t space-y-6 bg-gray-50">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-bold text-gray-500">
                    <span>Subtotal</span>
                    <span>₹{total()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-gray-500">
                    <span>Delivery Fee</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-xl font-black pt-3 border-t">
                    <span>Total Amount</span>
                    <span>₹{total()}</span>
                  </div>
                </div>

                <button 
                  onClick={onCheckout}
                  disabled={isProcessing}
                  className="w-full bg-[var(--zepto-purple)] text-white py-5 rounded-[24px] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-purple-200 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {isProcessing ? 'Processing Order...' : 'Proceed to Checkout'}
                  {!isProcessing && <Zap size={18} fill="currentColor" />}
                </button>
                
                <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest">
                  Secure checkout powered by 10minmarket
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
