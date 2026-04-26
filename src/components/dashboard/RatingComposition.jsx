import React from 'react';
import { BarChart3 } from 'lucide-react';
import { BOA_SAFRA } from '../../data/boasafra';
import { RatingScale } from '../ui/RatingBadge';

const CONTRIB_CONFIG = {
  negative: { color: '#ef4444', icon: '↑', label: '↑ Eleva' },
  positive: { color: '#00C8BB', icon: '↓', label: '↓ Reduz' },
};

export function RatingComposition() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <BarChart3 size={15} color="#f59e0b" />
        <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>
          Composição do Rating {BOA_SAFRA.rating}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {BOA_SAFRA.ratingComposition.map((row) => {
          const cfg = CONTRIB_CONFIG[row.contributionDir] || CONTRIB_CONFIG.negative;
          return (
            <div
              key={row.id}
              style={{
                background: '#282828',
                border: `1px solid ${cfg.color}28`,
                borderRadius: 12,
                padding: '16px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {/* Title row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0', lineHeight: 1.35 }}>
                  {row.dimension}
                </span>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 8,
                  background: `${cfg.color}18`, color: cfg.color,
                  border: `1px solid ${cfg.color}35`,
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}>
                  {cfg.label}
                </span>
              </div>

              {/* Evaluation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>Avaliação</span>
                <span style={{ fontSize: 12, color: '#cbd5e1', fontWeight: 600 }}>{row.evaluation}</span>
              </div>

              {/* Weight bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                  <span style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>Peso</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8' }}>{row.weight}</span>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${row.weightVal}%`,
                    background: `linear-gradient(90deg, ${cfg.color}50, ${cfg.color})`,
                    borderRadius: 3,
                  }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scale */}
      <div>
        <div style={{
          fontSize: 10, color: '#475569',
          textTransform: 'uppercase', letterSpacing: '0.08em',
          fontWeight: 600, marginBottom: 12,
        }}>
          Escala de Rating
        </div>
        <RatingScale active={BOA_SAFRA.rating} />
      </div>
    </div>
  );
}
