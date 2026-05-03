'use client';
import Header from '@/components/Header';
import CategoryGrid from '@/components/CategoryGrid';
import ProductCard from '@/components/ProductCard';
import ArchitectureObserver from '@/components/ArchitectureObserver';
import { products } from '@/lib/seed-data';
import { runOrderSaga, useSimulation } from '@/lib/simulation-engine';
import { useCart } from '@/lib/cart-store';
import { ShoppingBag, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const { items, total, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const connect = useSimulation((state) => state.connect);

  useEffect(() => {
    connect();
  }, [connect]);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    const orderId = `ORD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    const success = await runOrderSaga(orderId, items);
    if (success) {
      clearCart();
      alert(`Order ${orderId} placed successfully! Check the system monitor for details.`);
    } else {
      alert(`Order failed. The Saga pattern successfully rolled back all changes.`);
    }
    setIsProcessing(false);
  };

  return (
    <main className="min-h-screen bg-[#F3F4F6]">
      <Header />
      
      {/* Banner */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-purple-100 rounded-3xl p-8 relative overflow-hidden h-48 md:h-64 flex flex-col justify-center cursor-pointer shadow-sm hover:shadow-md transition-all"
          >
            <h2 className="text-3xl font-black text-purple-900 leading-tight">
              ALL <span className="text-purple-600">NEW ZEPTO</span><br />EXPERIENCE
            </h2>
            <div className="flex gap-4 mt-4 text-xs font-bold text-purple-700">
              <span className="flex items-center gap-1"><Zap size={12} fill="currentColor" /> ₹0 Handling Fee</span>
              <span className="flex items-center gap-1"><Zap size={12} fill="currentColor" /> ₹0 Delivery Fee</span>
            </div>
            <Zap className="absolute right-0 bottom-0 text-purple-200/50" size={240} style={{ transform: 'translate(20%, 20%) rotate(-15deg)' }} />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-blue-900 rounded-3xl p-8 relative overflow-hidden h-48 md:h-64 flex flex-col justify-center text-white cursor-pointer shadow-sm hover:shadow-md transition-all"
          >
            <h2 className="text-3xl font-black leading-tight">
              Paan Corner
            </h2>
            <p className="text-sm opacity-80 mt-2">Get smoking accessories & more<br />in Minutes with 10minmarket!</p>
            <button className="bg-white text-blue-900 font-black px-6 py-3 rounded-xl mt-6 w-fit hover:bg-opacity-90 active:scale-95 transition-all">Order now</button>
            <div className="absolute right-[-20px] top-[-20px] w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      <CategoryGrid />

      {/* Featured Products */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto pb-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black">Laundry Care</h2>
          <button className="text-[var(--zepto-pink)] font-bold">See All &gt;</button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {products.filter(p => p.category === 'laundry').map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex items-center justify-between mb-6 mt-12">
          <h2 className="text-2xl font-black">Dairy, Bread & Eggs</h2>
          <button className="text-[var(--zepto-pink)] font-bold">See All &gt;</button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {products.filter(p => p.category === 'dairy').map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Floating Checkout Bar */}
      {items.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg bg-[var(--zepto-purple)] text-white p-4 rounded-2xl shadow-2xl z-[90] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <ShoppingBag size={24} />
            </div>
            <div>
              <div className="text-sm font-bold">{items.length} Items</div>
              <div className="text-xs opacity-70">₹{total()} + Taxes</div>
            </div>
          </div>
          <button 
            onClick={handleCheckout}
            disabled={isProcessing}
            className="bg-white text-[var(--zepto-purple)] px-8 py-3 rounded-xl font-black text-sm uppercase tracking-wider flex items-center gap-2"
          >
            {isProcessing ? 'Processing...' : 'Checkout'}
            <Zap size={16} fill="currentColor" />
          </button>
        </div>
      )}

      <ArchitectureObserver />
    </main>
  );
}
