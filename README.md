# Smart Ride Matching & Surge Pricing Engine

Overview
This repository contains a minimal but extensible implementation of a smart ride-matching and surge-pricing engine. It demonstrates:
- Real-time driver->rider matching with a configurable score function
- Surge pricing computed per region with smoothing and hard caps
- A small simulator to test matching + surge dynamics

Goals
- Fast, locality-aware matching
- Fairness and balancing over drivers (avoid starvation)
- Stable, explainable surge multipliers
- Easy to replace simulation with real telemetry (Redis/Kafka/Postgres)

Tech choices (starter)
- Language: Python 3.10+ (easy to prototype algorithms)
- In-memory store for realtime state (Redis recommended)
- Event bus: Kafka or Pulsar for production
- Persistent store: Postgres / Timescale for historical metrics
- Geo partitioning: geohash or S2 cells for region aggregation

Quick start (local)
1. Create a virtualenv and install:
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
2. Run the simulator:
   python simulate.py
   - The script shows matches and computed surge multipliers

Files included
- README.md (this)
- architecture.md — architecture, scaling, region design
- api_spec.yaml — quick API surface for client/driver
- matchmaking.py — core matching implementation
- surge.py — surge multiplier computation
- simulate.py — small simulator to exercise the engine
- requirements.txt

Next steps (suggested)
- Replace simulation input with driver heartbeats (Redis stream / Kafka) and rider requests (HTTP + event bus)
- Persist events and compute rolling aggregates (1m, 5m, 15m)
- Add ML demand forecasting for predictive surge (feeds into surge multiplier)
- Integrate driver preferences, acceptance models, and constraints (max detour, pool batching)
- Add CI tests and property testing for matcher fairness and stability