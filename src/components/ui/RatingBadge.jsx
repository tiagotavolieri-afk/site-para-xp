import React from 'react';

const RATING_CONFIG = {
  A: { color: '#81C046', bg: 'rgba(129, 192, 70, 0.12)', border: 'rgba(129, 192, 70, 0.45)', glow: 'rgba(129, 192, 70, 0.2)',  label: 'Mínimo'   },
  B: { color: '#4db89e', bg: 'rgba(77, 184, 158, 0.12)', border: 'rgba(77, 184, 158, 0.45)', glow: 'rgba(77, 184, 158, 0.2)',  label: 'Baixo'    },
  C: { color: '#FCCF03', bg: 'rgba(252, 207, 3, 0.12)',  border: 'rgba(252, 207, 3, 0.45)',  glow: 'rgba(252, 207, 3, 0.2)',  label: 'Moderado' },
  D: { color: '#f5823a', bg: 'rgba(245, 130, 58, 0.12)', border: 'rgba(245, 130, 58, 0.45)', glow: 'rgba(245, 130, 58, 0.2)', label: 'Alto'     },
  E: { color: '#DE482B', bg: 'rgba(222, 72, 43, 0.12)',  border: 'rgba(222, 72, 43, 0.45)',  glow: 'rgba(222, 72, 43, 0.2)',  label: 'Crítico'  },
};

const SIZE_CONFIG = {
  sm: { width: 28, height: 28, fontSize: 13, borderWidth: 1.5 },
  md: { width: 36, height: 36, fontSize: 16, borderWidth: 2   },
  lg: { width: 64, height: 64, fontSize: 28, borderWidth: 2.5 },
  xl: { width: 88, height: 88, fontSize: 40, borderWidth: 3   },
};

export function RatingBadge({ rating, size = 'md' }) {
  const cfg = RATING_CONFIG[rating] || RATING_CONFIG.C;
  const s = SIZE_CONFIG[size] || SIZE_CONFIG.md;

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
        fontFamily: 'Inter, sans-serif',
        color: cfg.color,
        backgroundColor: cfg.bg,
        border: `${s.borderWidth}px solid ${cfg.border}`,
        flexShrink: 0,
        boxShadow: `0 0 ${size === 'lg' || size === 'xl' ? '24px' : '12px'} ${cfg.glow}`,
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
              border: `1px solid ${isActive ? cfg.border : 'rgba(19, 32, 64, 0.8)'}`,
              backgroundColor: isActive ? cfg.bg : 'rgba(8, 15, 30, 0.6)',
              transform: isActive ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.2s ease',
              boxShadow: isActive ? `0 0 18px ${cfg.glow}` : 'none',
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 18, color: cfg.color }}>{g}</span>
            <div>
              <div style={{ fontSize: 11, color: isActive ? cfg.color : '#4a6080', fontWeight: 500 }}>{cfg.label}</div>
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
