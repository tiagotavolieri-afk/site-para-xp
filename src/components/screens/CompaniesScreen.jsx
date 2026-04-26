import React from 'react';
import { motion, useAnimate } from 'framer-motion';
import { Heart, Home } from 'lucide-react';
import { AGRO_COMPANIES } from '../../data/companies';
import { RatingBadge } from '../ui/RatingBadge';
import { useFavoritesContext } from '../../context/FavoritesContext';
import { useNavigationContext } from '../../context/NavigationContext';

function HeartButton({ companyId, available }) {
  const { toggleFavorite, isFavorite } = useFavoritesContext();
  const [scope, animate] = useAnimate();
  const favorited = isFavorite(companyId);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!available) return;
    toggleFavorite(companyId);
    animate(scope.current, { scale: [1, 1.3, 1] }, { duration: 0.3 });
  };

  return (
    <button
      ref={scope}
      onClick={handleClick}
      style={{
        background: 'none', border: 'none',
        cursor: available ? 'pointer' : 'not-allowed',
        padding: '6px', lineHeight: 1,
        color: favorited ? '#ef4444' : '#475569',
        opacity: available ? 1 : 0.25,
      }}
      title={available ? (favorited ? 'Remover da carteira' : 'Adicionar à carteira') : 'Indisponível'}
    >
      <Heart size={17} fill={favorited ? '#ef4444' : 'none'} />
    </button>
  );
}

function CompanyCard({ company, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: company.available ? 1 : 0.5, y: 0 }}
      whileHover={company.available ? { y: -2 } : {}}
      onClick={() => company.available && onSelect(company.id)}
      style={{
      backgroundColor: '#1F1F1F',
      border: `1px solid ${company.available ? 'rgba(251,193,2,0.18)' : 'rgba(255,255,255,0.05)'}`,
        borderRadius: '12px', padding: '18px',
        cursor: company.available ? 'pointer' : 'default',
        transition: 'border-color 0.18s, background 0.18s',
        position: 'relative',
        display: 'flex', flexDirection: 'column', gap: '10px',
      }}
      onHoverStart={() => {}}
    >
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <HeartButton companyId={company.id} available={company.available} />
      </div>

      <div style={{
        width: '44px', height: '44px', borderRadius: '10px',
        backgroundColor: company.accentColor ? `${company.accentColor}22` : 'rgba(251,193,2,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '15px', fontWeight: 800,
        color: company.accentColor || '#FBC102',
      }}>
        {company.initials}
      </div>

      <div>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#f1f5f9', marginBottom: '2px', paddingRight: '24px' }}>
          {company.label}
        </div>
        <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>
          {company.ticker}
        </div>
        <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>
          {company.sector}
        </div>
      </div>

      <div style={{ marginTop: '4px' }}>
        {company.available && company.rating ? (
          <RatingBadge rating={company.rating} size="sm" />
        ) : (
          <span style={{
            fontSize: '10px', fontWeight: 500,
            backgroundColor: 'rgba(100,116,139,0.1)',
            color: '#64748b', borderRadius: '10px', padding: '2px 8px',
            border: '1px solid rgba(100,116,139,0.15)',
          }}>
            Em desenvolvimento
          </span>
        )}
      </div>
    </motion.div>
  );
}

export function CompaniesScreen({ onSelect, onBackSectors }) {
  const nav = useNavigationContext();
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px 80px' }}>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
        style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}
      >
        <button
          onClick={nav.goToLanding}
          title="Página inicial"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
          color: '#555', display: 'flex', alignItems: 'center',
          gap: 5, fontSize: 13, fontWeight: 500, padding: 0,
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#FBC102'}
        onMouseLeave={e => e.currentTarget.style.color = '#555'}
      >
          <Home size={14} />
          Início
        </button>
        <span style={{ color: '#333', fontSize: 14 }}>›</span>
        <button
          onClick={onBackSectors}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#555', fontSize: 13, fontWeight: 500, padding: 0,
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#FBC102'}
          onMouseLeave={e => e.currentTarget.style.color = '#555'}
        >
          Setores
        </button>
        <span style={{ color: '#333', fontSize: 14 }}>›</span>
        <span style={{ color: '#FBC102', fontSize: 13, fontWeight: 600 }}>Agronegócio</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        style={{ marginBottom: '32px' }}
      >
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#eef2f7', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
          Agronegócio
        </h1>
        <p style={{ color: '#555', fontSize: '13px', margin: 0 }}>
          {AGRO_COMPANIES.length} empresas · 1 com análise completa
        </p>
      </motion.div>

      <div className="grid-companies">
        {AGRO_COMPANIES.map((company, i) => (
          <motion.div key={company.id} transition={{ delay: i * 0.06 }}>
            <CompanyCard company={company} onSelect={onSelect} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
