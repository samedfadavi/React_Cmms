import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import Graphic from '@arcgis/core/Graphic';
import Polygon from '@arcgis/core/geometry/Polygon';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { SimpleFillSymbol } from '@arcgis/core/symbols';


const MapComponent = forwardRef((props, ref) => {
  const [view, setView] = useState(null);
  const [polygon, setPolygon] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const mapRef = useRef();

  useImperativeHandle(ref, () => ({
    selectArea: () => {
      if (view) {
        setIsDrawing(!isDrawing);
        if (!isDrawing) {
          view.on("click", handleMapClick);
        } else {
          view.off("click", handleMapClick);
          setPolygon(null);
        }
      }
    },
  }));

  const handleMapClick = (event) => {
    if (!polygon) {
      const newPolygon = new Polygon({
        rings: [],
      });
      setPolygon(newPolygon);
    }

    const point = [event.mapPoint.longitude, event.mapPoint.latitude];
    polygon.addRing([point]);

    const symbol = new SimpleFillSymbol({
      color: [51, 51, 255, 0.5],
      outline: {
        color: [255, 255, 255],
        width: 1,
      },
    });

    const graphic = new Graphic({
      geometry: polygon,
      symbol: symbol,
    });

    view.graphics.removeAll();
    view.graphics.add(graphic);

    if (polygon.rings[0].length === 4) {
      view.off("click", handleMapClick);
      setIsDrawing(false);
      alert(`Selected Area Geometry: ${JSON.stringify(polygon)}`);
      console.log('Selected Area Geometry:', polygon);
    }
  };

  const layerUrls = [
    "http://localhost:6080/arcgis/rest/services/CmmsMapService/MapServer/7",
    "http://localhost:6080/arcgis/rest/services/CmmsMapService/MapServer/4",
    "http://localhost:6080/arcgis/rest/services/CmmsMapService/MapServer/1",
  ];
  const layers = layerUrls.map(url => new FeatureLayer({ url }));

  useEffect(() => {
    const webMap = new WebMap({
      basemap: 'osm',
      layers,
    });

    const mapView = new MapView({
      container: mapRef.current,
      map: webMap,
     
    });

    setView(mapView);

    layers[0].when(() => {
      layers[0].queryExtent().then((response) => {
        if (response.extent) {
          // Calculate the center of the extent
          const centerX = (response.extent.xmin + response.extent.xmax) / 2;
          const centerY = (response.extent.ymin + response.extent.ymax) / 2;

          const centerPoint = new Point({
            longitude: centerX,
            latitude: centerY
          });

          // Zoom to the center point
          mapView.goTo({
            target: centerPoint,
            zoom: 12 // Set the desired zoom level
          }).catch((err) => {
            console.error("Error during zooming:", err);
          });
        } else {
          console.warn("No extent found for the layer.");
        }
      });
    });

    return () => {
      if (mapView) {
        mapView.destroy();
      }
    };
  }, []);

  return <div ref={mapRef} style={{ height: '60vh', width: '100%' }} />;
});

export default MapComponent;
