import React, { useEffect, useRef } from 'react';

const defaultBrands = [
  { name: 'Toyota' },
  { name: 'Honda' },
  { name: 'Ford' },
  { name: 'BMW' },
  { name: 'Mercedes' },
  { name: 'Audi' },
  { name: 'Nissan' },
  { name: 'Hyundai' },
  { name: 'Kia' },
  { name: 'Volkswagen' },
];

export default function BrandCarousel({ brands = defaultBrands }) {
  const scrollerRef = useRef(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let start = null;
    let raf;
    const speed = 40; // px/sec

    const step = (ts) => {
      if (!start) start = ts;
      const elapsed = (ts - start) / 1000;
      const dist = (elapsed * speed) % (el.scrollWidth / 2);
      el.scrollLeft = dist;
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const items = [...brands, ...brands];

  return (
    <section id="brands" className="w-full">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-lg font-semibold text-gray-800">Popular Brands</h2>
      </div>
      <div className="mt-3">
        <div
          ref={scrollerRef}
          className="relative overflow-hidden whitespace-nowrap border-y border-black/5 py-4 bg-gradient-to-b from-white to-gray-50"
        >
          {items.map((b, idx) => (
            <span
              key={idx}
              className="inline-flex items-center justify-center mx-3 px-4 py-2 rounded-xl bg-white shadow-sm border border-black/5 text-sm font-medium text-gray-800"
            >
              {b.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
