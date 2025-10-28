import React, { useState } from 'react';
import { Search, ScanLine } from 'lucide-react';

export default function VinSearch({ onSearch }) {
  const [value, setValue] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSearch?.(value.trim());
  };

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-100/60 via-indigo-100/40 to-purple-100/50 rounded-3xl" />
      <div className="relative rounded-3xl border border-black/5 bg-white/70 backdrop-blur p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white flex items-center justify-center">
            <ScanLine className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Search by VIN</h1>
            <p className="text-sm text-gray-600">Enter your vehicle VIN to fetch compatible parts. Input handling will be wired to backend later.</p>
          </div>
        </div>
        <form onSubmit={submit} className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            inputMode="text"
            placeholder="Enter VIN (e.g., 1HGCM82633A004352)"
            value={value}
            onChange={(e) => setValue(e.target.value.toUpperCase())}
            className="flex-1 h-12 px-4 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 bg-white/90"
            aria-label="VIN"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition"
          >
            <Search className="h-5 w-5" />
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
