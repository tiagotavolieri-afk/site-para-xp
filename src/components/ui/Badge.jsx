import React from 'react';

const VARIANT_STYLES = {
  blue: {
    bg: 'rgba(59, 119, 188, 0.12)',
    color: '#5a92d4',
    border: 'rgba(59, 119, 188, 0.35)',
  },
  red: {
    bg: 'rgba(222, 72, 43, 0.12)',
    color: '#e86a52',
    border: 'rgba(222, 72, 43, 0.35)',
  },
  green: {
    bg: 'rgba(129, 192, 70, 0.12)',
    color: '#9dd464',
    border: 'rgba(129, 192, 70, 0.35)',
  },
  yellow: {
    bg: 'rgba(252, 207, 3, 0.12)',
    color: '#fdd835',
    border: 'rgba(252, 207, 3, 0.35)',
  },
  muted: {
    bg: 'rgba(19, 32, 64, 0.6)',
    color: '#4a6080',
    border: 'rgba(28, 47, 87, 0.8)',
  },
};

const SIZE_STYLES = {
  sm: { fontSize: 10, padding: '2px 8px' },
  md: { fontSize: 11, padding: '3px 10px' },
};

export function Badge({ children, variant = 'muted', size = 'md', className = '', dot = false }) {
  const s = VARIANT_STYLES[variant] || VARIANT_STYLES.muted;
  const sz = SIZE_STYLES[size] || SIZE_STYLES.md;

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        backgroundColor: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        borderRadius: 20,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        fontSize: sz.fontSize,
        padding: sz.padding,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        lineHeight: 1,
      }}
    >
      {dot && (
        <span
          className="animate-pulse-dot"
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            backgroundColor: s.color,
            flexShrink: 0,
          }}
        />
      )}
      {children}
    </span>
  );
}

export function SeverityBadge({ severity }) {
  const map = {
    high:   { label: 'Alta',     variant: 'red'    },
    medium: { label: 'Moderada', variant: 'yellow' },
    low:    { label: 'Baixa',    variant: 'green'  },
    info:   { label: 'Info',     variant: 'blue'   },
  };
  const { label, variant } = map[severity] || map.info;
  return <Badge variant={variant}>{label}</Badge>;
}

export function ImpactBadge({ type, children }) {
  const map = {
    positive: 'green',
    negative: 'red',
    warning:  'yellow',
    neutral:  'blue',
  };
  return <Badge variant={map[type] || 'muted'}>{children}</Badge>;
}
