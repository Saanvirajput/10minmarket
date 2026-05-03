'use client';
import { categories } from '@/lib/seed-data';
import { motion } from 'framer-motion';

export default function CategoryGrid() {
  return (
    <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.05
            }
          }
        }}
        className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4"
      >
        {categories.map((cat) => (
          <motion.div 
            key={cat.id} 
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            className="category-card group"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-purple-100 transition-all duration-300">
              {cat.icon}
            </div>
            <span className="text-xs md:text-sm font-bold text-center mt-2 leading-tight text-gray-700">
              {cat.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
