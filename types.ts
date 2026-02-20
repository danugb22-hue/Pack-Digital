
export interface CarAsset {
  id: string;
  name: string;
  type: 'JPG' | 'PDF' | 'ZIP';
  size: string;
  description: string;
  thumbnail?: string;
}

export interface CarModel {
  id: string;
  name: string;
  year: number;
  type: string;
  image: string;
  description: string;
  price: string;
  assets: CarAsset[];
}

export interface CarDetailInfo {
  features: string[];
  specs: {
    engine: string;
    acceleration: string;
    efficiency: string;
  };
  summary: string;
}
