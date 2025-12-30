# Architecture (summary)

Components:
- API Gateway (Express)
- Matching workers (stateless Express endpoints in same process for prototype)
- Data store: MongoDB (drivers, requests). Optionally Redis for real-time geo & locks.
- Frontend: React app for demo / testing

Key flows:
- Drivers post heartbeat to /api/driver/heartbeat (updates DB)
- Riders post ride request to /api/ride/request -> server queries nearby drivers, scores them, assigns the best available driver
- Surge service computes multiplier per region based on rolling demand/supply with EWMA smoothing

Production considerations:
- Move driver location & availability to Redis for low-latency geo queries
- Use event bus (Kafka) to decouple and scale matching and surge computation
- Enforce idempotency and strong concurrency control on driver assignment (Redis lock)