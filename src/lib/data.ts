import type { RegionData } from './types';

export const regionsData: RegionData[] = [
  { id: 'sahel', name: 'Sahel Region', coords: { lat: 13.434, lng: 1.543 }, riskLevel: 4, forecast: 'Worsening conditions expected.' },
  { id: 'horn', name: 'Horn of Africa', coords: { lat: 7.21, lng: 46.28 }, riskLevel: 3, forecast: 'Continued dryness, minimal rainfall.' },
  { id: 'cali', name: 'California, USA', coords: { lat: 36.778, lng: -119.417 }, riskLevel: 2, forecast: 'Below average rainfall projected.' },
  { id: 'med', name: 'Mediterranean Basin', coords: { lat: 38.0, lng: 15.0 }, riskLevel: 2, forecast: 'Unseasonably dry summer ahead.' },
  { id: 'aus', name: 'SE Australia', coords: { lat: -35.28, lng: 149.12 }, riskLevel: 1, forecast: 'Conditions stable, monitoring required.' },
  { id: 'amazon', name: 'Amazon Basin', coords: { lat: -3.465, lng: -62.215 }, riskLevel: 0, forecast: 'Normal rainfall patterns expected.' },
  { id: 'central-asia', name: 'Central Asia', coords: { lat: 41.36, lng: 69.25 }, riskLevel: 3, forecast: 'High risk of agricultural drought.' },
];

export const severityLevels = [
  { level: 0, label: 'No Risk', color: '#a8d08d' },
  { level: 1, label: 'Low Risk', color: '#fff2cc' },
  { level: 2, label: 'Moderate Risk', color: '#ffe599' },
  { level: 3, label: 'High Risk', color: 'hsl(var(--primary))' },
  { level: 4, label: 'Severe Risk', color: '#c0504d' },
];
