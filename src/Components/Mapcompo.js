import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import BO from '../GeoJson/BO';

const MapComponent = () => {
  const [selectedName, setSelectedName] = useState('');

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        setSelectedName(feature.properties.Name);
      },
    });
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>
        {selectedName || 'Click on a feature to see the name'}
      </div>
      <MapContainer
        style={{ height: '100%', width: '100%' }}
        center={[23.073162583462938, 72.508005683621647]}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON
          data={BO}
          onEachFeature={onEachFeature}
          style={{ color: 'blue' }}
        />
      </MapContainer>
    </div>
  );
};

export default MapComponent;

// import React, { useState } from 'react';
// import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// // Import the GeoJSON data
// import BO from '../GeoJson/BO';

// const MapComponent = () => {
//   const [selectedName, setSelectedName] = useState('');

//   // Function to handle when a feature is clicked
//   const onEachFeature = (feature, layer) => {
//     layer.on({
//       click: () => {
//         setSelectedName(feature.properties.Name);
//       },
//     });
//   };

//   return (
//     <div>
//       <div style={{ textAlign: 'center', marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>
//         {selectedName || 'Click on a feature to see the name'}
//       </div>
//       <MapContainer style={{ height: '500px', width: '100%' }} center={[23.079, 72.510]} zoom={14}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <GeoJSON data={BO} onEachFeature={onEachFeature} />
//       </MapContainer>
//     </div>
//   );
// };

// export default MapComponent;
