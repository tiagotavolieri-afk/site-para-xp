import React from 'react';
import { Newspaper } from 'lucide-react';
import { BOA_SAFRA } from '../../data/boasafra';

const IMPACT_CONFIG = {
  positive: { bg: 'rgba(16,185,129,0.1)',  color: '#10b981', border: 'rgba(16,185,129,0.25)' },
  negative: { bg: 'rgba(239,68,68,0.1)',   color: '#ef4444', border: 'rgba(239,68,68,0.25)'  },
  neutral:  { bg: 'rgba(96,165,250,0.1)',  color: '#60a5fa', border: 'rgba(96,165,250,0.25)' },
};

function NewsCard({ item, delay }) {
  const impact = IMPACT_CONFIG[item.impactType] || IMPACT_CONFIG.neutral;

  return (
    <div
      className={`fade-in fade-in-delay-${delay}`}
      style={{
        background: 'rgba(5,10,24,0.6)',
        border: '1px solid #1a2744',
        borderRadius: 12,
        padding: '16px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        transition: 'border-color 0.2s ease, background 0.2s ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#2d4a7a';
        e.currentTarget.style.background = 'rgba(13,21,38,0.8)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#1a2744';
        e.currentTarget.style.background = 'rgba(5,10,24,0.6)';
      }}
    >
      <p style={{ fontSize: 13, fontWeight: 500, color: '#e2e8f0', lineHeight: 1.5, margin: 0, flex: 1 }}>
        {item.title}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#60a5fa' }}>{item.source}</span>
          <span style={{ fontSize: 10, color: '#2d4a7a' }}>·</span>
          <span style={{ fontSize: 11, color: '#475569' }}>{item.date}</span>
        </div>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: 20,
            background: impact.bg,
            color: impact.color,
            border: `1px solid ${impact.border}`,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {item.impact}
        </span>
      </div>
    </div>
  );
}

export function CorporateNews() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <Newspaper size={15} color="#60a5fa" />
        <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>Notícias Corporativas</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {BOA_SAFRA.corporateNews.map((item, i) => (
          <NewsCard key={item.id} item={item} delay={i + 1} />
        ))}
      </div>
    </div>
  );
}
