'use client'

// import React, { useEffect } from 'react';
import { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactMapGL, { Marker, MapEvent } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import RoomIcon from '@mui/icons-material/Room';

// if (typeof process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN === 'string') {
//   mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
// } else {
//   console.error('Mapbox acces token is not set!');
// };

type Place = {
  lat: number;
  long: number;
} | null;

type ViewportType = {
  latitude: number;
  longitude: number;
  zoom: number;
}

const MapComponent = () => {
  // useEffect(() => {
  //   // Function to initialize the map
  //   const initializeMap = ({ coords }: GeolocationPosition) => {
  //     const { latitude, longitude } = coords; 
  //     // console.log(`User's Position:`, coords); // Logging the user's position

  //     // Run once the component mounts
  //     const map = new mapboxgl.Map({
  //       container: 'map', // container ID should match the ID of the div below
  //       style: 'mapbox://styles/mapbox/streets-v11', // style URL
  //       center: [longitude, latitude], // [-74.5, 40], // successLocation(), // starting position [lng, lat]
  //       zoom: 12, // starting zoom
  //     });
  //   };

  //   // Check if the Geolocation API is available in the user's browser
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition(initializeMap, console.error, { 
  //       enableHighAccuracy: true 
  //     });
  //   } else {
  //     console.error('Geolocation is not supported by your browser');
  //     // Initialize the map with a fallback location
  //     const fallbackPosition: GeolocationPosition = {
  //       coords: {
  //         latitude: 40,
  //         longitude: -74.5,
  //         accuracy: 10000,
  //         altitude: null,
  //         altitudeAccuracy: null,
  //         heading: null,
  //         speed: null
  //       },
  //       timestamp: Date.now()
  //     };
  //     // initializeMap({ coords: { latitude: -74.5, longitude: 40 } });
  //     initializeMap(fallbackPosition);      
  //   }
  //   // return () => map.remove();    
  // }, []);

  // return <div id='map' style={{ height: '100vh', width: '90vw' }}></div>;

  const [newPlace, setNewPlace] = useState<Place>(null);
  const [viewPort, setViewPort] = useState<ViewportType>({
    latitude: 40, 
    longitude: -74.5,
    zoom: 9,
  });

  function handleClick(e: any) {
    console.log('Clicked map at', e.lngLat);
    const { lng: longitude, lat: latitude} = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  }

  const handleViewportChange = (newViewport: ViewportType) => {
    setViewPort(newViewport);
  }


  return (
    <div id='map' style={{ height: '100vh', width: '90vw', zIndex:999 }}>
      <ReactMapGL
        {...viewPort}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        width='100%'
        height='100%'
        transitionDuration='200'
        mapStyle='mapbox://styles/wanderlustking/clst74y37000401p9hfssdr4z'
        onViewportChange={handleViewportChange}
        onDblClick={handleClick}
      >
        
       {newPlace ? (
        <>
          <Marker
            latitude={newPlace?.lat}
            longitude={newPlace?.long}
            offset={[-3.5 * viewPort.zoom, -7 * viewPort.zoom]}
          >
            <RoomIcon 
              style={{
                fontSize: 7 * viewPort.zoom,
                color: 'tomato',
                cursor: 'pointer'
              }}              
            />
          </Marker>
        </>
       ):null}

      </ReactMapGL>
    </div>
  );
};

export default MapComponent;