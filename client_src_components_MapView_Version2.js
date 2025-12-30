import React from 'react';

export default function MapView({ drivers }) {
  // Placeholder static map / minimal visualization
  return (
    <div className="map-view">
      <h3>Map / Drivers (placeholder)</h3>
      <div className="map-area">
        <p>Driver visualization is a demo placeholder. Integrate Mapbox/Leaflet for real map.</p>
        <ul>
          {drivers.length === 0 ? <li>No live driver data</li> : drivers.map(d => (
            <li key={d.driverId}>{d.driverId} — {d.status}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}