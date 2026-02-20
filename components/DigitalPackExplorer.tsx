
import React, { useState, useMemo } from 'react';
import { CarModel, CarAsset } from '../types';
import AssetCard from './AssetCard';

interface DigitalPackExplorerProps {
  cars: CarModel[];
  selectedCar: CarModel;
  onSelectCar: (car: CarModel) => void;
  onBack: () => void;
}

const DigitalPackExplorer: React.FC<DigitalPackExplorerProps> = ({ 
  cars, 
  selectedCar, 
  onSelectCar, 
  onBack 
}) => {
  const [selectedAssetIds, setSelectedAssetIds] = useState<Set<string>>(new Set());
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const carsByYear = cars.reduce((acc, car) => {
    const year = car.year;
    if (!acc[year]) acc[year] = [];
    acc[year].push(car);
    return acc;
  }, {} as Record<number, CarModel[]>);

  const sortedYears = Object.keys(carsByYear).map(Number).sort((a, b) => b - a);

  const toggleAssetSelection = (id: string) => {
    setSelectedAssetIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleIndividualShare = (asset: CarAsset) => {
    setSelectedAssetIds(new Set([asset.id]));
    setShowShareDialog(true);
  };

  const handleBulkShare = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || selectedAssetIds.size === 0) return;

    const cleanNumber = phoneNumber.replace(/\D/g, '');
    const selectedAssets = selectedCar.assets.filter(a => selectedAssetIds.has(a.id));
    
    let messageBody = `¡Hola! Te comparto los siguientes archivos de Volkswagen ${selectedCar.name}:\n\n`;
    selectedAssets.forEach(asset => {
      messageBody += `• ${asset.name} (${asset.type}, ${asset.size})\n`;
    });
    messageBody += `\nPuedes descargarlos aquí: https://vw.com.mx/assets/bulk-download`;

    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(messageBody)}`;
    window.open(url, '_blank');
    
    setShowShareDialog(false);
    setSelectedAssetIds(new Set());
    setPhoneNumber('');
  };

  const selectedCount = selectedAssetIds.size;

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-[#f2f0eb] relative">
      {/* Sidebar */}
      <aside className="w-72 bg-[#edeae4] border-r border-gray-200 overflow-y-auto p-4 custom-scrollbar">
        <button 
          onClick={onBack}
          className="flex items-center text-[#001e50] font-bold mb-6 hover:translate-x-[-4px] transition-transform"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Atrás
        </button>

        <div className="space-y-8">
          {sortedYears.map((year) => (
            <div key={year}>
              <div className="flex items-center space-x-2 text-[#001e50] font-bold text-sm uppercase mb-3 opacity-80">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
                <span>Modelos {year}</span>
              </div>
              <ul className="space-y-1">
                {carsByYear[year].map((car) => (
                  <li key={car.id}>
                    <button
                      onClick={() => {
                        onSelectCar(car);
                        setSelectedAssetIds(new Set());
                      }}
                      className={`w-full text-left px-4 py-2 text-sm rounded transition-colors ${
                        selectedCar.id === car.id 
                          ? 'bg-[#d1cfc9] text-[#001e50] font-bold' 
                          : 'text-[#001e50] hover:bg-[#e4e1db]'
                      }`}
                    >
                      {car.name} {car.year}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex flex-col">
               <h2 className="text-2xl font-bold text-[#001e50] uppercase">{selectedCar.name} {selectedCar.year}</h2>
               <span className="text-gray-500 font-medium text-sm">
                 {selectedCar.assets.length} archivos disponibles
               </span>
            </div>
            
            <div className="flex items-center space-x-4">
              {selectedCount > 0 && (
                <button 
                  onClick={() => setShowShareDialog(true)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center shadow-lg transition-all animate-in slide-in-from-right-4"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Enviar {selectedCount} {selectedCount === 1 ? 'archivo' : 'archivos'}
                </button>
              )}
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-200 rounded">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {selectedCar.assets.map((asset) => (
              <AssetCard 
                key={asset.id} 
                asset={asset} 
                isSelected={selectedAssetIds.has(asset.id)}
                onToggleSelect={toggleAssetSelection}
                onIndividualShare={handleIndividualShare}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Share Dialog Overlay */}
      {showShareDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#001e50] w-full max-w-md rounded-2xl shadow-2xl p-8 text-white relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowShareDialog(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-6 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Enviar por WhatsApp</h3>
              <p className="text-white/60 text-sm mt-1">
                Compartir {selectedCount} {selectedCount === 1 ? 'archivo' : 'archivos'} de {selectedCar.name}
              </p>
            </div>

            <form onSubmit={handleBulkShare} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-white/50 mb-2">Número de WhatsApp</label>
                <input 
                  autoFocus
                  type="tel"
                  placeholder="Ej. 521234567890"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-white/20 transition-all"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <p className="text-[10px] text-white/40 mt-2">Incluye código de país sin el signo "+".</p>
              </div>

              <button 
                type="submit"
                disabled={!phoneNumber}
                className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-sm transition-all shadow-xl active:scale-[0.98]"
              >
                Enviar Ahora
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1cfc9;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #c1bfb9;
        }
      `}</style>
    </div>
  );
};

export default DigitalPackExplorer;
