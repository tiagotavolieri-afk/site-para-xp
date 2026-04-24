import React from 'react';

export function FilterButtons({ options, active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 4, background: 'rgba(10,15,30,0.6)', padding: 4, borderRadius: 10, border: '1px solid #1a2744' }}>
      {options.map(({ key, label }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            style={{
              padding: '5px 12px',
              borderRadius: 7,
              fontSize: 12,
              fontWeight: isActive ? 600 : 400,
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.18s ease, color 0.18s ease, box-shadow 0.18s ease',
              backgroundColor: isActive ? '#10b981' : 'transparent',
              color: isActive ? '#ffffff' : '#64748b',
              boxShadow: isActive ? '0 2px 10px rgba(16,185,129,0.35)' : 'none',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
