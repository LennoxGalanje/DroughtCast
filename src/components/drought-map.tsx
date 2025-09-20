'use client';

import { APIProvider, Map, useMap, AdvancedMarker } from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react';
import type { RegionData } from '@/lib/types';
import { severityLevels } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Flame, Wind } from 'lucide-react';

const mapStyle = [
  { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "color": "#7c93a3" }, { "lightness": "-10" }] },
  { "featureType": "administrative.country", "elementType": "geometry", "stylers": [{ "visibility": "on" }] },
  { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [{ "color": "#a0a4a5" }] },
  { "featureType": "administrative.province", "elementType": "geometry.stroke", "stylers": [{ "color": "#62838e" }] },
  { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [{ "color": "hsl(var(--background))" }] },
  { "featureType": "landscape.man_made", "elementType": "geometry.stroke", "stylers": [{ "color": "#e9e5d7" }] },
  { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] },
  { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }, {"visibility": "off"}] },
  { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] },
  { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#a3c7df" }] }
];

const MapCircles: React.FC<{ regions: RegionData[], onMarkerClick: (region: RegionData) => void }> = ({ regions, onMarkerClick }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const circles = regions.map(region => {
      const severity = severityLevels.find(s => s.level === region.riskLevel) ?? severityLevels[0];
      const circle = new google.maps.Circle({
        strokeColor: severity.color,
        strokeOpacity: 0.7,
        strokeWeight: 1,
        fillColor: severity.color,
        fillOpacity: 0.3,
        map,
        center: region.coords,
        radius: 300000 + region.riskLevel * 150000,
      });
      circle.addListener('click', () => onMarkerClick(region));
      return circle;
    });

    return () => {
      circles.forEach(circle => {
        google.maps.event.clearInstanceListeners(circle);
        circle.setMap(null);
      });
    };
  }, [map, regions, onMarkerClick]);

  return null;
};

export function DroughtMap({ regions }: { regions: RegionData[] }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  
  const handleMarkerClick = (region: RegionData) => {
    setSelectedRegion(region);
  };

  const handleClosePopup = () => {
    setSelectedRegion(null);
  }

  if (!apiKey) {
    return (
      <div className="w-full h-full bg-muted flex flex-col items-center justify-center text-center p-4">
        <h3 className="text-lg font-semibold">Google Maps API Key Missing</h3>
        <p className="text-muted-foreground max-w-md">
          Please provide a Google Maps API key in your environment variables as <code className="bg-card p-1 rounded-sm text-xs font-mono">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to display the map. You can get a key from the Google Cloud Console.
        </p>
      </div>
    );
  }

  return (
    <div className='w-full h-full relative'>
      <APIProvider apiKey={apiKey} loading="lazy">
        <Map
          defaultCenter={{ lat: 15, lng: 15 }}
          defaultZoom={3}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          mapId="droughtcast-map"
          styles={mapStyle}
          onClick={handleClosePopup}
        >
          <MapCircles regions={regions} onMarkerClick={handleMarkerClick} />
          {selectedRegion && (
            <AdvancedMarker position={selectedRegion.coords} >
                <Card className="min-w-64 max-w-sm -translate-x-1/2 -translate-y-[calc(100%+20px)] opacity-95 animate-in fade-in-50 zoom-in-95 duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {selectedRegion.name}
                          <button onClick={handleClosePopup} className="text-muted-foreground hover:text-foreground">&times;</button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className='flex items-center gap-4'>
                          <Flame className="w-8 h-8 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Severity</p>
                            <p className="font-bold text-lg">{severityLevels.find(s => s.level === selectedRegion.riskLevel)?.label}</p>
                          </div>
                        </div>
                         <div className='flex items-center gap-4'>
                          <Wind className="w-8 h-8 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Forecast</p>
                            <p className="font-bold">{selectedRegion.forecast}</p>
                          </div>
                        </div>
                    </CardContent>
                </Card>
            </AdvancedMarker>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}
