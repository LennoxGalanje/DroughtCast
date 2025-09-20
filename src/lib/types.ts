export type RegionData = {
  id: string;
  name: string;
  coords: {
    lat: number;
    lng: number;
  };
  riskLevel: number; // 0: none, 1: low, 2: moderate, 3: high, 4: severe
  forecast: string;
};
