import React from 'react';
import { Breadcrumb } from '../layout/Breadcrumb';
import { RatingPanel } from '../dashboard/RatingPanel';
import { BrazilMap } from '../dashboard/BrazilMap';
import { AlertsPanel } from '../dashboard/AlertsPanel';
import { CorporateNews } from '../dashboard/CorporateNews';
import { ClimateNews } from '../dashboard/ClimateNews';
import { FinancialImpact } from '../dashboard/FinancialImpact';
import { RatingComposition } from '../dashboard/RatingComposition';
import { CompanyProfile } from '../dashboard/CompanyProfile';
import { BOA_SAFRA } from '../../data/boasafra';

function SectionCard({ children, style = {} }) {
  return (
    <div
      style={{
        background: '#0d1526',
        border: '1px solid #1a2744',
        borderRadius: 16,
        padding: '24px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function DashboardScreen({ onBackCompanies, onBackSectors }) {
  const breadcrumb = [
    { label: 'Home', onClick: onBackSectors },
    { label: 'Agronegócio', onClick: onBackCompanies },
    { label: 'Boa Safra Sementes' },
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', padding: '36px 24px 80px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <Breadcrumb items={breadcrumb} />

        {/* Company Header */}
        <div
          className="cr-card fade-in"
          style={{ padding: '20px 24px', marginBottom: 20 }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'linear-gradient(135deg, #166534 0%, #0d9488 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                fontWeight: 800,
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                flexShrink: 0,
              }}
            >
              {BOA_SAFRA.initials}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <h1
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: '#f1f5f9',
                    letterSpacing: '-0.02em',
                    margin: 0,
                  }}
                >
                  {BOA_SAFRA.name}
                </h1>
                <span
                  style={{
                    fontSize: 11,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 6,
                    background: 'rgba(30,45,74,0.8)',
                    color: '#94a3b8',
                    border: '1px solid #1a2744',
                  }}
                >
                  {BOA_SAFRA.ticker}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    padding: '2px 9px',
                    borderRadius: 20,
                    background: 'rgba(16,185,129,0.08)',
                    color: '#10b981',
                    border: '1px solid rgba(16,185,129,0.2)',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {BOA_SAFRA.sector}
                </span>
              </div>
              <p style={{ fontSize: 12, color: '#475569', margin: 0 }}>
                Maior produtora e distribuidora de sementes de soja do Brasil. Atuação no Centro-Oeste e MATOPIBA.
              </p>
            </div>

            {/* Live badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '6px 14px',
                borderRadius: 20,
                background: 'rgba(16,185,129,0.06)',
                border: '1px solid rgba(16,185,129,0.18)',
                flexShrink: 0,
              }}
            >
              <div
                className="pulse-dot"
                style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981' }}
              />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#10b981', fontFamily: 'Inter, sans-serif' }}>
                Atualizado agora
              </span>
            </div>
          </div>
        </div>

        {/* Rating Panel */}
        <div className="fade-in fade-in-delay-1" style={{ marginBottom: 20 }}>
          <RatingPanel />
        </div>

        {/* Map + Alerts */}
        <div
          className="fade-in fade-in-delay-2"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 20,
            marginBottom: 20,
          }}
        >
          <SectionCard>
            <BrazilMap />
          </SectionCard>
          <SectionCard>
            <AlertsPanel />
          </SectionCard>
        </div>

        {/* Corporate + Climate news */}
        <div
          className="fade-in fade-in-delay-3"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 20,
            marginBottom: 20,
          }}
        >
          <SectionCard>
            <CorporateNews />
          </SectionCard>
          <SectionCard>
            <ClimateNews />
          </SectionCard>
        </div>

        {/* Financial Impact */}
        <div className="fade-in fade-in-delay-4" style={{ marginBottom: 20 }}>
          <SectionCard>
            <FinancialImpact />
          </SectionCard>
        </div>

        {/* Rating Composition */}
        <div className="fade-in fade-in-delay-5" style={{ marginBottom: 20 }}>
          <SectionCard>
            <RatingComposition />
          </SectionCard>
        </div>

        {/* Company Profile (accordion) */}
        <div className="fade-in fade-in-delay-6">
          <CompanyProfile />
        </div>
      </div>
    </div>
  );
}
