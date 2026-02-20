
import React from 'react';
import { CarAsset } from '../types';

interface AssetCardProps {
  asset: CarAsset;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onIndividualShare: (asset: CarAsset) => void;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset, isSelected, onToggleSelect, onIndividualShare }) => {
  const isZip = asset.type === 'ZIP';

  return (
    <div 
      className={`bg-white rounded-xl overflow-hidden shadow-sm flex flex-col h-full group relative transition-all duration-200 border-2 ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-transparent'
      }`}
      onClick={() => onToggleSelect(asset.id)}
    >
      {/* Selection dot */}
      <div className="absolute top-3 right-3 z-10">
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300 bg-white'
        }`}>
          {isSelected && (
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>

      {/* Preview Area */}
      <div className="h-40 bg-gray-50 flex items-center justify-center overflow-hidden relative cursor-pointer">
        {asset.thumbnail ? (
          <img src={asset.thumbnail} className="w-full h-full object-cover" alt={asset.name} />
        ) : isZip ? (
          <div className="flex flex-col items-center">
             <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <span className="text-[10px] font-bold text-gray-400 mt-1">ZIP</span>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {asset.name.includes('QR') ? (
              <div className="w-20 h-20 opacity-40 grid grid-cols-4 gap-1">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className={`w-full h-full ${Math.random() > 0.5 ? 'bg-[#001e50]' : 'bg-transparent'}`} />
                ))}
              </div>
            ) : (
              <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            )}
          </div>
        )}
      </div>

      {/* Info Area (Navy) */}
      <div className="bg-[#001e50] p-4 flex-grow flex flex-col justify-between text-white">
        <div className="cursor-pointer">
          <h4 className="text-sm font-semibold mb-3 leading-tight line-clamp-2">{asset.name}</h4>
          <div className="space-y-1 opacity-70">
            <p className="text-[10px] uppercase">{asset.size}</p>
            <p className="text-[10px] font-bold">{asset.description}</p>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex justify-end space-x-3 mt-4" onClick={(e) => e.stopPropagation()}>
          <button 
            title="Vista previa"
            className="hover:text-blue-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button 
            title="Compartir por WhatsApp"
            onClick={() => onIndividualShare(asset)}
            className="hover:text-green-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </button>
          <button 
            title="Descargar archivo"
            className="hover:text-blue-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
