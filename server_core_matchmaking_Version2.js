// Greedy scoring matcher in JS
const { haversineKm } = require('../utils/geo');

function estimateMinutesFromKm(km, avgKmh = 30.0) {
  return (km / avgKmh) * 60.0;
}

function scoreDriver(requestOrigin, driver, weights = null) {
  if (!weights) {
    weights = { eta: -1.0, idle: 0.5, accept: 1.0, penalty: -0.7 };
  }
  const distKm = haversineKm(requestOrigin.lat, requestOrigin.lon, driver.location.coordinates[1], driver.location.coordinates[0]);
  const etaMin = estimateMinutesFromKm(distKm);
  const idle = (driver.idleSeconds || 0) / 60.0;
  const acceptRate = driver.recentAcceptRate || 0.8;
  const recentAssigned = driver.recentAssignedCount || 0;

  const s = (weights.eta * etaMin) +
            (weights.idle * idle) +
            (weights.accept * acceptRate) +
            (weights.penalty * recentAssigned);
  return s;
}

// drivers: array of driver documents
function matchGreedy(requestOrigin, drivers) {
  let best = null;
  let bestScore = -1e9;
  for (const d of drivers) {
    if (d.status !== 'available') continue;
    const sc = scoreDriver(requestOrigin, d);
    if (sc > bestScore) {
      bestScore = sc;
      best = d;
    }
  }
  return best;
}

module.exports = { matchGreedy, scoreDriver };