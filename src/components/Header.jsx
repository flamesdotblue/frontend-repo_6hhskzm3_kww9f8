import React from 'react';
import { Car, ShoppingBag } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/40 bg-white/70 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Car className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xl font-bold tracking-tight">AutoParts Reverse Market</p>
            <p className="text-xs text-gray-600 -mt-1">Find parts • Get bids • Get delivered</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <a className="hover:text-black transition" href="#brands">Brands</a>
          <a className="hover:text-black transition" href="#search">VIN Search</a>
          <a className="hover:text-black transition" href="#quotes">Quotes</a>
        </nav>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-black text-white text-sm hover:bg-gray-800 transition">
            <ShoppingBag className="h-4 w-4" />
            Sign in
          </button>
        </div>
      </div>
    </header>
  );
}
