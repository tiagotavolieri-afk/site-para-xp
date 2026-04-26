import React, { useState, useEffect } from 'react';
import { FilterButtons } from '../ui/FilterButtons';
import { getMapRiskData, computeONIRisk } from '../../services/climateService';
import { getONIData } from '../../services/oniService';
import { MAP_SCENARIOS, RISK_COLORS, RISK_LABELS } from '../../data/climateEvents';
import { BRAZIL_VIEWBOX, BRAZIL_GEO_STATES } from '../../data/brazilGeo';

const MAP_FILTERS = [
  { key: '7d',  label: '7 dias'   },
  { key: '30d', label: '30 dias'  },
  { key: '12m', label: '12 meses' },
  { key: '5y',  label: '5 anos'   },
];

const API_FORECAST_DAYS = { '7d': 7, '30d': 16 };

const RISK_COLORS_API = {
  alto: '#DE482B', medio: '#FCCF03', baixo: '#81C046', none: '#132040',
};

const RISK_LABELS_API = {
  alto: 'Alto risco', medio: 'Risco moderado', baixo: 'Baixo risco', none: 'Sem dados',
};

// ── SVG renderer ─────────────────────────────────────────────────────────────
// Show labels on all states; big states get larger font
const BIG_LABELS = new Set(['AM', 'PA', 'MT', 'BA', 'MG', 'GO', 'RO']);
const MED_LABELS = new Set(['MA', 'PI', 'TO', 'MS', 'SP', 'PR', 'RS', 'CE', 'AC', 'RR', 'AP', 'PB', 'PE', 'AL', 'SE', 'RN', 'SC', 'ES', 'RJ', 'MG']);

function SVGRenderer({ filter, riskData, loading }) {
  const [hovered, setHovered] = useState(null);
  const scenario = MAP_SCENARIOS[filter] || {};

  function getStateFill(sigla) {
    if (riskData && riskData[sigla]) return RISK_COLORS_API[riskData[sigla]] || '#132040';
    const risk = scenario[sigla] || 'none';
    return RISK_COLORS[risk] || '#132040';
  }

  return (
    <div style={{ position: 'relative' }}>
      <svg
        viewBox={BRAZIL_VIEWBOX}
        style={{
          width: '100%',
          maxWidth: 520,
          display: 'block',
          margin: '0 auto',
          filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.6))',
          opacity: loading ? 0.55 : 1,
          transition: 'opacity 0.4s ease',
        }}
      >
        {BRAZIL_GEO_STATES.map(({ sigla, name, paths, labelX, labelY }) => {
          const fill = getStateFill(sigla);
          const isHovered = hovered === sigla;
          return (
            <g key={sigla}>
              {paths.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill={fill}
                  fillOpacity={isHovered ? 0.95 : 0.78}
                  stroke="#050a18"
                  strokeWidth={0.8}
                  style={{ transition: 'fill 0.5s ease, fill-opacity 0.25s ease', cursor: 'default' }}
                  onMouseEnter={() => setHovered(sigla)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <title>{name}</title>
                </path>
              ))}
              {/* Always show label on every state */}
              <text
                x={labelX}
                y={labelY + 3}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={BIG_LABELS.has(sigla) ? 11 : MED_LABELS.has(sigla) ? 9 : 7}
                fontWeight="700"
                fill="rgba(255,255,255,0.9)"
                fontFamily="Inter, sans-serif"
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                {sigla}
              </text>
            </g>
          );
        })}
      </svg>
      {hovered && (
        <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(13,21,38,0.95)', border: '1px solid #1a2744', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: '#f1f5f9', pointerEvents: 'none', backdropFilter: 'blur(8px)' }}>
          <div style={{ fontWeight: 600 }}>{hovered}</div>
          <div style={{ color: riskData && riskData[hovered] ? RISK_COLORS_API[riskData[hovered]] : RISK_COLORS[scenario[hovered] || 'none'], marginTop: 2 }}>
            {riskData && riskData[hovered] ? RISK_LABELS_API[riskData[hovered]] : RISK_LABELS[scenario[hovered] || 'none']}
          </div>
        </div>
      )}
      {/* Legenda */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 14, justifyContent: 'center' }}>
        {[['alto', '#DE482B', 'Alto risco'], ['medio', '#FCCF03', 'Moderado'], ['baixo', '#81C046', 'Baixo risco']].map(([k, c, l]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#8ca0b8' }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: c, opacity: 0.85, flexShrink: 0 }} />
            {l}
          </div>
        ))}
      </div>
      {loading && (
        <div style={{ textAlign: 'center', marginTop: 8, fontSize: 11, color: '#3d5070' }}>
          Atualizando dados climáticos...
        </div>
      )}
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────
export function BrazilMap() {
  const [filter, setFilter] = useState('30d');
  const [apiRisk, setApiRisk] = useState({});
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  // 7d / 30d — Open-Meteo with 5-min auto-refresh
  useEffect(() => {
    const days = API_FORECAST_DAYS[filter];
    if (!days) return;
    let cancelled = false;
    function fetchData() {
      setLoading(true);
      getMapRiskData(days).then(data => {
        if (!cancelled) { setApiRisk(prev => ({ ...prev, [filter]: data })); setLoading(false); setLastUpdate(new Date()); }
      }).catch(() => { if (!cancelled) setLoading(false); });
    }
    fetchData();
    const iv = setInterval(fetchData, 5 * 60 * 1000);
    return () => { cancelled = true; clearInterval(iv); };
  }, [filter]);

  // 12m / 5y — ONI-based real-time risk with 10-min auto-refresh
  useEffect(() => {
    if (filter !== '12m' && filter !== '5y') return;
    let cancelled = false;
    function fetchONI() {
      setLoading(true);
      getONIData().then(oni => {
        if (!cancelled) {
          setApiRisk(prev => ({ ...prev, [filter]: computeONIRisk(oni, filter) }));
          setLoading(false);
          setLastUpdate(new Date());
        }
      }).catch(() => { if (!cancelled) setLoading(false); });
    }
    fetchONI();
    const iv = setInterval(fetchONI, 10 * 60 * 1000);
    return () => { cancelled = true; clearInterval(iv); };
  }, [filter]);

  const riskData = apiRisk[filter] || {};

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: loading ? '#FBC102' : '#00C8BB', transition: 'background 0.3s' }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>
            Mapa de Exposição Regional
          </span>
          {lastUpdate && (
            <span style={{ fontSize: 10, color: '#444' }}>
              · {lastUpdate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
        <FilterButtons options={MAP_FILTERS} active={filter} onChange={setFilter} />
      </div>

      <SVGRenderer filter={filter} riskData={riskData} loading={loading} />
    </div>
  );
}
