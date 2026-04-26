import React, { useState } from 'react';
import { Building2, ChevronDown, ChevronUp } from 'lucide-react';
import { BOA_SAFRA } from '../../data/boasafra';

export function CompanyProfile() {
  const [open, setOpen] = useState(false);
  const { profile } = BOA_SAFRA;

  return (
    <div style={{
      background: '#1F1F1F',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 16,
      overflow: 'hidden',
    }}>
      {/* Accordion header */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 24px',
          background: 'none', border: 'none', cursor: 'pointer',
          transition: 'background 0.15s ease',
          fontFamily: 'Inter, sans-serif',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Building2 size={15} color="#FBC102" />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#F2F2F2' }}>
            Perfil da Empresa
          </span>
        </div>
        <div style={{ color: '#666', display: 'flex', alignItems: 'center' }}>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {/* Accordion body */}
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <div style={{ padding: '0 24px 24px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ paddingTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[profile.summary, profile.model, profile.climate].map((para, i) => (
              <p key={i} style={{ fontSize: 13, color: '#C5C5C4', lineHeight: 1.78, margin: 0 }}>
                {para}
              </p>
            ))}

            {/* Stats grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))',
              gap: 10, marginTop: 6,
            }}>
              {profile.stats.map(({ label, value }) => (
                <div key={label} style={{
                  background: '#282828',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 10, padding: '12px 14px',
                }}>
                  <div style={{ fontSize: 10, color: '#666', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {label}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#F2F2F2' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

