import React from 'react';
import { BarChart3 } from 'lucide-react';
import { BOA_SAFRA } from '../../data/boasafra';
import { RatingScale } from '../ui/RatingBadge';

const CONTRIB_CONFIG = {
  negative: { color: '#ef4444', icon: '↑', label: '↑ Eleva' },
  positive: { color: '#10b981', icon: '↓', label: '↓ Reduz' },
};

export function RatingComposition() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <BarChart3 size={15} color="#f59e0b" />
        <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>
          Composição do Rating {BOA_SAFRA.rating}
        </span>
      </div>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table className="cr-table" style={{ minWidth: 460 }}>
          <thead>
            <tr>
              <th>Dimensão</th>
              <th>Avaliação</th>
              <th>Peso</th>
              <th>Contribuição</th>
            </tr>
          </thead>
          <tbody>
            {BOA_SAFRA.ratingComposition.map((row) => {
              const cfg = CONTRIB_CONFIG[row.contributionDir] || CONTRIB_CONFIG.negative;
              return (
                <tr key={row.id}>
                  <td>
                    <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{row.dimension}</span>
                  </td>
                  <td>{row.evaluation}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 600, color: '#94a3b8' }}>{row.weight}</span>
                      <div
                        style={{
                          height: 4,
                          width: row.weightVal * 1.6,
                          background: 'linear-gradient(90deg, #1a2744, #2d4a7a)',
                          borderRadius: 2,
                          overflow: 'hidden',
                          position: 'relative',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: `linear-gradient(90deg, ${cfg.color}40, ${cfg.color}90)`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: 12, fontWeight: 600, color: cfg.color }}>
                      {cfg.label} risco
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Scale */}
      <div>
        <div
          style={{
            fontSize: 10,
            color: '#475569',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          Escala de Rating
        </div>
        <RatingScale active={BOA_SAFRA.rating} />
      </div>
    </div>
  );
}
