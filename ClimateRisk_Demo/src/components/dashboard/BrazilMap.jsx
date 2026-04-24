import React, { useState } from 'react';
import { BRAZIL_STATES, MAP_SCENARIOS, RISK_COLORS, RISK_LABELS } from '../../data/climateEvents';
import { FilterButtons } from '../ui/FilterButtons';

const MAP_FILTERS = [
  { key: '7d',  label: '7 dias'   },
  { key: '30d', label: '30 dias'  },
  { key: '12m', label: '12 meses' },
  { key: '5y',  label: '5 anos'   },
];

function getCenter(pts) {
  const pairs = pts.split(' ').map((p) => p.split(',').map(Number));
  const n = pairs.length;
  const cx = pairs.reduce((s, p) => s + p[0], 0) / n;
  const cy = pairs.reduce((s, p) => s + p[1], 0) / n;
  return [cx, cy];
}

export function BrazilMap() {
  const [filter, setFilter] = useState('30d');
  const [hovered, setHovered] = useState(null);
  const scenario = MAP_SCENARIOS[filter];

  const LABELED = new Set(['AM', 'PA', 'TO', 'MA', 'PI', 'BA', 'MT', 'GO', 'MS', 'MG', 'SP', 'PR', 'RS', 'RO']);

  return (
    <div>
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#10b981',
            }}
          />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>
            Mapa de Exposição Regional
          </span>
        </div>
        <FilterButtons options={MAP_FILTERS} active={filter} onChange={setFilter} />
      </div>

      {/* SVG Map */}
      <div style={{ position: 'relative' }}>
        <svg
          viewBox="0 0 610 740"
          style={{
            width: '100%',
            maxWidth: 480,
            display: 'block',
            margin: '0 auto',
            filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.6))',
          }}
        >
          {BRAZIL_STATES.map(({ id, label, pts, labelPos }) => {
            const risk = scenario[id] || 'none';
            const fill = RISK_COLORS[risk];
            const isHovered = hovered === id;
            const [lx, ly] = labelPos || getCenter(pts);
            const showLabel = LABELED.has(id);

            return (
              <g key={id}>
                <polygon
                  points={pts}
                  fill={fill}
                  fillOpacity={isHovered ? 0.95 : risk === 'none' ? 0.6 : 0.78}
                  stroke="#050a18"
                  strokeWidth={1.5}
                  style={{ transition: 'fill 0.5s ease, fill-opacity 0.25s ease', cursor: 'default' }}
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered(null)}
                />
                {showLabel && (
                  <text
                    x={lx}
                    y={ly + 4}
                    textAnchor="middle"
                    fontSize={id === 'AM' || id === 'PA' || id === 'MT' ? 11 : 9}
                    fontWeight="600"
                    fill="rgba(255,255,255,0.82)"
                    fontFamily="Inter, sans-serif"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {hovered && (
          <div
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              background: 'rgba(13,21,38,0.95)',
              border: '1px solid #1a2744',
              borderRadius: 8,
              padding: '8px 12px',
              fontSize: 12,
              color: '#f1f5f9',
              pointerEvents: 'none',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div style={{ fontWeight: 600 }}>{hovered}</div>
            <div style={{ color: RISK_COLORS[scenario[hovered] || 'none'], marginTop: 2 }}>
              {RISK_LABELS[scenario[hovered] || 'none']}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          marginTop: 14,
          justifyContent: 'center',
        }}
      >
        {Object.entries(RISK_LABELS).map(([k, v]) => (
          <div
            key={k}
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#64748b' }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                backgroundColor: RISK_COLORS[k],
                opacity: 0.85,
              }}
            />
            {v}
          </div>
        ))}
      </div>
    </div>
  );
}
