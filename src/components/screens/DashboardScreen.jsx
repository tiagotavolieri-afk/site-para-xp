import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useFavoritesContext } from '../../context/FavoritesContext';
import { useNavigationContext } from '../../context/NavigationContext';
import { Breadcrumb } from '../layout/Breadcrumb';
import { RatingPanel } from '../dashboard/RatingPanel';
import { BrazilMap } from '../dashboard/BrazilMap';
import { AlertsPanel } from '../dashboard/AlertsPanel';
import { CorporateNews } from '../dashboard/CorporateNews';
import { ClimateNews } from '../dashboard/ClimateNews';
import { FinancialImpact } from '../dashboard/FinancialImpact';
import { RatingComposition } from '../dashboard/RatingComposition';
import { CompanyProfile } from '../dashboard/CompanyProfile';
import { Skeleton } from '../ui/Skeleton';
import { BOA_SAFRA } from '../../data/boasafra';
import { getStockQuote } from '../../services/stockService';
import { getONIData } from '../../services/oniService';

const ONI_COLORS = {
  'La Niña': '#ef4444',
  'El Niño': '#f97316',
  'Neutro':  '#64748b',
};

function SectionCard({ children, style = {} }) {
  return (
    <div style={{ background: '#1F1F1F', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '22px', ...style }}>
      {children}
    </div>
  );
}

function ONICard({ oni }) {
  if (!oni) return null;
  const color = ONI_COLORS[oni.phase] || '#64748b';
  return (
    <div style={{
      backgroundColor: '#1F1F1F',
      border: `1px solid ${color}22`,
      borderLeft: `3px solid ${color}`,
      borderRadius: 12,
      padding: '14px 20px',
      marginBottom: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      flexWrap: 'wrap',
    }}>
      <div>
        <div style={{ fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
          Índice ONI
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color, lineHeight: 1 }}>
          {oni.value > 0 ? '+' : ''}{oni.value.toFixed(1)}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color, marginBottom: 2 }}>
          {oni.phase} · {oni.intensity}
        </div>
        <div style={{ fontSize: 11, color: '#475569' }}>
          {oni.phase === 'La Niña'
            ? 'Aumenta risco de seca no Centro-Oeste e MATOPIBA'
            : oni.phase === 'El Niño'
            ? 'Aumenta risco de chuvas intensas no Sul'
            : 'Condições neutras — variabilidade regional normal'}
        </div>
      </div>
      <div style={{ marginLeft: 'auto', fontSize: 10, color: '#334155' }}>
        Fonte: NOAA CPC
      </div>
    </div>
  );
}

export function DashboardScreen({ onBackCompanies, onBackSectors }) {
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const nav = useNavigationContext();
  const favorited = isFavorite('boasafra');

  const [stock, setStock] = useState(null);
  const [oni, setOni] = useState(null);

  useEffect(() => {
    getStockQuote('SOJA3').then(setStock).catch(() => {});
    getONIData().then(setOni).catch(() => {});
  }, []);

  const breadcrumb = [
    { label: 'Início', onClick: nav.goToLanding },
    { label: 'Agronegócio', onClick: onBackCompanies },
    { label: 'Boa Safra Sementes' },
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', padding: '36px 24px 80px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <Breadcrumb items={breadcrumb} />

        {/* Company Header */}
        <div className="cr-card fade-in" style={{ padding: '18px 22px', marginBottom: 16 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: 'linear-gradient(135deg, #166534 0%, #0d9488 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 800, color: '#fff',
              fontFamily: 'Inter, sans-serif', flexShrink: 0,
            }}>
              {BOA_SAFRA.initials}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <h1 style={{ fontSize: 18, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em', margin: 0 }}>
                  {BOA_SAFRA.name}
                </h1>
                <span style={{
                  fontSize: 11, fontFamily: 'monospace', fontWeight: 700,
                  padding: '2px 8px', borderRadius: 6,
                  background: 'rgba(22,22,26,0.9)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)',
                }}>
                  {BOA_SAFRA.ticker}
                </span>
                <span style={{
                  fontSize: 11, padding: '2px 9px', borderRadius: 20,
                  background: 'rgba(0,200,187,0.08)', color: '#00c8bb',
                  border: '1px solid rgba(0,200,187,0.2)', fontFamily: 'Inter, sans-serif',
                }}>
                  {BOA_SAFRA.sector}
                </span>
                {/* Stock price */}
                {stock ? (
                  <span style={{ fontSize: 13, fontWeight: 600 }}>
                    <span style={{ color: '#94a3b8' }}>R$ {stock.price.toFixed(2)}</span>
                    <span style={{
                      marginLeft: 6,
                      color: stock.changePercent >= 0 ? '#00C8BB' : '#ef4444',
                    }}>
                      {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </span>
                  </span>
                ) : (
                  <Skeleton width={80} height={16} />
                )}
              </div>
              <p style={{ fontSize: 12, color: '#475569', margin: 0 }}>
                Maior produtora e distribuidora de sementes de soja do Brasil. Atuação no Centro-Oeste e MATOPIBA.
              </p>
            </div>

            {/* Favorite + Live badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <button
                onClick={() => toggleFavorite('boasafra')}
                style={{
                  background: favorited ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${favorited ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '50%', width: 36, height: 36,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.2s',
                  color: favorited ? '#ef4444' : '#475569',
                }}
                title={favorited ? 'Remover da carteira' : 'Adicionar à carteira'}
              >
                <Heart size={16} fill={favorited ? '#ef4444' : 'none'} />
              </button>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 7, padding: '6px 14px',
                borderRadius: 20, background: 'rgba(0,200,187,0.06)',
                border: '1px solid rgba(0,200,187,0.18)',
              }}>
                <div className="pulse-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#00C8BB' }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: '#00C8BB', fontFamily: 'Inter, sans-serif' }}>
                  Atualizado agora
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Panel */}
        <div className="fade-in fade-in-delay-1" style={{ marginBottom: 20 }}>
          <RatingPanel />
        </div>

        {/* ONI card */}
        <div className="fade-in fade-in-delay-1">
          <ONICard oni={oni} />
        </div>

        {/* Map + Alerts */}
        <div className="fade-in fade-in-delay-2 grid-2-col">
          <SectionCard><BrazilMap /></SectionCard>
          <SectionCard><AlertsPanel /></SectionCard>
        </div>

        {/* Corporate + Climate news */}
        <div className="fade-in fade-in-delay-3 grid-2-col">
          <SectionCard><CorporateNews /></SectionCard>
          <SectionCard><ClimateNews /></SectionCard>
        </div>

        {/* Financial Impact */}
        <div className="fade-in fade-in-delay-4" style={{ marginBottom: 20 }}>
          <SectionCard><FinancialImpact /></SectionCard>
        </div>

        {/* Rating Composition */}
        <div className="fade-in fade-in-delay-5" style={{ marginBottom: 20 }}>
          <SectionCard><RatingComposition /></SectionCard>
        </div>

        {/* Company Profile */}
        <div className="fade-in fade-in-delay-6">
          <CompanyProfile />
        </div>
      </div>
    </div>
  );
}
