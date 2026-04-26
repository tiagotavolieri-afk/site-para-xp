import axios from 'axios';

const MOCK_ONI = { value: -0.8, phase: 'La Niña', intensity: 'moderado' };

function parseONI(text) {
  const lines = text.trim().split('\n').filter(l => l.trim() && !l.startsWith('YR') && !l.startsWith('SEAS'));
  if (!lines.length) return MOCK_ONI;
  const parts = lines[lines.length - 1].trim().split(/\s+/);
  const value = parseFloat(parts[2]);
  if (isNaN(value)) return MOCK_ONI;

  let phase = 'Neutro';
  let intensity = 'fraco';
  if (value <= -0.5) {
    phase = 'La Niña';
    intensity = value <= -1.5 ? 'forte' : value <= -1.0 ? 'moderado' : 'fraco';
  } else if (value >= 0.5) {
    phase = 'El Niño';
    intensity = value >= 1.5 ? 'forte' : value >= 1.0 ? 'moderado' : 'fraco';
  }
  return { value, phase, intensity };
}

export async function getONIData() {
  try {
    const { data } = await axios.get(
      'https://www.cpc.ncep.noaa.gov/data/indices/oni.ascii.txt',
      { timeout: 5000 }
    );
    return parseONI(data);
  } catch {
    return MOCK_ONI;
  }
}
