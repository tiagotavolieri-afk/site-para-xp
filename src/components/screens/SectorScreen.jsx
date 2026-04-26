import React from 'react';
import { motion } from 'framer-motion';
import { Wheat, Zap, Droplets, Mountain, Shield, TreePine, Truck, Home } from 'lucide-react';
import { SECTORS } from '../../data/sectors';
import { useNavigationContext } from '../../context/NavigationContext';

const ICONS = {
  agro: Wheat,
  energy: Zap,
  sanitation: Droplets,
  mining: Mountain,
  insurance: Shield,
  paper: TreePine,
  logistics: Truck,
};

export function SectorScreen({ onSelect }) {
  const nav = useNavigationContext();
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Back to home */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
        style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}
      >
        <button
          onClick={nav.goToLanding}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#4d6080', display: 'flex', alignItems: 'center',
            gap: 6, fontSize: 13, fontWeight: 500, padding: 0,
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#8899b4'}
          onMouseLeave={e => e.currentTarget.style.color = '#4d6080'}
        >
          <Home size={14} />
          Início
        </button>
        <span style={{ color: '#333', fontSize: 14 }}>›</span>
        <span style={{ color: '#FBC102', fontSize: 13, fontWeight: 600 }}>Setores</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        style={{ marginBottom: 36 }}
      >
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#eef2f7', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
          Selecione um Setor
        </h1>
        <p style={{ color: '#555', fontSize: 14, margin: 0 }}>
          Análise de risco climático por segmento
        </p>
      </motion.div>

      <div className="grid-sectors">
        {SECTORS.map((sector, i) => {
          const Icon = ICONS[sector.id] || Wheat;
          return (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: sector.available ? 1 : 0.55, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
              whileHover={sector.available ? { y: -3 } : {}}
              onClick={() => sector.available && onSelect(sector.id)}
              style={{
                minHeight: '170px',
                backgroundColor: '#1F1F1F',
                border: `1px solid ${sector.available ? 'rgba(251,193,2,0.25)' : 'rgba(255,255,255,0.05)'}`,
                borderRadius: '14px',
                padding: '24px',
                cursor: sector.available ? 'pointer' : 'not-allowed',
                transition: 'border-color 0.18s, background 0.18s',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              onHoverStart={e => { if (sector.available) e.target.style.borderColor = 'rgba(251,193,2,0.5)'; }}
            >
              <div>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  backgroundColor: sector.available ? 'rgba(251,193,2,0.1)' : 'rgba(255,255,255,0.04)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '16px',
                }}>
                  <Icon size={24} color={sector.available ? '#FBC102' : '#555'} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9', margin: '0 0 6px' }}>
                  {sector.label}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.55, margin: 0 }}>
                  {sector.desc}
                </p>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '12px',
                  backgroundColor: sector.available ? 'rgba(0,200,187,0.12)' : 'rgba(100,116,139,0.1)',
                  color: sector.available ? '#00C8BB' : '#64748b',
                  border: `1px solid ${sector.available ? 'rgba(0,200,187,0.3)' : 'rgba(100,116,139,0.15)'}`,
                }}>
                  {sector.available && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{
                        width: '6px', height: '6px', borderRadius: '50%',
                        backgroundColor: '#00C8BB', display: 'inline-block',
                        animation: 'pulse-dot 2s ease-in-out infinite',
                      }} />
                      {sector.badge}
                    </span>
                  )}
                  {!sector.available && sector.badge}
                </span>
                {sector.companiesCount && (
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    {sector.companiesCount} empresas
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
