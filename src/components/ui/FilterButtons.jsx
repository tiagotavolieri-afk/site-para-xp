import React, { useState } from 'react';

export function FilterButtons({ options, active, onChange }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      style={{
        display: 'flex',
        gap: 4,
        background: 'rgba(8, 15, 30, 0.6)',
        padding: 4,
        borderRadius: 10,
        border: '1px solid #132040',
      }}
    >
      {options.map(({ key, label }) => {
        const isActive = active === key;
        const isHovered = hovered === key && !isActive;

        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            onMouseEnter={() => setHovered(key)}
            onMouseLeave={() => setHovered(null)}
            style={{
              padding: '5px 14px',
              borderRadius: 7,
              fontSize: 12,
              fontWeight: isActive ? 600 : 400,
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
              transition: 'background 0.18s ease, color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease',
              backgroundColor: isActive ? '#3B77BC' : 'transparent',
              color: isActive ? '#ffffff' : isHovered ? '#7a95b8' : '#4a6080',
              border: isActive
                ? '1px solid transparent'
                : isHovered
                ? '1px solid #3B77BC'
                : '1px solid transparent',
              boxShadow: isActive ? '0 2px 12px rgba(59, 119, 188, 0.35)' : 'none',
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
