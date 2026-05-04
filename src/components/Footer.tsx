'use client';
import { Globe, MessageCircle, Share2, Activity, MapPin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-white border-t pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black italic tracking-tighter">
              10min<span className="text-[var(--zepto-purple)]">market</span>
            </h2>
            <p className="text-sm text-gray-500 font-bold leading-relaxed">
              Experience the future of grocery delivery. Get your essentials in 10 minutes or less, with FAANG-level engineering reliability.
            </p>
            <div className="flex gap-4">
              {[Globe, MessageCircle, Share2, Activity].map((Icon, i) => (
                <motion.a 
                  key={i}
                  whileHover={{ y: -5, color: '#3C006B' }}
                  href="#" 
                  className="p-3 bg-gray-50 rounded-xl text-gray-400 transition-all"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-gray-400">Useful Links</h3>
            <ul className="space-y-4 text-sm font-bold text-gray-600">
              {['About Us', 'Delivery Areas', 'Careers', 'Customer Support', 'Press Release'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-[var(--zepto-purple)] transition-all flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 bg-gray-200 rounded-full group-hover:bg-[var(--zepto-purple)] transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-gray-400">Categories</h3>
            <ul className="space-y-4 text-sm font-bold text-gray-600">
              {['Fruits & Veggies', 'Dairy & Eggs', 'Snacks & Drinks', 'Household Essentials', 'Personal Care'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-[var(--zepto-purple)] transition-all flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 bg-gray-200 rounded-full group-hover:bg-[var(--zepto-purple)] transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-gray-400">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-50 rounded-xl text-[var(--zepto-purple)]">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Office</p>
                  <p className="text-sm font-bold text-gray-700">BKC, Mumbai, MH, 400051</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-pink-50 rounded-xl text-[var(--zepto-pink)]">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Email</p>
                  <p className="text-sm font-bold text-gray-700">hello@10minmarket.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            © 2026 10minmarket. All Rights Reserved. Engineered for Portfolio.
          </p>
          <div className="flex gap-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <a href="#" className="hover:text-black">Privacy Policy</a>
            <a href="#" className="hover:text-black">Terms of Use</a>
            <a href="#" className="hover:text-black">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
