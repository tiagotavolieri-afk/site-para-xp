import React from 'react';
import { Cloud } from 'lucide-react';
import { BOA_SAFRA } from '../../data/boasafra';
import { SeverityBadge } from '../ui/Badge';

function ClimateCard({ item }) {
  return (
    <div
      style={{
        background: 'rgba(5,10,24,0.6)',
        border: '1px solid #1a2744',
        borderRadius: 12,
        padding: '16px 18px',
        transition: 'border-color 0.2s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2d4a7a')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1a2744')}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12, gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>{item.event}</span>
        <SeverityBadge severity={item.severity} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', marginBottom: 12 }}>
        {[
          ['Região', item.region],
          ['Horizonte', item.horizon],
        ].map(([label, value]) => (
          <div key={label}>
            <div style={{ fontSize: 10, color: '#475569', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {label}
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#94a3b8' }}>{value}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          borderTop: '1px solid #1a2744',
          paddingTop: 10,
          fontSize: 11,
          color: '#475569',
          lineHeight: 1.5,
        }}
      >
        <span style={{ color: '#2d4a7a' }}>Impacto: </span>
        {item.impact}
      </div>
    </div>
  );
}

export function ClimateNews() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <Cloud size={15} color="#22d3ee" />
        <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>Eventos Climáticos</span>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 12,
        }}
      >
        {BOA_SAFRA.climateEvents.map((item) => (
          <ClimateCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
