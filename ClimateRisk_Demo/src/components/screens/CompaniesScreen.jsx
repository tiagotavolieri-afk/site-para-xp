import React from 'react';
import { ChevronRight } from 'lucide-react';
import { AGRO_COMPANIES } from '../../data/companies';
import { RatingBadge } from '../ui/RatingBadge';
import { Breadcrumb } from '../layout/Breadcrumb';

function CompanyCard({ company, onClick, delay }) {
  const isActive = company.available;

  return (
    <div
      className={`cr-card fade-in fade-in-delay-${delay} ${isActive ? 'cr-card-interactive' : ''}`}
      onClick={isActive ? onClick : undefined}
      style={{
        cursor: isActive ? 'pointer' : 'not-allowed',
        opacity: isActive ? 1 : 0.38,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      {/* Top: initials + rating or dev badge */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: isActive
              ? 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(245,158,11,0.1))'
              : 'rgba(30,45,74,0.4)',
            border: `1px solid ${isActive ? 'rgba(16,185,129,0.25)' : '#1a2744'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 800,
            color: isActive ? '#10b981' : '#475569',
            letterSpacing: '-0.02em',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {company.initials}
        </div>
        {isActive && company.rating ? (
          <RatingBadge rating={company.rating} size="sm" />
        ) : (
          <span
            style={{
              fontSize: 10,
              fontWeight: 500,
              padding: '2px 8px',
              borderRadius: 20,
              background: 'rgba(30,45,74,0.6)',
              color: '#475569',
              border: '1px solid rgba(30,45,74,0.8)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Em desenvolvimento
          </span>
        )}
      </div>

      {/* Company info */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', marginBottom: 3 }}>
          {company.label}
        </div>
        <div
          style={{
            fontSize: 11,
            fontFamily: 'monospace',
            color: '#64748b',
            marginBottom: 3,
          }}
        >
          {company.ticker}
        </div>
        <div style={{ fontSize: 11, color: '#475569' }}>{company.sector}</div>
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
          }}
        >
          Ver análise completa
          <ChevronRight size={13} />
        </div>
      )}
    </div>
  );
}

export function CompaniesScreen({ onSelect, onBackSectors }) {
  const breadcrumb = [
    { label: 'Home', onClick: onBackSectors },
    { label: 'Agronegócio' },
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', padding: '36px 24px 80px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <Breadcrumb items={breadcrumb} />

        <div className="fade-in" style={{ marginBottom: 32 }}>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: '#f1f5f9',
              letterSpacing: '-0.02em',
              marginBottom: 6,
            }}
          >
            Empresas Monitoradas
          </h1>
          <p style={{ fontSize: 13, color: '#475569' }}>
            Agronegócio · {AGRO_COMPANIES.length} empresas mapeadas · 1 com análise completa
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 14,
          }}
        >
          {AGRO_COMPANIES.map((c, i) => (
            <CompanyCard
              key={c.id}
              company={c}
              onClick={() => onSelect(c.id)}
              delay={Math.min(i + 1, 8)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
