// Simple region-based surge engine (in-memory)
class SurgeEngine {
  constructor({ alpha = 0.5, base = 1.0, minMul = 1.0, maxMul = 3.0, ewmaAlpha = 0.3 } = {}) {
    this.alpha = alpha;
    this.base = base;
    this.minMul = minMul;
    this.maxMul = maxMul;
    this.ewmaAlpha = ewmaAlpha;
    this.smoothedRatio = new Map(); // regionId -> number
    this.lastUpdate = new Map();
  }

  updateCounts(regionId, demand, supply) {
    const rawRatio = demand / Math.max(supply, 1);
    const prev = this.smoothedRatio.get(regionId) ?? 1.0;
    const smoothed = (this.ewmaAlpha * rawRatio) + ((1 - this.ewmaAlpha) * prev);
    this.smoothedRatio.set(regionId, smoothed);
    this.lastUpdate.set(regionId, Date.now());
    return smoothed;
  }

  getMultiplier(regionId) {
    const r = this.smoothedRatio.get(regionId) ?? 1.0;
    let mul = this.base + this.alpha * (r - 1.0);
    mul = Math.max(this.minMul, Math.min(this.maxMul, mul));
    return Math.round(mul * 1000) / 1000;
  }
}

module.exports = new SurgeEngine();