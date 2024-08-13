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

  useEffect(() => {
    if (geoData && geoData.features && geoData.features.length > 0) {
      const feature = geoData.features[0];
      const coords = feature.geometry.coordinates[0][0].map(coord => [coord[1], coord[0]]);
      const newBounds = L.latLngBounds(coords);
      setBounds(newBounds);
    }
  }, []);

  useEffect(() => {
    // Reset selected layers when layer group changes
    if (selectedLayerGroup === 'admin') {
      setSelectedLayers(prevState => {
        const allLayers = Object.keys(prevState).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {});
        return allLayers;
      });
    } else if (selectedLayerGroup === 'layer1') {
      setSelectedLayers(prevState => {
        const layerNamesLayer1 = [
          'geoData', 'Interiorlines', 'BO', 'Dots', 'Road41', 'Road42', 'BO41', 'Plotclass'
        ];
        const updatedLayers = Object.keys(prevState).reduce((acc, key) => {
          acc[key] = layerNamesLayer1.includes(key);
          return acc;
        }, {});
        return updatedLayers;
      });
    } else if (selectedLayerGroup === 'layer2') {
      setSelectedLayers(prevState => {
        const layerNamesLayer2 = [
          'Path', 'Schemes', 'TP41', 'Outerpath', 'Plotclass42', 'TP42Plots', 'Schemes42', 'ClassPlot'
        ];
        const updatedLayers = Object.keys(prevState).reduce((acc, key) => {
          acc[key] = layerNamesLayer2.includes(key);
          return acc;
        }, {});
        return updatedLayers;
      });
    }
  }, [selectedLayerGroup]);

  const handleLayerGroupChange = (e) => {
    setSelectedLayerGroup(e.target.value);
  };

  const handleLayerSelectionChange = (layerName) => {
    setSelectedLayers(prevState => ({
      ...prevState,
      [layerName]: !prevState[layerName],
    }));
  };

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
  const pointToLayer = (feature, latlng) => {
    return L.circle(latlng, {
      radius: 5,
      color: 'green',
      fillColor: 'green',
      fillOpacity: 0.5,
    }).bindPopup(feature.properties.description);
  };
  const renderLayerCheckboxes = () => {
    const layerCheckboxes = [];
    
    if (selectedLayerGroup === 'admin') {
      Object.keys(selectedLayers).forEach(layerName => {
        layerCheckboxes.push(
          <label key={layerName}>
            <input
              type="checkbox"
              checked={selectedLayers[layerName]}
              onChange={() => handleLayerSelectionChange(layerName)}
            />
            {layerName}
          </label>
        );
      });
    } else if (selectedLayerGroup === 'layer1') {
      const layerNamesLayer1 = [
        'geoData', 'Interiorlines', 'BO', 'Dots', 'Road41', 'Road42', 'BO41', 'Plotclass'
      ];
      layerNamesLayer1.forEach(layerName => {
        layerCheckboxes.push(
          <label key={layerName}>
            <input
              type="checkbox"
              checked={selectedLayers[layerName]}
              onChange={() => handleLayerSelectionChange(layerName)}
            />
            {layerName}
          </label>
        );
      });
    } else if (selectedLayerGroup === 'layer2') {
      const layerNamesLayer2 = [
        'Path', 'Schemes', 'TP41', 'Outerpath', 'Plotclass42', 'TP42Plots', 'Schemes42', 'ClassPlot'
      ];
      layerNamesLayer2.forEach(layerName => {
        layerCheckboxes.push(
          <label key={layerName}>
            <input
              type="checkbox"
              checked={selectedLayers[layerName]}
              onChange={() => handleLayerSelectionChange(layerName)}
            />
            {layerName}
          </label>
        );
      });
    }

    return layerCheckboxes;
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
   <div className="layer-controls">
  <select className="layer-group-select" value={selectedLayerGroup} onChange={handleLayerGroupChange}>
    <option value="admin">Admin</option>
    <option value="layer1">Layer Group 1</option>
    <option value="layer2">Layer Group 2</option>
  </select>

  <div className="layer-checkboxes">
    {renderLayerCheckboxes()}
  </div>
</div>

    <MapContainer
      center={[51.505, -0.09]}
      zoom={15}
      style={{ height: 'calc(100% - 5px)', width: '100%', position: 'absolute' }}
      doubleClickZoom={false}
    >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={onCreated}
            onDrawVertex={onDrawVertex}
            onDrawPolyline={onDrawPolyline}
            draw={{
              rectangle: false,
              circle: true,
              polyline: false,
              marker: false,
              polygon: false,
              circlemarker: false,
            }}
          />
        </FeatureGroup>

        <MeasureControl />
        <SetViewOnZoom bounds={bounds} />

        {selectedLayers.geoData && <GeoJSON data={geoData} style={{ color: 'blue' }} />}
        {selectedLayers.Interiorlines && <GeoJSON data={Interiorlines} style={{ color: 'red' }} />}
        {selectedLayers.BO && <GeoJSON data={BO} style={{ color: 'purple' }} />}
        {selectedLayers.Dots && Dots.features.length > 0 && (
          <GeoJSON data={Dots} pointToLayer={(feature, latlng) => L.circle(latlng, {
            radius: 5,
            color: 'green',
            fillColor: 'green',
            fillOpacity: 0.5,
          }).bindPopup(feature.properties.description)} />
        )}
        {selectedLayers.Road41 && <GeoJSON data={Road41} style={{ color: 'magenta' }} />}
        {selectedLayers.Road42 && <GeoJSON data={Road42} style={{ color: 'brown' }} />}
        {selectedLayers.BO41 && <GeoJSON data={BO41} style={{ color: 'cyan' }} />}
        {selectedLayers.Plotclass && <GeoJSON data={Plotclass} style={{ color: 'yellow' }} />}

        {selectedLayers.Path && <GeoJSON data={Path} style={{ color: 'gray' }} />}
        {selectedLayers.Schemes && Schemes.features.length > 0 && (
          <GeoJSON data={Schemes} pointToLayer={(feature, latlng) => L.circle(latlng, {
            radius: 5,
            color: 'green',
            fillColor: 'green',
            fillOpacity: 0.5,
          }).bindPopup(feature.properties.description)} />
        )}
        {selectedLayers.TP41 && <GeoJSON data={TP41} style={{ color: 'purple' }} />}
        {selectedLayers.Outerpath && <GeoJSON data={Outerpath} style={{ color: 'yellow' }} />}
        {selectedLayers.Plotclass42 && <GeoJSON data={Plotclass42} style={{ color: 'pink' }} />}
        {selectedLayers.TP42Plots && <GeoJSON data={TP42Plots} style={{ color: 'violet' }} />}
        {selectedLayers.Schemes42 && Schemes42.features.length > 0 && (
          <GeoJSON data={Schemes42} pointToLayer={(feature, latlng) => L.circle(latlng, {
            radius: 5,
            color: 'orange',
            fillColor: 'orange',
            fillOpacity: 0.5,
          }).bindPopup(feature.properties.description)} />
        )}
        {selectedLayers.ClassPlot && <GeoJSON data={ClassPlot} style={{ color: 'brown' }} />}
      </MapContainer>
    </div>
  );
};

export default Users;
