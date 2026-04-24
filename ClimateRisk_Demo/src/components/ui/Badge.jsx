import React from 'react';

const VARIANT_STYLES = {
  green: {
    bg: 'rgba(16,185,129,0.12)',
    color: '#10b981',
    border: 'rgba(16,185,129,0.3)',
  },
  amber: {
    bg: 'rgba(245,158,11,0.12)',
    color: '#f59e0b',
    border: 'rgba(245,158,11,0.3)',
  },
  red: {
    bg: 'rgba(239,68,68,0.12)',
    color: '#ef4444',
    border: 'rgba(239,68,68,0.3)',
  },
  blue: {
    bg: 'rgba(96,165,250,0.12)',
    color: '#60a5fa',
    border: 'rgba(96,165,250,0.3)',
  },
  gray: {
    bg: 'rgba(71,85,105,0.25)',
    color: '#64748b',
    border: 'rgba(71,85,105,0.4)',
  },
  muted: {
    bg: 'rgba(30,45,74,0.6)',
    color: '#475569',
    border: 'rgba(30,45,74,0.8)',
  },
};

export function Badge({ children, variant = 'gray', className = '', dot = false }) {
  const s = VARIANT_STYLES[variant] || VARIANT_STYLES.gray;

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full ${className}`}
      style={{
        backgroundColor: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
      }}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: s.color }}
        />
      )}
      {children}
    </span>
  );
}

export function SeverityBadge({ severity }) {
  const map = {
    high:   { label: 'Alta',     variant: 'red'   },
    medium: { label: 'Moderada', variant: 'amber' },
    low:    { label: 'Baixa',    variant: 'green' },
    info:   { label: 'Info',     variant: 'blue'  },
  };
  const { label, variant } = map[severity] || map.info;
  return <Badge variant={variant}>{label}</Badge>;
}

export function ImpactBadge({ type, children }) {
  const map = {
    positive: 'green',
    negative: 'red',
    warning:  'amber',
    neutral:  'blue',
  };
  return <Badge variant={map[type] || 'gray'}>{children}</Badge>;
}
