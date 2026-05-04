'use client';
import Image from 'next/image';
import { useSimulation } from '@/lib/simulation-engine';
import { useCart } from '@/lib/cart-store';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface ProductProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    unit: string;
    image: string;
  };
}

export default function ProductCard({ product }: ProductProps) {
  const inventory = useSimulation((state) => state.inventory[product.id] ?? 50);
  const addItem = useCart((state) => state.addItem);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="product-card group relative"
    >
      <div className="relative aspect-square mb-3 overflow-hidden rounded-2xl bg-gray-50 flex items-center justify-center p-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
        />
        {product.originalPrice > product.price && (
          <div className="absolute top-3 left-3 bg-[var(--zepto-purple)] text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-bold text-gray-800 line-clamp-2 min-h-[40px] leading-tight">
          {product.name}
        </h3>
        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">
          {product.unit}
        </p>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-col">
            <span className="text-lg font-black text-black">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-[10px] text-gray-400 line-through font-bold">₹{product.originalPrice}</span>
            )}
          </div>
          
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => addItem(product)}
            disabled={inventory <= 0}
            className="flex items-center gap-1 bg-white border-2 border-[var(--zepto-pink)] text-[var(--zepto-pink)] px-4 py-2 rounded-xl font-black text-xs hover:bg-[var(--zepto-pink)] hover:text-white transition-all disabled:opacity-30 shadow-sm"
          >
            {inventory > 0 ? (
              <>
                <Plus size={14} strokeWidth={3} />
                ADD
              </>
            ) : 'OUT OF STOCK'}
          </motion.button>
        </div>
        
        <div className="mt-3 flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${inventory > 10 ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
            {inventory > 0 ? `${inventory} in stock` : 'Out of stock'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
