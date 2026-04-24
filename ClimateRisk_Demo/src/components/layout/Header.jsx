import React from 'react';
import { Leaf } from 'lucide-react';

export function Header() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid #1a2744',
        background: 'rgba(5,10,24,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: '0 24px',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 9,
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 18px rgba(16,185,129,0.35)',
          }}
        >
          <Leaf size={16} color="#ffffff" strokeWidth={2.5} />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: '#10b981',
              letterSpacing: '-0.02em',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            ClimateRisk
          </span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 300,
              color: '#475569',
              letterSpacing: '-0.01em',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Intelligence
          </span>
        </div>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ textAlign: 'right', display: 'none' }} className="header-meta">
          <div
            style={{
              fontSize: 10,
              fontWeight: 500,
              color: '#475569',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Monitoramento de Risco Climático
          </div>
          <div style={{ fontSize: 10, color: '#2d4a7a', marginTop: 1 }}>
            para Portfólios de Investimento
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 10px',
            borderRadius: 20,
            background: 'rgba(16,185,129,0.08)',
            border: '1px solid rgba(16,185,129,0.2)',
          }}
        >
          <div
            className="pulse-dot"
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: '#10b981',
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: '#10b981',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            DEMO · XP Investimentos
          </span>
        </div>
      </div>
    </header>
  );
}
