
import React, { useEffect, useState } from 'react';
import { CarModel, CarDetailInfo } from '../types';
import { fetchCarDetails } from '../services/geminiService';

interface CarDetailModalProps {
  car: CarModel | null;
  onClose: () => void;
}

const CarDetailModal: React.FC<CarDetailModalProps> = ({ car, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<CarDetailInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (car) {
      const getInfo = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchCarDetails(car.name);
          setDetails(data);
        } catch (err) {
          setError('No pudimos obtener la información en este momento.');
        } finally {
          setLoading(false);
        }
      };
      getInfo();
    } else {
      setDetails(null);
    }
  }, [car]);

  if (!car) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-64 md:h-auto overflow-hidden">
            <img 
              src={car.image} 
              alt={car.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8 md:p-12">
            <div className="mb-2 inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase">
              {car.type}
            </div>
            <h2 className="text-4xl font-bold mb-2 text-[#001e50]">{car.name}</h2>
            <p className="text-2xl font-semibold text-blue-600 mb-6">{car.price}</p>
            
            {loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-32 bg-gray-200 rounded w-full"></div>
              </div>
            ) : error ? (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            ) : details ? (
              <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h4 className="font-bold text-sm uppercase text-gray-500 mb-2">Resumen</h4>
                  <p className="text-gray-700 leading-relaxed">{details.summary}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-100">
                  <div className="text-center">
                    <p className="text-xs text-gray-400 uppercase">Motor</p>
                    <p className="font-bold text-[#001e50]">{details.specs.engine}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 uppercase">0-100 km/h</p>
                    <p className="font-bold text-[#001e50]">{details.specs.acceleration}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 uppercase">Eficiencia</p>
                    <p className="font-bold text-[#001e50]">{details.specs.efficiency}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-sm uppercase text-gray-500 mb-2">Destacados</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {details.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full py-4 bg-[#001e50] text-white font-bold rounded-xl hover:bg-blue-900 transition-colors shadow-xl">
                  Agendar Prueba de Manejo
                </button>
              </div>
            ) : (
                <p className="text-gray-500 italic">Cargando detalles con Inteligencia Artificial...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailModal;
