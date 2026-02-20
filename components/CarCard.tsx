
import React from 'react';
import { CarModel } from '../types';

interface CarCardProps {
  car: CarModel;
  onViewMore: (car: CarModel) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onViewMore }) => {
  return (
    <div className="flex flex-col items-center group transition-all duration-300">
      <div className="w-full aspect-[16/9] mb-4 overflow-hidden rounded-lg bg-gray-200">
        <img 
          src={car.image} 
          alt={car.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <h3 className="text-xl font-bold mb-3 text-[#001e50] uppercase tracking-wide">{car.name}</h3>
      <button 
        onClick={() => onViewMore(car)}
        className="px-8 py-2 bg-[#001e50] text-white rounded-full text-sm font-semibold hover:bg-[#002a70] transition-colors shadow-lg active:scale-95"
      >
        Ver más
      </button>
    </div>
  );
};

export default CarCard;
