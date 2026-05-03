'use client';
import Image from 'next/image';
import { useSimulation } from '@/lib/simulation-engine';
import { useCart } from '@/lib/cart-store';
import { motion } from 'framer-motion';

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
      whileHover={{ y: -5 }}
      className="product-card group"
    >
      <div className="relative aspect-square mb-2 overflow-hidden rounded-lg bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-2 group-hover:scale-105 transition-transform"
        />
        {product.originalPrice > product.price && (
          <div className="absolute top-2 left-2 bg-[var(--zepto-purple)] text-white text-[10px] font-bold px-2 py-0.5 rounded">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-bold line-clamp-2 min-h-[40px]">{product.name}</h3>
        <p className="text-xs text-gray-500 font-semibold">{product.unit}</p>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <span className="text-sm font-black">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-[10px] text-gray-400 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          
          <button 
            onClick={() => addItem(product)}
            disabled={inventory <= 0}
            className="btn-add"
          >
            {inventory > 0 ? 'ADD' : 'OUT OF STOCK'}
          </button>
        </div>
        
        <div className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Stock: {inventory}
        </div>
      </div>
    </motion.div>
  );
}
