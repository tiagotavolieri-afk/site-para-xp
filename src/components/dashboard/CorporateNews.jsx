import React, { useState, useEffect } from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';
import { getCorporateNews } from '../../services/newsService';

const IMPACT_CONFIG = {
  positive: { bg: 'rgba(0,200,187,0.1)',  color: '#00C8BB', border: 'rgba(0,200,187,0.25)' },
  negative: { bg: 'rgba(239,68,68,0.1)',   color: '#ef4444', border: 'rgba(239,68,68,0.25)' },
  neutral:  { bg: 'rgba(197,197,196,0.08)', color: '#C5C5C4', border: 'rgba(197,197,196,0.18)' },
  warning:  { bg: 'rgba(251,193,2,0.1)',   color: '#FBC102', border: 'rgba(251,193,2,0.25)' },
};

function NewsCard({ item }) {
  const impact = IMPACT_CONFIG[item.impactType] || IMPACT_CONFIG.neutral;
  const Tag = item.url ? 'a' : 'div';
  const linkProps = item.url
    ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Tag
      {...linkProps}
      style={{
        background: '#282828', border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12, padding: '16px 18px',
        display: 'flex', flexDirection: 'column', gap: 10,
        transition: 'border-color 0.2s ease, background 0.2s ease',
        cursor: item.url ? 'pointer' : 'default',
        textDecoration: 'none',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(251,193,2,0.3)'; e.currentTarget.style.background = '#2a2a2a'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = '#282828'; }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: '#e2e8f0', lineHeight: 1.55, margin: 0, flex: 1 }}>
          {item.title}
        </p>
        {item.url && <ExternalLink size={13} color="#555" style={{ flexShrink: 0, marginTop: 2 }} />}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#C5C5C4' }}>{item.source}</span>
          <span style={{ fontSize: 10, color: '#444' }}>·</span>
          <span style={{ fontSize: 11, color: '#555' }}>{item.date}</span>
        </div>
        <span style={{
          fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
          background: impact.bg, color: impact.color, border: `1px solid ${impact.border}`,
        }}>
          {item.impact}
        </span>
      </div>
    </Tag>
  );
}

export function CorporateNews() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getCorporateNews().then(setNews).catch(() => {});
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <Newspaper size={15} color="#FBC102" />
        <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>Notícias Corporativas</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {news.map(item => <NewsCard key={item.id} item={item} />)}
      </div>
    </div>
  );
}

