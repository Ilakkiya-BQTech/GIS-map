import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, FeatureGroup, useMap } from 'react-leaflet';
import '../../Styles/lineplot.css';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-measure/dist/leaflet-measure.css';
import L from 'leaflet';
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

const SetViewOnZoom = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
    }
  }, [bounds, map]);

  return null;
};

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
const pointToLayer = (feature, latlng) => {
  return L.circle(latlng, {
    radius: 5,
    color: 'green',
    fillColor: 'green',
    fillOpacity: 0.5,
  }).bindPopup(feature.properties.description);
};

const Users = () => {
  const [bounds, setBounds] = useState(null);
  const [selectedLayerGroup, setSelectedLayerGroup] = useState('admin');

  useEffect(() => {
    if (geoData && geoData.features && geoData.features.length > 0) {
      const feature = geoData.features[0];
      const coords = feature.geometry.coordinates[0][0].map(coord => [coord[1], coord[0]]);
      const newBounds = L.latLngBounds(coords);
      setBounds(newBounds);
    }
  }, [geoData]);

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

  const handleLayerGroupChange = (e) => {
    setSelectedLayerGroup(e.target.value);
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
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
        {(selectedLayerGroup === 'admin' || selectedLayerGroup === 'layer1') && (
          <>
            <GeoJSON data={geoData} style={{ color: 'blue' }} />
            <GeoJSON data={Interiorlines} style={{ color: 'red' }} />
            <GeoJSON data={BO} style={{ color: 'purple' }} />
            {Dots && Dots.features && Dots.features.length > 0 &&
              <GeoJSON data={Dots} pointToLayer={pointToLayer} />
            }
            <GeoJSON data={Road41} style={{ color: 'magenta' }} />
            <GeoJSON data={Road42} style={{ color: 'brown' }} />
            <GeoJSON data={BO41} style={{ color: 'cyan' }} />
            <GeoJSON data={Plotclass} style={{ color: 'yellow' }} />
          </>
        )}

        {(selectedLayerGroup === 'admin' || selectedLayerGroup === 'layer2') && (
          <>
            <GeoJSON data={Path} style={{ color: 'gray' }} />
            {Schemes && Schemes.features && Schemes.features.length > 0 &&
              <GeoJSON data={Schemes} pointToLayer={pointToLayer} />
            }
            <GeoJSON data={TP41} style={{ color: 'purple' }} />
            <GeoJSON data={Outerpath} style={{ color: 'yellow' }} />
            <GeoJSON data={Plotclass42} style={{ color: 'pink' }} />
            <GeoJSON data={TP42Plots} style={{ color: 'violet' }} />
            {Schemes42 && Schemes42.features && Schemes42.features.length > 0 &&
              <GeoJSON data={Schemes42} pointToLayer={pointToLayer} style={{ color: 'orange', fillColor: 'orange' }} />
            }
            <GeoJSON data={ClassPlot} style={{ color: 'brown' }} />
          </>
        )}

        <SetViewOnZoom bounds={bounds} />
        <MeasureControl />
      </MapContainer>
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '50px',
          zIndex: 1000,
          backgroundColor: '#fff',
          padding: '10px',
          borderRadius: '4px',
        }}
      >
        <label htmlFor="layer-group">Select Layer Group:</label>
        <select id="layer-group" onChange={handleLayerGroupChange}>
          <option value="admin">All Layers</option>
          <option value="layer1">Layer 1</option>
          <option value="layer2">Layer 2</option>
        </select>
      </div>
    </div>
  );
};

export default Users;
