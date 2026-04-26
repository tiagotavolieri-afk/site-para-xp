import axios from 'axios';

const STATE_COORDS = {
  MT: [-12.64, -55.42],
  GO: [-15.83, -49.83],
  MS: [-20.47, -54.62],
  BA: [-12.97, -41.47],
  PI: [-7.72,  -42.73],
  MA: [-5.07,  -45.27],
  TO: [-10.17, -48.33],
  SP: [-22.19, -48.79],
  PR: [-24.89, -51.55],
  RS: [-29.68, -53.80],
  SC: [-27.45, -51.01],
};

const MOCK_RISK = {
  MT: 'alto', GO: 'alto', MS: 'alto',
  BA: 'medio', PI: 'medio', MA: 'medio', TO: 'medio',
  SP: 'baixo', PR: 'baixo', RS: 'baixo', SC: 'baixo',
};

export async function getStateClimate(lat, lng, forecastDays = 7) {
  const { data } = await axios.get('https://api.open-meteo.com/v1/forecast', {
    params: {
      latitude: lat,
      longitude: lng,
      daily: 'precipitation_sum,temperature_2m_max',
      forecast_days: Math.min(forecastDays, 16),
      timezone: 'America/Sao_Paulo',
    },
    timeout: 8000,
  });
  return data;
}

export function getRiskLevel(precipitation, temperature) {
  const valid = precipitation.filter(v => v != null);
  const avgPrecip = valid.length ? valid.reduce((a, b) => a + b, 0) / valid.length : 5;
  const maxTemp = Math.max(...temperature.filter(t => t != null), 25);
  if (avgPrecip < 3 && maxTemp > 33) return 'alto';
  if (avgPrecip < 8 || maxTemp > 30) return 'medio';
  return 'baixo';
}

export async function getMapRiskData(forecastDays = 7) {
  try {
    const entries = await Promise.all(
      Object.entries(STATE_COORDS).map(async ([state, [lat, lng]]) => {
        const data = await getStateClimate(lat, lng, forecastDays);
        const risk = getRiskLevel(
          data.daily.precipitation_sum,
          data.daily.temperature_2m_max
        );
        return [state, risk];
      })
    );
    return Object.fromEntries(entries);
  } catch {
    return MOCK_RISK;
  }
}

// ── ONI-based risk for 12m / 5y horizons ─────────────────────────────────────
export function computeONIRisk(oniData, horizon) {
  const risk = {
    MT: 'medio', GO: 'medio', MS: 'baixo',
    BA: 'baixo', PI: 'baixo', MA: 'baixo', TO: 'baixo',
    SP: 'baixo', PR: 'baixo', RS: 'baixo', SC: 'baixo',
    RO: 'baixo', AC: 'baixo', AM: 'baixo', PA: 'baixo',
    RR: 'baixo', AP: 'baixo', MG: 'baixo', ES: 'baixo',
    RJ: 'baixo', DF: 'baixo', RN: 'baixo', PB: 'baixo',
    PE: 'baixo', AL: 'baixo', SE: 'baixo', CE: 'baixo',
  };
  if (!oniData) return risk;
  const { phase, value } = oniData;
  const strong = Math.abs(value) >= 1.0;

  if (phase === 'La Niña') {
    ['MT', 'GO', 'MS', 'DF'].forEach(s => { risk[s] = 'alto'; });
    const ne = strong ? 'alto' : 'medio';
    ['BA', 'PI', 'MA', 'TO', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE'].forEach(s => { risk[s] = ne; });
    if (horizon === '5y') ['SP', 'MG', 'RO'].forEach(s => { risk[s] = 'medio'; });
  } else if (phase === 'El Niño') {
    const sev = strong ? 'alto' : 'medio';
    ['PR', 'RS', 'SC'].forEach(s => { risk[s] = sev; });
    ['MT', 'GO', 'MS'].forEach(s => { risk[s] = 'medio'; });
    ['CE', 'RN'].forEach(s => { risk[s] = 'medio'; });
  } else {
    ['MT', 'GO'].forEach(s => { risk[s] = 'medio'; });
  }
  return risk;
}
