import React, { useState } from 'react';
import { Building2, ChevronDown, ChevronUp } from 'lucide-react';
import { BOA_SAFRA } from '../../data/boasafra';

export function CompanyProfile() {
  const [open, setOpen] = useState(false);
  const { profile } = BOA_SAFRA;

  return (
    <div
      style={{
        background: '#0d1526',
        border: '1px solid #1a2744',
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      {/* Accordion header */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 24px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          transition: 'background 0.15s ease',
          fontFamily: 'Inter, sans-serif',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Building2 size={15} color="#60a5fa" />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>
            Perfil da Empresa
          </span>
        </div>
        <div style={{ color: '#475569', display: 'flex', alignItems: 'center' }}>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {/* Accordion body */}
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <div
          style={{
            padding: '0 24px 24px',
            borderTop: '1px solid #1a2744',
          }}
        >
          <div style={{ paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[profile.summary, profile.model, profile.climate].map((para, i) => (
              <p key={i} style={{ fontSize: 13, color: '#64748b', lineHeight: 1.75, margin: 0 }}>
                {para}
              </p>
            ))}

            {/* Stats grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: 10,
                marginTop: 8,
              }}
            >
              {profile.stats.map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    background: 'rgba(5,10,24,0.7)',
                    border: '1px solid #1a2744',
                    borderRadius: 10,
                    padding: '12px 14px',
                  }}
                >
                  <div style={{ fontSize: 10, color: '#475569', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {label}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#94a3b8' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
