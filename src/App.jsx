import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import BrandCarousel from './components/BrandCarousel';
import VinSearch from './components/VinSearch';
import PartsResults from './components/PartsResults';

export default function App() {
  const [vin, setVin] = useState('');
  const [parts, setParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);

  const brands = useMemo(
    () => [
      'Toyota',
      'Honda',
      'Ford',
      'BMW',
      'Mercedes',
      'Audi',
      'Nissan',
      'Hyundai',
      'Kia',
      'Volkswagen',
    ],
    []
  );

  const handleSearch = (vinValue) => {
    setVin(vinValue);
    // Mocked parts results for now
    setParts([
      { id: 'prt-1', name: 'Alternator', category: 'Electrical' },
      { id: 'prt-2', name: 'Brake Pads (Front)', category: 'Brakes' },
      { id: 'prt-3', name: 'Oil Filter', category: 'Engine' },
      { id: 'prt-4', name: 'Spark Plug Set', category: 'Ignition' },
      { id: 'prt-5', name: 'Radiator Hose', category: 'Cooling' },
      { id: 'prt-6', name: 'Headlight Assembly (Left)', category: 'Lighting' },
      { id: 'prt-7', name: 'Air Filter', category: 'Intake' },
      { id: 'prt-8', name: 'Fuel Pump', category: 'Fuel System' },
    ]);
    setSelectedPart(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-gray-900">
      <Header />
      <main className="max-w-6xl mx-auto px-4 pb-24">
        <div className="pt-10" id="search">
          <VinSearch onSearch={handleSearch} />
        </div>

        <div className="mt-10" id="brands">
          <BrandCarousel brands={brands.map((b) => ({ name: b }))} />
        </div>

        <div className="mt-12" id="quotes">
          <PartsResults
            vin={vin}
            parts={parts}
            selectedPart={selectedPart}
            onSelectPart={setSelectedPart}
          />
        </div>
      </main>
    </div>
  );
}
