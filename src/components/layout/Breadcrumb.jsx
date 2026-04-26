import React from 'react';
import { ChevronRight } from 'lucide-react';

export function Breadcrumb({ items }) {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 13,
        color: '#475569',
        flexWrap: 'wrap',
        marginBottom: 28,
      }}
    >
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            {idx > 0 && (
              <ChevronRight
                size={13}
                style={{ color: '#333', flexShrink: 0 }}
              />
            )}
            {item.onClick && !isLast ? (
              <button
                onClick={item.onClick}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#475569',
                  fontSize: 13,
                  fontFamily: 'Inter, sans-serif',
                  padding: 0,
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#FBC102')}
                onMouseLeave={(e) => (e.target.style.color = '#475569')}
              >
                {item.label}
              </button>
            ) : (
              <span
                style={{
                  color: isLast ? '#94a3b8' : '#475569',
                  fontWeight: isLast ? 500 : 400,
                }}
              >
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
