# Smart Ride Matching & Surge Pricing Engine (MERN + Frontend)

Overview
This repo is a starter MERN implementation of a Smart Ride Matching & Surge Pricing Engine with a minimal React frontend. It demonstrates:
- Real-time-ish driver heartbeats (HTTP for simplicity)
- Ride request endpoint that triggers greedy matching
- Region-based surge pricing with EWMA smoothing and caps
- Minimal UI to submit ride requests and view drivers & surge

Stack
- Backend: Node.js, Express, Mongoose (MongoDB)
- Frontend: React (Create React App structure), plain CSS
- Optional: Redis for geo queries and atomic reservations (not required for prototype)

What’s included
- Backend API: /api/driver/heartbeat, /api/ride/request, /api/surge/:region
- Simple in-memory geo utils + JS implementations of matching & surge
- React client to submit requests and show basic state

Quickstart (local)
1. Install MongoDB and run it locally (or set MONGODB_URI to your hosted cluster).
2. Start backend:
   - cd server
   - cp .env.example .env  (edit MONGODB_URI if needed)
   - npm install
   - npm run dev
3. Start frontend:
   - cd client
   - npm install
   - npm start
4. Open http://localhost:3000

Notes
- This prototype uses a simple greedy match and region keyed surge. For production, replace in-memory or coarse geo logic with Redis GEOSEARCH or spatial indexing and implement atomic reservations using Redis locks.
- Consider using WebSockets or Socket.io for live push of driver locations and request assignments.

Next improvements you can ask me to implement:
- Redis-backed geo index + atomic driver reservation example
- Acceptance probability model and simulated history ingestion pipeline
- Pooling/batching support (multi-stop matching)
- Scaling notes + Kubernetes deployment manifest
