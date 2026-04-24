import React from 'react';

const RATING_CONFIG = {
  A: { color: '#4ade80', bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.4)', label: 'Mínimo'   },
  B: { color: '#10b981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.4)', label: 'Baixo'    },
  C: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.4)', label: 'Moderado' },
  D: { color: '#fb923c', bg: 'rgba(251,146,60,0.12)', border: 'rgba(251,146,60,0.4)', label: 'Alto'     },
  E: { color: '#ef4444', bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.4)',  label: 'Crítico'  },
};

export function RatingBadge({ rating, size = 'md' }) {
  const cfg = RATING_CONFIG[rating] || RATING_CONFIG.C;

  const sizeStyles = {
    sm:  { width: 28, height: 28, fontSize: 13, borderWidth: 1.5 },
    md:  { width: 36, height: 36, fontSize: 16, borderWidth: 2   },
    lg:  { width: 56, height: 56, fontSize: 24, borderWidth: 2.5 },
    xl:  { width: 88, height: 88, fontSize: 40, borderWidth: 3   },
  };
  const s = sizeStyles[size] || sizeStyles.md;

  return (
    <div
      style={{
        width: s.width,
        height: s.height,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: s.fontSize,
        color: cfg.color,
        backgroundColor: cfg.bg,
        border: `${s.borderWidth}px solid ${cfg.border}`,
        flexShrink: 0,
        boxShadow: `0 0 16px ${cfg.border}`,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {rating}
    </div>
  );
}

export function RatingScale({ active }) {
  const grades = Object.entries(RATING_CONFIG);
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {grades.map(([g, cfg]) => {
        const isActive = g === active;
        return (
          <div
            key={g}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 14px',
              borderRadius: 10,
              border: `1px solid ${isActive ? cfg.border : 'rgba(26,39,68,0.8)'}`,
              backgroundColor: isActive ? cfg.bg : 'rgba(13,21,38,0.6)',
              transform: isActive ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.2s ease',
              boxShadow: isActive ? `0 0 18px ${cfg.border}` : 'none',
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 18, color: cfg.color }}>{g}</span>
            <div>
              <div style={{ fontSize: 11, color: isActive ? cfg.color : '#475569', fontWeight: 500 }}>{cfg.label}</div>
              {isActive && (
                <div style={{ fontSize: 10, color: cfg.color, opacity: 0.7, marginTop: 1 }}>◄ atual</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
