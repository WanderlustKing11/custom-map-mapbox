'use client'

import mapboxgl from 'mapbox-gl';
import React, { useEffect } from 'react';

if (typeof process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN === 'string') {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
} else {
  console.error('Mapbox acces token is not set!');
}  

const MapComponent = () => {
  useEffect(() => {
    // Run once the component mounts
    const map = new mapboxgl.Map({
        container: 'map', // container ID should match the ID of the div below
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9, // starting zoom
    });

    return () => map.remove();    
    }, []);
  
  return <div id='map' style={{ height: '400px', width: '100%' }}></div>;
};

export default MapComponent;