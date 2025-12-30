// Minimal geo helpers (haversine)
const EARTH_R_KM = 6371.0;

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function haversineKm(aLat, aLon, bLat, bLon) {
  const dLat = deg2rad(bLat - aLat);
  const dLon = deg2rad(bLon - aLon);
  const rlat1 = deg2rad(aLat);
  const rlat2 = deg2rad(bLat);
  const aa = Math.sin(dLat/2) * Math.sin(dLat/2) +
             Math.cos(rlat1) * Math.cos(rlat2) *
             Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));
  return EARTH_R_KM * c;
}

module.exports = { haversineKm };