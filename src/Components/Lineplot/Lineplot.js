// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, GeoJSON, FeatureGroup } from 'react-leaflet';
// import { EditControl } from 'react-leaflet-draw';
// import '../../Styles/lineplot.css'
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-draw/dist/leaflet.draw.css';
// import 'leaflet-measure/dist/leaflet-measure.css';
// import 'leaflet-measure';
// import geoData from '../../GeoJson/lineplots';
// import Interiorlines from '../../GeoJson/Interiorlines';
// import BO from '../../GeoJson/BO';
// import Dots from '../../GeoJson/Dots';
// import Road41 from '../../GeoJson/Road41';
// import Road42 from '../../GeoJson/Road42';
// import BO41 from '../../GeoJson/BO41.js';
// import Plotclass from '../../GeoJson/Plotclass';
// import Path from '../../GeoJson/Path';
// import Schemes from '../../GeoJson/Schemes'; 
// import TP41 from '../../GeoJson/TP41.js';
// import Outerpath from '../../GeoJson/Outerpath.js';
// import Plotclass42 from '../../GeoJson/Plotclass42.js';
// import TP42Plots from '../../GeoJson/TP42Plots.js';
// import Schemes42 from '../../GeoJson/Schemes42.js';
// import ClassPlot from '../../GeoJson/ClassPlot.js';

// const MyMap = () => {
//   const [bounds, setBounds] = useState(null);
//   const [selectedLayers, setSelectedLayers] = useState({
//     geoData: true,
//     Interiorlines: true,
//     BO: true,
//     Dots: true,
//     Road41: true,
//     Road42: true,
//     BO41: true,
//     Plotclass: true,
//     Path: true,
//     Schemes: true,
//     TP41: true,
//     Outerpath: true,
//     Plotclass42: true,
//     TP42Plots: true,
//     Schemes42: true,
//     ClassPlot: true,
//   });
//   const [isLayerPanelOpen, setIsLayerPanelOpen] = useState(false);
//   const [selectedName, setSelectedName] = useState('');

//   useEffect(() => {
//     if (geoData && geoData.features && geoData.features.length > 0) {
//       const feature = geoData.features[0];
//       const coords = feature.geometry.coordinates[0][0].map(coord => [coord[1], coord[0]]);
//       const newBounds = L.latLngBounds(coords);
//       setBounds(newBounds);
//     }
//   }, []);

//   const handleLayerChange = (e) => {
//     const { name, checked } = e.target;
//     setSelectedLayers(prevState => ({
//       ...prevState,
//       [name]: checked,
//     }));
//   };

//   const toggleLayerPanel = () => {
//     setIsLayerPanelOpen(!isLayerPanelOpen);
//   };

//   const onEachFeature = (feature, layer) => {
//     console.log('Feature:', feature); 
//     layer.on({
//       click: () => {
//         const featureName = feature.properties.Name || 'No Name';
//         console.log(`Feature clicked: ${featureName}`);
//         setSelectedName(featureName);
//       },
//     });
//   };

//   return (
//     <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
//       <div style={{ 
//         position: 'absolute', 
//         top: '10px', 
//         left: '50%', 
//         transform: 'translateX(-50%)', 
//         backgroundColor: '#fff', 
//         padding: '10px', 
//         border: '1px solid #ddd', 
//         borderRadius: '4px',
//         zIndex: 1000,
//         fontSize: '18px', 
//         fontWeight: 'bold' 
//       }}>
//         {selectedName || 'Click on a feature to see the name'}
//       </div>

//       <MapContainer
//         style={{ height: '100%', width: '100%' }}
//         center={[23.073162583462938, 72.508005683621647]}
//         zoom={15}
//         scrollWheelZoom={true}
//         bounds={bounds}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <FeatureGroup>
//           <EditControl
//             position='topright'
//             draw={{
//               rectangle: true,
//               polyline: true,
//               polygon: true,
//               circle: true,
//               marker: true,
//             }}
//           />
//         </FeatureGroup>

//         {selectedLayers.geoData && <GeoJSON data={geoData} style={{ color: 'blue' }} onEachFeature={onEachFeature} />}
//         {selectedLayers.Interiorlines && <GeoJSON data={Interiorlines} style={{ color: 'red' }} onEachFeature={onEachFeature} />}
//         {selectedLayers.BO && <GeoJSON data={BO} style={{ color: 'purple' }} onEachFeature={onEachFeature} />}
//         {selectedLayers.Dots && Dots.features.length > 0 && (
//           <GeoJSON data={Dots} pointToLayer={(feature, latlng) => L.circle(latlng, {
//             radius: 5,
//             color: 'green',
//             fillColor: 'green',
//             fillOpacity: 0.5,
//           }).bindPopup(feature.properties.description)} onEachFeature={onEachFeature} />
//         )}
//         {selectedLayers.Road41 && <GeoJSON data={Road41} style={{ color: 'magenta' }} onEachFeature={onEachFeature} />}
//         {selectedLayers.Road42 && <GeoJSON data={Road42} style={{ color: 'brown' }} onEachFeature={onEachFeature} />}
//         {selectedLayers.BO41 && <GeoJSON data={BO41} style={{ color: 'cyan' }} onEachFeature={onEachFeature} />}
//         {selectedLayers.Plotclass && <GeoJSON data={Plotclass} style={{ color: 'yellow' }} onEachFeature={onEachFeature} />}
//         {selectedLayers.Path && <GeoJSON data={Path} style={{ color: 'gray' }} onEachFeature={onEachFeature} />}
//         {selectedLayers.Schemes && Schemes.features.length > 0 && (
//           <GeoJSON data={Schemes} pointToLayer={(feature, latlng) => L.circle(latlng, {
//             radius: 5,
//             color: 'green',
//             fillColor: 'green',
//             fillOpacity: 0.5,
//           }).bindPopup(feature.properties.description)} onEachFeature={onEachFeature} />
//         )}
//         {selectedLayers.TP41 && <GeoJSON data={TP41} style={{ color: 'purple' }} onEachFeature={onEachFeature} />}
//         {selectedLayers.Outerpath && <GeoJSON data={Outerpath} style={{ color: 'yellow' }} onEachFeature={onEachFeature} />}
//         {selectedLayers.Plotclass42 && <GeoJSON data={Plotclass42} style={{ color: 'pink' }} onEachFeature={onEachFeature} />}
//         {selectedLayers.TP42Plots && <GeoJSON data={TP42Plots} style={{ color: 'violet' }} onEachFeature={onEachFeature} />}
//         {selectedLayers.Schemes42 && Schemes42.features.length > 0 && (
//           <GeoJSON data={Schemes42} pointToLayer={(feature, latlng) => L.circle(latlng, {
//             radius: 5,
//             color: 'orange',
//             fillColor: 'orange',
//             fillOpacity: 0.5,
//           }).bindPopup(feature.properties.description)} onEachFeature={onEachFeature} />
//         )}
//         {selectedLayers.ClassPlot && <GeoJSON data={ClassPlot} style={{ color: 'brown' }} onEachFeature={onEachFeature} />}
//       </MapContainer>

//       <button
//         onClick={toggleLayerPanel}
//         style={{
//           position: 'absolute',
//           top: '10px',
//           right: '50px',
//           zIndex: 1000,
//           backgroundColor: '#007bff',
//           color: '#fff',
//           border: 'none',
//           borderRadius: '4px',
//           padding: '10px',
//           cursor: 'pointer'
//         }}
//       >
//         Toggle Layer Panel
//       </button>
//       {isLayerPanelOpen && (
//         <div
//           style={{
//             position: 'absolute',
//             top: '50px',
//             right: '50px',
//             backgroundColor: '#fff',
//             padding: '10px',
//             boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
//             zIndex: 1000,
//             width:'120px'
//           }}
//         >
//           <h4>Layer Control</h4>
//           {Object.keys(selectedLayers).map(layer => (
//             <div key={layer}>
//               <input
//                 type="checkbox"
//                 name={layer}
//                 checked={selectedLayers[layer]}
//                 onChange={handleLayerChange}
//               />
//               <label htmlFor={layer}>{layer}</label>
//             </div>
//           ))}
          
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyMap;

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import '../../Styles/lineplot.css'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-measure/dist/leaflet-measure.css';
import 'leaflet-measure';
import geoData from '../../GeoJson/lineplots';
import Interiorlines from '../../GeoJson/Interiorlines';
import BO from '../../GeoJson/BO';
import Dots from '../../GeoJson/Dots';
import Road41 from '../../GeoJson/Road41';
import Road42 from '../../GeoJson/Road42';
import BO41 from '../../GeoJson/BO41.js';
import Plotclass from '../../GeoJson/Plotclass';
import Path from '../../GeoJson/Path';
import Schemes from '../../GeoJson/Schemes'; 
import TP41 from '../../GeoJson/TP41.js';
import Outerpath from '../../GeoJson/Outerpath.js';
import Plotclass42 from '../../GeoJson/Plotclass42.js';
import TP42Plots from '../../GeoJson/TP42Plots.js';
import Schemes42 from '../../GeoJson/Schemes42.js';
import ClassPlot from '../../GeoJson/ClassPlot.js';

const MyMap = () => {
  const [bounds, setBounds] = useState(null);
  const [selectedLayers, setSelectedLayers] = useState({
    geoData: true,
    Interiorlines: true,
    BO: true,
    Dots: true,
    Road41: true,
    Road42: true,
    BO41: true,
    Plotclass: true,
    Path: true,
    Schemes: true,
    TP41: true,
    Outerpath: true,
    Plotclass42: true,
    TP42Plots: true,
    Schemes42: true,
    ClassPlot: true,
  });
  const [isLayerPanelOpen, setIsLayerPanelOpen] = useState(false);
  const [selectedName, setSelectedName] = useState('');

  useEffect(() => {
    if (geoData && geoData.features && geoData.features.length > 0) {
      const feature = geoData.features[0];
      const coords = feature.geometry.coordinates[0][0].map(coord => [coord[1], coord[0]]);
      const newBounds = L.latLngBounds(coords);
      setBounds(newBounds);
    }
  }, []);

  const handleLayerChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'all') {
      const updatedLayers = Object.keys(selectedLayers).reduce((acc, layer) => {
        acc[layer] = checked;
        return acc;
      }, {});
      setSelectedLayers(updatedLayers);
    } else {
      setSelectedLayers(prevState => ({
        ...prevState,
        [name]: checked,
      }));
    }
  };

  const toggleLayerPanel = () => {
    setIsLayerPanelOpen(!isLayerPanelOpen);
  };

  const onEachFeature = (feature, layer) => {
    console.log('Feature:', feature); 
    layer.on({
      click: () => {
        const featureName = feature.properties.Name || 'No Name';
        console.log(`Feature clicked: ${featureName}`);
        setSelectedName(featureName);
      },
    });
  };

  const areAllLayersSelected = Object.values(selectedLayers).every(Boolean);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <div style={{ 
        position: 'absolute', 
        top: '10px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        backgroundColor: '#fff', 
        padding: '10px', 
        border: '1px solid #ddd', 
        borderRadius: '4px',
        zIndex: 1000,
        fontSize: '18px', 
        fontWeight: 'bold' 
      }}>
        {selectedName === '' 
          ? 'Click on a feature to see the name' 
          : selectedName 
            ? selectedName 
            : 'No name present'}
      </div>

      <MapContainer
        style={{ height: '100%', width: '100%' }}
        center={[23.073162583462938, 72.508005683621647]}
        zoom={15}
        scrollWheelZoom={true}
        bounds={bounds}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <FeatureGroup>
          <EditControl
            position='topright'
            draw={{
              rectangle: true,
              polyline: true,
              polygon: true,
              circle: true,
              marker: true,
            }}
          />
        </FeatureGroup>

        {selectedLayers.geoData && <GeoJSON data={geoData} style={{ color: 'blue' }} onEachFeature={onEachFeature} />}
        {selectedLayers.Interiorlines && <GeoJSON data={Interiorlines} style={{ color: 'red' }} onEachFeature={onEachFeature} />}
        {selectedLayers.BO && <GeoJSON data={BO} style={{ color: 'purple' }} onEachFeature={onEachFeature} />}
        {selectedLayers.Dots && Dots.features.length > 0 && (
          <GeoJSON data={Dots} pointToLayer={(feature, latlng) => L.circle(latlng, {
            radius: 5,
            color: 'green',
            fillColor: 'green',
            fillOpacity: 0.5,
          }).bindPopup(feature.properties.description)} onEachFeature={onEachFeature} />
        )}
        {selectedLayers.Road41 && <GeoJSON data={Road41} style={{ color: 'magenta' }} onEachFeature={onEachFeature} />}
        {selectedLayers.Road42 && <GeoJSON data={Road42} style={{ color: 'brown' }} onEachFeature={onEachFeature} />}
        {selectedLayers.BO41 && <GeoJSON data={BO41} style={{ color: 'cyan' }} onEachFeature={onEachFeature} />}
        {selectedLayers.Plotclass && <GeoJSON data={Plotclass} style={{ color: 'yellow' }} onEachFeature={onEachFeature} />}
        {selectedLayers.Path && <GeoJSON data={Path} style={{ color: 'gray' }} onEachFeature={onEachFeature} />}
        {selectedLayers.Schemes && Schemes.features.length > 0 && (
          <GeoJSON data={Schemes} pointToLayer={(feature, latlng) => L.circle(latlng, {
            radius: 5,
            color: 'green',
            fillColor: 'green',
            fillOpacity: 0.5,
          }).bindPopup(feature.properties.description)} onEachFeature={onEachFeature} />
        )}
        {selectedLayers.TP41 && <GeoJSON data={TP41} style={{ color: 'purple' }} onEachFeature={onEachFeature} />}
        {selectedLayers.Outerpath && <GeoJSON data={Outerpath} style={{ color: 'yellow' }} onEachFeature={onEachFeature} />}
        {selectedLayers.Plotclass42 && <GeoJSON data={Plotclass42} style={{ color: 'pink' }} onEachFeature={onEachFeature} />}
        {selectedLayers.TP42Plots && <GeoJSON data={TP42Plots} style={{ color: 'violet' }} onEachFeature={onEachFeature} />}
        {selectedLayers.Schemes42 && Schemes42.features.length > 0 && (
          <GeoJSON data={Schemes42} pointToLayer={(feature, latlng) => L.circle(latlng, {
            radius: 5,
            color: 'orange',
            fillColor: 'orange',
            fillOpacity: 0.5,
          }).bindPopup(feature.properties.description)} onEachFeature={onEachFeature} />
        )}
        {selectedLayers.ClassPlot && <GeoJSON data={ClassPlot} style={{ color: 'brown' }} onEachFeature={onEachFeature} />}
      </MapContainer>

      <button
        onClick={toggleLayerPanel}
        style={{
          position: 'absolute',
          top: '10px',
          right: '50px',
          zIndex: 1000,
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          padding: '10px',
          cursor: 'pointer'
        }}
      >
        Toggle Layer Panel
      </button>
      {isLayerPanelOpen && (
        <div
          style={{
            position: 'absolute',
            top: '50px',
            right: '50px',
            backgroundColor: '#fff',
            padding: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
            zIndex: 1000,
            borderRadius: '4px',
            maxHeight: '500px',
            overflowY: 'auto'
          }}
        >
          <h4>Toggle Layers</h4>
          <div>
            <input
              type="checkbox"
              name="all"
              checked={areAllLayersSelected}
              onChange={handleLayerChange}
            />
            <label style={{ marginLeft: '8px' }}>Select</label>
          </div>
          {Object.keys(selectedLayers).map(layer => (
            <div key={layer}>
              <input
                type="checkbox"
                name={layer}
                checked={selectedLayers[layer]}
                onChange={handleLayerChange}
              />
              <label style={{ marginLeft: '8px' }}>{layer}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyMap;
