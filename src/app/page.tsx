'use client';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import ArchitectureObserver from '@/components/ArchitectureObserver';
import { products, categories } from '@/lib/seed-data';
import { runOrderSaga, useSimulation } from '@/lib/simulation-engine';
import { useCart } from '@/lib/cart-store';
import { ShoppingBag, Zap, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { items, total, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const connect = useSimulation((state) => state.connect);

  useEffect(() => {
    connect();
  }, [connect]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory ? p.category === activeCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

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
    <main className="min-h-screen bg-[#F8FAFC]">
      <Header onSearchChange={setSearchQuery} />
      
      {/* Banner - Only show if no search/filter */}
      {!searchQuery && !activeCategory && (
        <section className="px-4 md:px-8 max-w-7xl mx-auto mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.01 }}
              className="bg-purple-100 rounded-[32px] p-10 relative overflow-hidden h-64 md:h-80 flex flex-col justify-center cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="relative z-10">
                <div className="bg-white/50 backdrop-blur-sm w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-purple-700 mb-4">
                  New Launch
                </div>
                <h2 className="text-4xl font-black text-purple-900 leading-none tracking-tighter">
                  THE <span className="text-purple-600 italic">NEXT GEN</span><br />10MIN DELIVERY
                </h2>
                <div className="flex gap-4 mt-6">
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm">
                    <Zap size={14} className="text-purple-600" fill="currentColor" />
                    <span className="text-xs font-black text-purple-900">FREE DELIVERY</span>
                  </div>
                </div>
              </div>
              <Zap className="absolute right-0 bottom-0 text-purple-200/40" size={320} style={{ transform: 'translate(20%, 20%) rotate(-15deg)' }} />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.01 }}
              className="bg-[#101827] rounded-[32px] p-10 relative overflow-hidden h-64 md:h-80 flex flex-col justify-center text-white cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="relative z-10">
                <h2 className="text-4xl font-black leading-none tracking-tighter mb-4">
                  PAAN<br /><span className="text-[var(--zepto-pink)]">CORNER</span>
                </h2>
                <p className="text-sm text-gray-400 font-bold max-w-[200px]">Get smoking accessories & more delivered in 10 minutes.</p>
                <button className="bg-white text-black font-black px-8 py-4 rounded-2xl mt-8 text-sm hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2">
                  Order Now <ChevronRight size={18} />
                </button>
              </div>
              <div className="absolute right-[-40px] top-[-40px] w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]" />
              <div className="absolute left-[40%] bottom-[-20px] w-32 h-32 bg-[var(--zepto-pink)]/20 rounded-full blur-[60px]" />
            </motion.div>
          </div>
        </section>
      )}

      {/* Categories Horizontal Scroll */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col">
            <h2 className="text-2xl font-black tracking-tight">Shop by Category</h2>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Freshest items delivered fast</p>
          </div>
          {activeCategory && (
            <button 
              onClick={() => setActiveCategory(null)}
              className="bg-white border-2 border-gray-100 px-4 py-2 rounded-xl text-xs font-black text-gray-400 hover:text-[var(--zepto-pink)] hover:border-[var(--zepto-pink)] transition-all"
            >
              CLEAR FILTER
            </button>
          )}
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat) => (
            <motion.div 
              key={cat.id} 
              whileHover={{ y: -5 }}
              onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
              className={`flex-shrink-0 cursor-pointer p-2 rounded-[24px] transition-all duration-300 min-w-[120px] flex flex-col items-center border-2 ${activeCategory === cat.id ? 'bg-white border-[var(--zepto-purple)] shadow-xl' : 'bg-transparent border-transparent hover:bg-white/50'}`}
            >
              <div className={`w-20 h-20 rounded-[20px] flex items-center justify-center text-4xl mb-3 transition-all ${activeCategory === cat.id ? 'bg-purple-50' : 'bg-gray-50'}`}>
                {cat.icon}
              </div>
              <span className={`text-[11px] font-black uppercase tracking-tight text-center px-2 leading-tight ${activeCategory === cat.id ? 'text-purple-900' : 'text-gray-500'}`}>
                {cat.name}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Results Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto pb-32 min-h-[500px]">
        <div className="flex items-center justify-between mb-10 bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-50 rounded-xl">
              <SlidersHorizontal size={20} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-black tracking-tight">
              {searchQuery ? `Results for "${searchQuery}"` : activeCategory ? categories.find(c => c.id === activeCategory)?.name : 'All Products'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{filteredProducts.length} items found</span>
          </div>
        </div>
        
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
            >
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-32 bg-white rounded-[40px] border-2 border-dashed border-gray-100"
            >
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-5xl mb-6">🔍</div>
              <h3 className="text-2xl font-black text-gray-800">No matches found</h3>
              <p className="text-gray-400 font-bold mt-2">Try adjusting your search or category filter</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory(null); }}
                className="mt-8 bg-gray-900 text-white px-8 py-3 rounded-2xl font-black text-sm hover:scale-105 transition-all"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Floating Checkout Bar */}
      <AnimatePresence>
        {items.length > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-lg bg-black text-white p-5 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-[90] flex items-center justify-between border border-white/10"
          >
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-2xl">
                <ShoppingBag size={24} className="text-[var(--zepto-pink)]" />
              </div>
              <div className="flex flex-col">
                <div className="text-sm font-black">{items.length} Items</div>
                <div className="text-xs font-bold text-gray-400 italic">Total: ₹{total()}</div>
              </div>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={isProcessing}
              className="bg-[var(--zepto-pink)] text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-pink-500/20"
            >
              {isProcessing ? 'Processing...' : 'Checkout Now'}
              <Zap size={18} fill="currentColor" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <ArchitectureObserver />
    </main>
  );
}
