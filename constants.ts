import { CarModel, CarAsset } from './types';

const generateMockAssets = (carName: string, year: number): CarAsset[] => [
  {
    id: `info-${carName}-${year}`,
    name: `Infografía ${carName} ${year}`,
    type: 'JPG',
    size: '(1920x1080px)',
    description: 'JPG',
    thumbnail: ''
  },
  {
    id: `arg-${carName}-${year}`,
    name: `Argumentario ${carName} ${year}`,
    type: 'PDF',
    size: '683.59KB',
    description: 'PDF'
  },
  {
    id: `cat-dig-${carName}-${year}`,
    name: `Catálogo Digital ${carName} ${year}`,
    type: 'PDF',
    size: '4.4MB',
    description: 'PDF',
    thumbnail: 'https://images.unsplash.com/photo-1621285853634-713b8dd6b5ee?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: `cat-wa-${carName}-${year}`,
    name: `Catálogo Whatsapp ${carName} ${year}`,
    type: 'ZIP',
    size: '1.91MB',
    description: 'ZIP'
  },
  {
    id: `rrss-${carName}-${year}`,
    name: `Adaptaciones para RRSS ${carName} ${year}`,
    type: 'ZIP',
    size: '27.51MB',
    description: 'ZIP'
  },
  {
    id: `qr-atril-${carName}-${year}`,
    name: `QR Atril ${carName} ${year}`,
    type: 'PDF',
    size: '349.3KB',
    description: 'PDF'
  },
  {
    id: `qr-demo-${carName}-${year}`,
    name: `QR Autos Demo, Cortesía y Exh...`,
    type: 'PDF',
    size: '1.99MB',
    description: 'PDF'
  }
];

export const CARS: CarModel[] = [
  {
    id: 'jetta-2026',
    name: 'Jetta',
    year: 2026,
    type: 'Sedan',
    image: 'https://acroadtrip.blob.core.windows.net/catalogo-imagenes/s/RT_V_92a80509b3f14cbda9680afa2a99c3e2.webp',
    description: 'El clásico renovado.',
    price: '$450,000 MXN',
    assets: generateMockAssets('Jetta', 2026)
  },
  {
    id: 'polo-2026',
    name: 'Volkswagen Polo',
    year: 2026,
    type: 'Hatchback',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Volkswagen_Polo_VI_R-Line_%282021%29_IMG_5545.jpg/1200px-Volkswagen_Polo_VI_R-Line_%282021%29_IMG_5545.jpg',
    description: 'Dinámico y juvenil.',
    price: '$380,000 MXN',
    assets: generateMockAssets('Polo', 2026)
  },
  {
    id: 'gli-2026',
    name: 'GLI',
    year: 2026,
    type: 'Sport Sedan',
    image: 'https://imagenes.eleconomista.com.mx/files/image_1200_600/uploads/2023/08/24/66e82130af3d4.png',
    description: 'Pura potencia.',
    price: '$620,000 MXN',
    assets: generateMockAssets('GLI', 2026)
  },
  {
    id: 'tiguan-2026',
    name: 'Tiguan',
    year: 2026,
    type: 'SUV',
    image: 'https://assets.volkswagen.com/is/image/volkswagenag/vw-tiguan-trendline-plus-22-11?Zml0PWNyb3AsMSZmbXQ9cG5nLWFscGhhJndpZD0xNjAwJmhlaT05MDAmYmZjPW9mZiY5YWYy',
    description: 'Versatilidad total.',
    price: '$850,000 MXN',
    assets: generateMockAssets('Tiguan', 2026)
  },
  {
    id: 'virtus-2026',
    name: 'Virtus',
    year: 2026,
    type: 'Sedan',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/VW_Virtus_MSI_%28Brazil%2C_front_view%29.png',
    description: 'El sedán que lo tiene todo.',
    price: '$410,000 MXN',
    assets: generateMockAssets('Virtus', 2026)
  },
  {
    id: 'cross-sport-2026',
    name: 'Cross Sport',
    year: 2026,
    type: 'SUV',
    image: 'https://assets.volkswagen.com/is/image/volkswagenag/vw-cross-sport-24-11?Zml0PWNyb3AsMSZmbXQ9cG5nLWFscGhhJndpZD0xNjAwJmhlaT05MDAmYmZjPW9mZiY5YWYy',
    description: 'Potencia y elegancia en cada curva.',
    price: '$1,050,000 MXN',
    assets: generateMockAssets('Cross Sport', 2026)
  }
];

export const VW_COLORS = {
  primary: '#001e50',
  secondary: '#1a1a1a',
  background: '#f2f0eb',
  white: '#ffffff',
  sidebar: '#edeae4'
};