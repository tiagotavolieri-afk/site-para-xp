import React from 'react';
import { ChevronRight } from 'lucide-react';
import { SECTORS } from '../../data/sectors';

function SectorCard({ sector, onClick, delay }) {
  const isActive = sector.available;

  return (
    <div
      className={`cr-card fade-in fade-in-delay-${delay} ${isActive ? 'cr-card-interactive cr-card-active-sector' : ''} ${isActive ? 'glow-active' : ''}`}
      onClick={isActive ? onClick : undefined}
      style={{
        padding: '24px',
        cursor: isActive ? 'pointer' : 'not-allowed',
        opacity: isActive ? 1 : 0.38,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        minHeight: 160,
      }}
    >
      {/* Top row: icon + badge */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 30, lineHeight: 1 }}>{sector.icon}</span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            padding: '3px 9px',
            borderRadius: 20,
            background: isActive ? 'rgba(16,185,129,0.12)' : 'rgba(30,45,74,0.6)',
            color: isActive ? '#10b981' : '#475569',
            border: `1px solid ${isActive ? 'rgba(16,185,129,0.3)' : 'rgba(30,45,74,0.8)'}`,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            fontFamily: 'Inter, sans-serif',
            flexShrink: 0,
          }}
        >
          {isActive ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span
                className="pulse-dot"
                style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}
              />
              {sector.badge}
            </span>
          ) : (
            sector.badge
          )}
        </span>
      </div>

      {/* Name + desc */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>
          {sector.label}
        </div>
        <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.5 }}>{sector.desc}</div>
      </div>

      {/* CTA */}
      {isActive && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 12,
            fontWeight: 600,
            color: '#10b981',
            marginTop: 4,
          }}
        >
          {sector.coverageNote && (
            <span style={{ marginRight: 'auto', fontSize: 10, color: '#2d4a7a' }}>
              {sector.coverageNote}
            </span>
          )}
          <span>Acessar</span>
          <ChevronRight size={13} />
        </div>
      )}
    </div>
  );
}

export function SectorScreen({ onSelect }) {
  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>

        {/* Hero */}
        <div className="fade-in" style={{ marginBottom: 40 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 14px',
              borderRadius: 20,
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.2)',
              marginBottom: 16,
            }}
          >
            <div className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Beta · Demo XP Investimentos
            </span>
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: '#f1f5f9',
              letterSpacing: '-0.03em',
              marginBottom: 10,
              lineHeight: 1.2,
            }}
          >
            Selecione um Setor
          </h1>
          <p style={{ fontSize: 14, color: '#64748b', maxWidth: 520, lineHeight: 1.65 }}>
            Análise de risco climático integrada à tese de investimento. Selecione o setor
            para acessar o monitoramento detalhado das empresas.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 16,
            marginBottom: 40,
          }}
        >
          {SECTORS.map((s, i) => (
            <SectorCard
              key={s.id}
              sector={s}
              onClick={() => onSelect(s.id)}
              delay={Math.min(i + 1, 8)}
            />
          ))}
        </div>

        {/* Footer tagline */}
        <div
          className="fade-in fade-in-delay-8"
          style={{
            textAlign: 'center',
            paddingTop: 24,
            borderTop: '1px solid #1a2744',
          }}
        >
          <span style={{ fontSize: 12, color: '#2d4a7a' }}>
            Plataforma desenhada para escala setorial
          </span>
        </div>
      </div>
    </div>
  );
}
