'use client';
import { Search, ShoppingCart, User, MapPin, ChevronDown } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo & Location */}
        <div className="flex items-center gap-6">
          <div className="text-2xl font-black text-[var(--zepto-purple)] tracking-tighter">
            10minmarket
          </div>
          <div className="hidden md:flex flex-col">
            <div className="flex items-center gap-1 text-xs font-bold uppercase text-gray-500">
              Delivery in 10 mins <ChevronDown size={14} />
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold">
              <MapPin size={16} className="text-[var(--zepto-purple)]" />
              Your Location...
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-2xl relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder='Search for "milk"'
            className="w-full bg-gray-100 border-none rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-purple-200 outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6 font-semibold">
          <button className="hidden md:flex items-center gap-2">
            <User size={24} />
            Login
          </button>
          <button className="relative bg-[var(--zepto-purple)] text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-opacity-90 transition-all">
            <ShoppingCart size={20} />
            <span>Cart</span>
          </button>
        </div>
      </div>
    </header>
  );
}
