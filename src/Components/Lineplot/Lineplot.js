import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../../Styles/lineplot.css'
import geoData from '../../GeoJson/lineplots';
// GeoJSON data (for demonstration, ideally, this would be imported from a separate file)


// Component to control the map view
const SetViewOnZoom = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
    }
  }, [bounds, map]);

  return null;
};

const MyMap = () => {
  // Calculate bounds for the GeoJSON data
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    if (geoData.features.length > 0) {
      const feature = geoData.features[0];
      const coords = feature.geometry.coordinates[0][0].map(coord => [coord[1], coord[0]]);
      const newBounds = L.latLngBounds(coords);
      setBounds(newBounds);
    }
  }, []);

  return (
    <MapContainer style={{ height: '100vh', width: '100%' }} center={[23.073162583462938, 72.508005683621647]} zoom={15} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={geoData} />
      {bounds && <SetViewOnZoom bounds={bounds} />}
    </MapContainer>
  );
};

export default MyMap;
