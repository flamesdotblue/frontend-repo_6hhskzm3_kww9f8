import React, { useMemo, useState } from 'react';
import { BadgeCheck, DollarSign, Wrench, MapPin, Truck } from 'lucide-react';

function PartCard({ part, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group text-left rounded-2xl border transition shadow-sm hover:shadow-md p-4 bg-white/80 backdrop-blur ${
        selected ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-black/5'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{part.category}</p>
          <p className="mt-1 font-semibold text-gray-900">{part.name}</p>
        </div>
        <Wrench className="h-5 w-5 text-indigo-500" />
      </div>
    </button>
  );
}

export default function PartsResults({ vin, parts, selectedPart, onSelectPart }) {
  const [quotes, setQuotes] = useState([]);
  const [chosen, setChosen] = useState(null);
  const [address, setAddress] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const hasResults = parts && parts.length > 0;

  const requestQuotes = () => {
    if (!selectedPart) return;
    // Mock quotes from shops with service charge added by admin
    const base = [120, 145, 160, 175, 200];
    const shops = ['Prime Auto Spares', 'Metro Motors', 'Galaxy Parts', 'RoadPro Supplies', 'RapidFix Auto'];
    const q = base.slice(0, 3 + Math.floor(Math.random() * 3)).map((price, i) => {
      const service = Math.round(price * 0.08);
      return {
        id: `q-${i}`,
        shop: shops[i],
        part: selectedPart.name,
        price,
        service,
        total: price + service,
        eta: `${2 + i}h`,
      };
    });
    setQuotes(q);
    setChosen(null);
    setConfirmed(false);
  };

  const proceedDelivery = () => {
    if (!chosen || !address.trim()) return;
    setConfirmed(true);
  };

  const helper = useMemo(() => {
    if (!vin) return 'Enter a VIN above to see compatible parts.';
    if (!hasResults) return 'No parts yet. Click search to load sample parts.';
    return `${parts.length} compatible parts found for VIN ${vin.slice(0, 8)}…`;
  }, [vin, hasResults, parts]);

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">Results</h2>
        <p className="text-sm text-gray-600">{helper}</p>
      </div>

      {hasResults ? (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {parts.map((p) => (
            <PartCard
              key={p.id}
              part={p}
              selected={selectedPart?.id === p.id}
              onClick={() => onSelectPart?.(p)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-black/10 p-8 text-center text-gray-600 bg-white/60">
          Enter a VIN and click search to preview how the reverse marketplace works.
        </div>
      )}

      {selectedPart && (
        <div className="mt-8 rounded-2xl border border-indigo-200 bg-indigo-50/60 p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-indigo-700">Selected Part</p>
              <p className="text-lg font-semibold text-indigo-900">{selectedPart.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={requestQuotes}
                className="inline-flex items-center gap-2 px-4 h-11 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                <DollarSign className="h-5 w-5" />
                Request Quotes
              </button>
              <button
                onClick={() => onSelectPart(null)}
                className="px-4 h-11 rounded-xl bg-white text-gray-800 border border-black/10 hover:bg-gray-50"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {quotes.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold">Shop Bids</h3>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            {quotes.map((q) => (
              <button
                key={q.id}
                onClick={() => setChosen(q)}
                className={`text-left rounded-2xl border p-4 bg-white hover:shadow-md transition ${
                  chosen?.id === q.id ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-black/5'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{q.shop}</p>
                    <p className="text-sm text-gray-500">{q.part}</p>
                  </div>
                  <BadgeCheck className={`h-5 w-5 ${chosen?.id === q.id ? 'text-emerald-600' : 'text-gray-300'}`} />
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                  <div className="p-3 rounded-xl bg-gray-50 border border-black/5">
                    <p className="text-gray-500">Part</p>
                    <p className="font-semibold">${'{'}q.price{'}'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 border border-black/5">
                    <p className="text-gray-500">Service</p>
                    <p className="font-semibold">${'{'}q.service{'}'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 border border-black/5">
                    <p className="text-gray-500">Total</p>
                    <p className="font-semibold">${'{'}q.total{'}'}</p>
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">ETA delivery: {q.eta}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {chosen && (
        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
          <div className="flex items-center gap-3">
            <Truck className="h-5 w-5 text-emerald-700" />
            <p className="font-semibold text-emerald-900">Delivery details</p>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">Drop-off location</label>
              <div className="mt-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main St, Springfield"
                  className="w-full h-12 pl-10 pr-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 bg-white"
                />
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={proceedDelivery}
                className="w-full h-12 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
              >
                Confirm & Pay ${'{'}chosen.total{'}'}
              </button>
            </div>
          </div>
          {confirmed && (
            <div className="mt-4 text-sm text-emerald-800">
              <p>
                Order confirmed. A delivery driver will pick up from <span className="font-medium">{chosen.shop}</span>
                {' '}and deliver to <span className="font-medium">{address}</span> within <span className="font-medium">{chosen.eta}</span>.
              </p>
          </div>
          )}
        </div>
      )}
    </section>
  );
}
