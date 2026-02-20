
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CarCard from './components/CarCard';
import CarDetailModal from './components/CarDetailModal';
import DigitalPackExplorer from './components/DigitalPackExplorer';
import { CARS } from './constants';
import { CarModel } from './types';

const App: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState<CarModel | null>(null);
  const [isExplorerMode, setIsExplorerMode] = useState(false);

  const handleViewMore = (car: CarModel) => {
    setSelectedCar(car);
    setIsExplorerMode(true);
  };

  const handleCloseExplorer = () => {
    setIsExplorerMode(false);
    setSelectedCar(null);
  };

  const handleSelectCarInExplorer = (car: CarModel) => {
    setSelectedCar(car);
  };

  return (
    <div className="min-h-screen bg-[#f2f0eb]">
      <Navbar />
      
      {!isExplorerMode ? (
        <main className="max-w-7xl mx-auto px-6 pt-28 pb-20">
          <header className="text-center mb-16 md:mb-24">
            <h1 className="text-5xl md:text-7xl font-bold text-[#001e50] tracking-tight mb-4 uppercase">
              Pack Digital
            </h1>
            <p className="text-lg md:text-xl text-gray-500 font-light">
              Descubre nuestra gama completa de activos e innovación.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {/* Displaying all cars without filtering by year to restore missing models */}
            {CARS.map((car) => (
              <div key={car.id} className="relative">
                <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded-md text-[10px] font-bold text-[#001e50] z-10">
                  {car.year}
                </div>
                <CarCard 
                  car={car} 
                  onViewMore={handleViewMore} 
                />
              </div>
            ))}
          </div>
        </main>
      ) : (
        <div className="pt-20">
          <DigitalPackExplorer 
            cars={CARS}
            selectedCar={selectedCar || CARS[0]}
            onSelectCar={handleSelectCarInExplorer}
            onBack={handleCloseExplorer}
          />
        </div>
      )}
    </div>
  );
};

export default App;
