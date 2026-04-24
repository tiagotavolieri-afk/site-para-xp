import React from 'react';

export function Card({
  children,
  className = '',
  onClick,
  interactive = false,
  active = false,
  accentColor = null,
  style = {},
  padding = '24px',
}) {
  const baseStyle = {
    background: '#0d1526',
    border: `1px solid ${active && accentColor ? accentColor + '50' : '#1a2744'}`,
    borderRadius: 16,
    padding,
    transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
    position: 'relative',
    overflow: 'hidden',
    ...style,
  };

  const handleMouseEnter = (e) => {
    if (!interactive) return;
    e.currentTarget.style.transform = 'translateY(-4px)';
    e.currentTarget.style.borderColor = accentColor
      ? accentColor + '70'
      : '#2d4a7a';
    e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.5), 0 0 28px ${accentColor ? accentColor + '18' : 'rgba(16,185,129,0.08)'}`;
  };

  const handleMouseLeave = (e) => {
    if (!interactive) return;
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.borderColor = active && accentColor ? accentColor + '50' : '#1a2744';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <div
      className={className}
      style={baseStyle}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
