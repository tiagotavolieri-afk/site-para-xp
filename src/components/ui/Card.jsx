import React, { useState } from 'react';

const VARIANT_BASE = {
  default: {
    background: 'rgba(8, 15, 30, 0.75)',
    border: '1px solid rgba(19, 32, 64, 0.9)',
  },
  blue: {
    background: 'rgba(8, 15, 30, 0.75)',
    border: '1px solid rgba(59, 119, 188, 0.3)',
    boxShadow: '0 0 24px rgba(59, 119, 188, 0.08)',
  },
  danger: {
    background: 'rgba(8, 15, 30, 0.75)',
    border: '1px solid rgba(222, 72, 43, 0.3)',
  },
  warning: {
    background: 'rgba(8, 15, 30, 0.75)',
    border: '1px solid rgba(252, 207, 3, 0.3)',
  },
  success: {
    background: 'rgba(8, 15, 30, 0.75)',
    border: '1px solid rgba(129, 192, 70, 0.3)',
  },
};

const VARIANT_HOVER = {
  default: {
    borderColor: 'rgba(28, 47, 87, 0.9)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
  },
  blue: {
    borderColor: 'rgba(59, 119, 188, 0.6)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.4), 0 0 32px rgba(59, 119, 188, 0.15)',
  },
  danger: {
    borderColor: 'rgba(222, 72, 43, 0.6)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.4), 0 0 32px rgba(222, 72, 43, 0.12)',
  },
  warning: {
    borderColor: 'rgba(252, 207, 3, 0.6)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.4), 0 0 32px rgba(252, 207, 3, 0.12)',
  },
  success: {
    borderColor: 'rgba(129, 192, 70, 0.6)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.4), 0 0 32px rgba(129, 192, 70, 0.12)',
  },
};

export function Card({
  children,
  className = '',
  onClick,
  variant = 'default',
  hoverable = false,
  clickable = false,
  style = {},
  padding = '24px',
}) {
  const [hovered, setHovered] = useState(false);
  const base = VARIANT_BASE[variant] || VARIANT_BASE.default;
  const hover = VARIANT_HOVER[variant] || VARIANT_HOVER.default;
  const isInteractive = hoverable || clickable;

  const computedStyle = {
    ...base,
    borderRadius: 16,
    padding,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
    position: 'relative',
    overflow: 'hidden',
    cursor: clickable ? 'pointer' : 'default',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    ...(hovered && isInteractive
      ? {
          transform: clickable ? 'translateY(-4px)' : 'translateY(-3px)',
          borderColor: hover.borderColor,
          boxShadow: hover.boxShadow,
        }
      : {}),
    ...style,
  };

  return (
    <div
      className={className}
      style={computedStyle}
      onClick={onClick}
      onMouseEnter={() => isInteractive && setHovered(true)}
      onMouseLeave={() => isInteractive && setHovered(false)}
    >
      {children}
    </div>
  );
}
