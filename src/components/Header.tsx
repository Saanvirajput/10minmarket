'use client';
import { useState, useEffect } from 'react';
import { Search, User, MapPin, ChevronDown, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import { useAuth } from '@/lib/auth-store';
import LoginModal from './LoginModal';
import { motion } from 'framer-motion';

interface HeaderProps {
  onSearchChange?: (query: string) => void;
  onOpenCart?: () => void;
  onReset?: () => void;
}

export default function Header({ onSearchChange, onOpenCart, onReset }: HeaderProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [location, setLocation] = useState('Mumbai, Maharashtra');
  const itemsCount = useCart((state) => state.items.length);
  const total = useCart((state) => state.total());
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          const address = data.address.suburb || data.address.neighbourhood || data.address.village || data.address.city || 'Mumbai';
          setLocation(`${address}, ${data.address.state || 'Maharashtra'}`);
        } catch {
          setLocation(`Mumbai, ${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
        }
      });
    }
  }, []);

  return (
    <>
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-[100] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center gap-4 md:gap-8">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex-shrink-0 cursor-pointer" 
            onClick={onReset}
          >
            <h1 className="text-2xl font-black text-black italic tracking-tighter flex items-center gap-1">
              10min<span className="text-[var(--zepto-purple)]">market</span>
            </h1>
          </motion.div>

          {/* Location Selector */}
          <div className="hidden lg:flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-2xl cursor-pointer hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200">
            <div className="bg-[var(--zepto-purple)] p-1.5 rounded-lg text-white">
              <MapPin size={16} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">Delivery in 10 mins</span>
                <ChevronDown size={12} className="text-[var(--zepto-pink)]" />
              </div>
              <span className="text-xs font-black truncate max-w-[150px]">{location}</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-grow max-w-2xl relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--zepto-purple)] transition-colors">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder='Search for "milk", "bread", or "eggs"'
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full bg-gray-50 pl-12 pr-4 py-3.5 rounded-2xl border-2 border-transparent focus:border-[var(--zepto-purple)] focus:bg-white outline-none font-bold text-sm transition-all shadow-sm"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            {isAuthenticated ? (
              <div className="group relative">
                <button className="flex items-center gap-2 font-black text-sm hover:text-[var(--zepto-purple)] transition-colors">
                  <div className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 border border-purple-200">
                    <User size={20} />
                  </div>
                  <span className="hidden md:inline">{user?.name}</span>
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="px-4 py-2 border-b mb-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase">My Account</p>
                    <p className="text-xs font-bold truncate">{user?.phoneNumber}</p>
                  </div>
                  <button onClick={logout} className="w-full text-left px-4 py-2 text-xs font-black text-red-600 hover:bg-red-50 rounded-xl transition-all">Logout</button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="font-black text-sm hover:text-[var(--zepto-purple)] transition-all flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-2xl border border-transparent hover:border-gray-200"
              >
                <User size={20} />
                <span className="hidden md:inline">Login</span>
              </button>
            )}
            
            <button 
              onClick={onOpenCart}
              className="bg-[var(--zepto-purple)] text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-3 hover:shadow-xl hover:shadow-purple-200 active:scale-95 transition-all"
            >
              <div className="relative">
                <ShoppingBag size={20} />
                {itemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--zepto-pink)] text-[8px] w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-[var(--zepto-purple)]">
                    {itemsCount}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] opacity-60 uppercase font-bold">My Cart</span>
                <span className="text-xs">₹{total}</span>
              </div>
            </button>
          </div>
        </div>
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
