import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Heart, TrendingUp, ArrowRight, LayoutGrid } from 'lucide-react';
import { useFavoritesContext } from '../context/FavoritesContext';
import { useNavigationContext } from '../context/NavigationContext';
import { AGRO_COMPANIES } from '../data/companies';
import { RatingBadge } from '../components/ui/RatingBadge';

export function FavoritesScreen({ onGoToDashboard }) {
  const { favorites, toggleFavorite } = useFavoritesContext();
  const nav = useNavigationContext();

  const favoritedCompanies = AGRO_COMPANIES.filter(c => favorites.includes(c.id));

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ marginBottom: 36 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'rgba(251,193,2,0.1)',
            border: '1px solid rgba(251,193,2,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Briefcase size={18} color="#FBC102" />
          </div>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#F2F2F2', margin: 0, letterSpacing: '-0.02em' }}>
              Minha Carteira
            </h1>
            <p style={{ color: '#4d6080', fontSize: 13, margin: 0, marginTop: 2 }}>
              {favoritedCompanies.length > 0
                ? `${favoritedCompanies.length} empresa${favoritedCompanies.length > 1 ? 's' : ''} monitorada${favoritedCompanies.length > 1 ? 's' : ''}`
                : 'Nenhuma empresa adicionada ainda'
              }
            </p>
          </div>
        </div>
      </motion.div>

      {favoritedCompanies.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            textAlign: 'center',
            padding: '72px 24px',
            background: '#1F1F1F',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16,
          }}
        >
          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: 'rgba(251,193,2,0.08)',
            border: '1px solid rgba(251,193,2,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <Briefcase size={28} color="#7a6010" />
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: '#888', margin: '0 0 10px' }}>
            Nenhuma empresa na carteira
          </h3>
          <p style={{ color: '#555', fontSize: 14, margin: '0 0 28px', maxWidth: 360, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
            Explore os setores e adicione empresas à sua carteira para monitorar o risco climático aqui.
          </p>
          <button
            onClick={nav.goToSectors}
            style={{
              background: 'rgba(251,193,2,0.1)',
              border: '1px solid rgba(251,193,2,0.22)',
              borderRadius: 10,
              color: '#FBC102',
              fontSize: 14,
              fontWeight: 600,
              padding: '10px 24px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(251,193,2,0.18)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(251,193,2,0.1)'; }}
          >
            <LayoutGrid size={15} />
            Explorar Setores
          </button>
        </motion.div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {favoritedCompanies.map((company, i) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
              style={{ position: 'relative' }}
            >
              <div
                onClick={() => company.available && onGoToDashboard(company.id)}
                style={{
                  background: '#1F1F1F',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 14,
                  padding: '20px',
                  cursor: company.available ? 'pointer' : 'default',
                  transition: 'all 0.18s',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                }}
                onMouseEnter={e => { if (company.available) { e.currentTarget.style.borderColor = 'rgba(251,193,2,0.28)'; e.currentTarget.style.background = '#282828'; }}}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = '#1F1F1F'; }}
              >
                {/* Remove favorite button */}
                <button
                  onClick={e => { e.stopPropagation(); toggleFavorite(company.id); }}
                  title="Remover dos favoritos"
                  style={{
                    position: 'absolute', top: 12, right: 12,
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    borderRadius: 8,
                    cursor: 'pointer',
                    color: '#ef4444',
                    padding: '5px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s',
                    lineHeight: 1,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
                >
                  <Heart size={14} fill="#ef4444" />
                </button>

                {/* Company info */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, paddingRight: 28 }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                    background: company.accentColor ? `${company.accentColor}18` : 'rgba(251,193,2,0.1)',
                    border: `1px solid ${company.accentColor ? `${company.accentColor}30` : 'rgba(251,193,2,0.2)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 15, fontWeight: 800,
                    color: company.accentColor || '#FBC102',
                  }}>
                    {company.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#eef2f7', marginBottom: 3 }}>
                      {company.label}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 11, color: '#4d6080', fontFamily: 'monospace', fontWeight: 600 }}>
                        {company.ticker}
                      </span>
                      <span style={{ fontSize: 11, color: '#3d5070' }}>·</span>
                      <span style={{ fontSize: 11, color: '#4d6080' }}>{company.sector}</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {company.available && company.rating ? (
                    <RatingBadge rating={company.rating} />
                  ) : (
                    <span style={{
                      fontSize: 11, fontWeight: 500,
                      background: 'rgba(100,116,139,0.1)',
                      color: '#475569', borderRadius: 8, padding: '3px 9px',
                      border: '1px solid rgba(100,116,139,0.15)',
                    }}>
                      Em desenvolvimento
                    </span>
                  )}

                  {company.available && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      fontSize: 12, color: '#FBC102', fontWeight: 500,
                    }}>
                      Ver análise
                      <ArrowRight size={12} />
                    </div>
                  )}
                </div>

                {/* Climate risk indicator */}
                {company.available && (
                  <div style={{
                    background: 'rgba(251,193,2,0.06)',
                    border: '1px solid rgba(251,193,2,0.12)',
                    borderRadius: 10,
                    padding: '10px 14px',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <TrendingUp size={13} color="#FBC102" />
                    <span style={{ fontSize: 12, color: '#888' }}>
                      Análise climática completa disponível
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
