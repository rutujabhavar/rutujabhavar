import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RequestForm from './components/RequestForm';
import MapView from './components/MapView';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api';

function App() {
  const [drivers, setDrivers] = useState([]);
  const [surge, setSurge] = useState(1.0);

  useEffect(() => {
    // Poll available drivers for demo (simple)
    const iv = setInterval(async () => {
      try {
        // this endpoint not provided; use /driver/heartbeat to seed drivers instead
        const res = await axios.get(`${API_BASE}/surge/default`);
        setSurge(res.data.multiplier);
      } catch (e) {}
    }, 2000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Smart Ride Demo (MERN)</h1>
        <div className="surge">Current surge (default region): <strong>{surge}x</strong></div>
      </header>
      <main>
        <div className="left">
          <RequestForm apiBase={API_BASE} />
        </div>
        <div className="right">
          <MapView drivers={drivers} />
        </div>
      </main>
      <footer>
        Prototype: not for production. Use Redis/MQ for scale and atomic assignment.
      </footer>
    </div>
  );
}

export default App;