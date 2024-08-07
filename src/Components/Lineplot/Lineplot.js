import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-measure/dist/leaflet-measure.css';
import L from 'leaflet';
import 'leaflet-measure';
import geoData from '../../GeoJson/lineplots';
import '../../Styles/lineplot.css';
import Interiorlines from '../../GeoJson/Interiorlines';
import BO from '../../GeoJson/BO';


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

// Component to add measurement tool
const MeasureControl = () => {
  const map = useMap();
  useEffect(() => {
    L.control.measure({
      primaryLengthUnit: 'kilometers',
      secondaryLengthUnit: 'meters',
      primaryAreaUnit: 'sqmeters',
      secondaryAreaUnit: 'sqkilometers',
      activeColor: '#214097',
      completedColor: '#214097',
      position: 'topright',
    }).addTo(map);
  }, [map]);

  return null;
};

const MyMap = () => {
  const [bounds, setBounds] = useState(null);
  const [selectedLayers, setSelectedLayers] = useState({
    geoData: true,
    Interiorlines: true,
    BO: true,
  });
  const [isLayerPanelOpen, setIsLayerPanelOpen] = useState(false);

  useEffect(() => {
    if (geoData.features.length > 0) {
      const feature = geoData.features[0];
      const coords = feature.geometry.coordinates[0][0].map(coord => [coord[1], coord[0]]);
      const newBounds = L.latLngBounds(coords);
      setBounds(newBounds);
    }
  }, []);

  const onCreated = (e) => {
    const type = e.layerType;
    const layer = e.layer;

    if (type === 'marker') {
      layer.bindPopup('A new marker!');
    }
  };

  const onDrawVertex = (e) => {
    console.log('onDrawVertex event:', e);
    try {
      const { latlng } = e.layer._latlngs[0][0];
      console.log('Vertex added at:', latlng);
    } catch (error) {
      console.error('Error in onDrawVertex:', error);
    }
  };

  const onDrawPolyline = (e) => {
    console.log('onDrawPolyline event:', e);
    try {
      const { _latlngs } = e.layer;
      console.log('Polyline created with points:', _latlngs);
    } catch (error) {
      console.error('Error in onDrawPolyline:', error);
    }
  };

  const handleLayerChange = (e) => {
    const { name, checked } = e.target;
    setSelectedLayers(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const toggleLayerPanel = () => {
    setIsLayerPanelOpen(!isLayerPanelOpen);
  };

  return (
    <div>
      <MapContainer
        style={{ height: '100vh', width: '100%' }}
        center={[23.073162583462938, 72.508005683621647]}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <FeatureGroup>
          <EditControl
            position='topright'
            onCreated={onCreated}
            onDrawVertex={onDrawVertex}
            onDrawPolyline={onDrawPolyline}
            draw={{
              rectangle: true,
              polyline: true,
              polygon: true,
              circle: true,
              marker: true,
            }}
          />
        </FeatureGroup>
        {selectedLayers.geoData && <GeoJSON data={geoData} style={{ color: 'blue' }} />}
        {selectedLayers.Interiorlines && <GeoJSON data={Interiorlines} style={{ color: 'red' }} />}
        {selectedLayers.BO && <GeoJSON data={BO} style={{ color: 'brown' }} />}
        {bounds && <SetViewOnZoom bounds={bounds} />}
        <MeasureControl />
      </MapContainer>
      <button className="layer-toggle-button" onClick={toggleLayerPanel}>Layers</button>
      {isLayerPanelOpen && (
        <div className="layer-panel">
          <label>
            <input
              type="checkbox"
              name="geoData"
              checked={selectedLayers.geoData}
              onChange={handleLayerChange}
            />
            Geo Data
          </label>
          <label>
            <input
              type="checkbox"
              name="Interiorlines"
              checked={selectedLayers.Interiorlines}
              onChange={handleLayerChange}
            />
            Interior Lines
          </label>
          <label>
            <input
              type="checkbox"
              name="BO"
              checked={selectedLayers.BO}
              onChange={handleLayerChange}
            />
            BO
          </label>
        </div>
      )}
    </div>
  );
};

export default MyMap;



// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, GeoJSON, useMap, FeatureGroup } from 'react-leaflet';
// import { EditControl } from 'react-leaflet-draw';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-draw/dist/leaflet.draw.css';
// import 'leaflet-measure/dist/leaflet-measure.css';
// import L from 'leaflet';
// import 'leaflet-measure';
// import geoData from '../../GeoJson/lineplots';
// import '../../Styles/lineplot.css';
// import Interiorlines from '../../GeoJson/Interiorlines';
// import BO from '../../GeoJson/BO';
// // Component to control the map view
// const SetViewOnZoom = ({ bounds }) => {
//   const map = useMap();
//   useEffect(() => {
//     if (bounds) {
//       map.fitBounds(bounds);
//     }
//   }, [bounds, map]);

//   return null;
// };

// // Component to add measurement tool
// const MeasureControl = () => {
//   const map = useMap();
//   useEffect(() => {
//     L.control.measure({
//       primaryLengthUnit: 'kilometers',
//       secondaryLengthUnit: 'meters',
//       primaryAreaUnit: 'sqmeters',
//       secondaryAreaUnit: 'sqkilometers',
//       activeColor: '#214097',
//       completedColor: '#214097',
//       position: 'topright',
//     }).addTo(map);
//   }, [map]);

//   return null;
// };

// const MyMap = () => {
//   const [bounds, setBounds] = useState(null);
//   const [selectedLayer, setSelectedLayer] = useState('both');

//   useEffect(() => {
//     if (geoData.features.length > 0) {
//       const feature = geoData.features[0];
//       const coords = feature.geometry.coordinates[0][0].map(coord => [coord[1], coord[0]]);
//       const newBounds = L.latLngBounds(coords);
//       setBounds(newBounds);
//     }
//   }, []);

//   const onCreated = (e) => {
//     const type = e.layerType;
//     const layer = e.layer;

//     if (type === 'marker') {
//       layer.bindPopup('A new marker!');
//     }
//   };

//   const onDrawVertex = (e) => {
//     const { latlng } = e.layer._latlngs[0][0];
//     console.log('Vertex added at:', latlng);
//   };

//   const onDrawPolyline = (e) => {
//     const { _latlngs } = e.layer;
//     console.log('Polyline created with points:', _latlngs);
//   };

//   const handleLayerChange = (e) => {
//     setSelectedLayer(e.target.value);
//   };

//   return (
//     <div>
//       <div className="layer-selector">
//         <label htmlFor="layer-select">Select Layer: </label>
//         <select id="layer-select" onChange={handleLayerChange}>
//           <option value="geoData">Geo Data</option>
//           <option value="Interiorlines">Interior Lines</option>
//           <option value="BO">BO</option>
//           <option value="both">All</option>
//         </select>
//       </div>
//       <MapContainer
//         style={{ height: '100vh', width: '100%' }}
//         center={[23.073162583462938, 72.508005683621647]}
//         zoom={15}
//         scrollWheelZoom={true}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <FeatureGroup>
//           <EditControl
//             position='topright'
//             onCreated={onCreated}
//             onDrawVertex={onDrawVertex}
//             onDrawPolyline={onDrawPolyline}
//             draw={{
//               rectangle: true,
//               polyline: true,
//               polygon: true,
//               circle: true,
//               marker: true,
//             }}
//           />
//         </FeatureGroup>
//         {selectedLayer === 'geoData' && (
//           <GeoJSON data={geoData} style={{ color: 'blue' }} />
//         )}
//         {selectedLayer === 'Interiorlines' && (
//           <GeoJSON data={Interiorlines} style={{ color: 'red' }} />
//         )}
//         {selectedLayer === 'BO' && (
//           <GeoJSON data={BO} style={{ color: 'Brown' }} />
//         )}
//         {selectedLayer === 'both' && (
//           <>
//             <GeoJSON data={geoData} style={{ color: 'blue' }} />
//             <GeoJSON data={Interiorlines} style={{ color: 'red' }} />
//             <GeoJSON data={BO} style={{ color: 'Brown' }} />
//           </>
//         )}
//         {bounds && <SetViewOnZoom bounds={bounds} />}
//         <MeasureControl />
//       </MapContainer>
//     </div>
//   );
// };

// export default MyMap;

