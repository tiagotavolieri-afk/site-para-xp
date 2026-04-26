import React, { useState, useEffect } from 'react';
import { Cloud, ExternalLink } from 'lucide-react';
import { SeverityBadge } from '../ui/Badge';
import { getClimateNews } from '../../services/newsService';

function ClimateCard({ item }) {
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
        transition: 'border-color 0.2s ease, background 0.2s ease',
        cursor: item.url ? 'pointer' : 'default',
        textDecoration: 'none', display: 'block',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,200,187,0.3)'; e.currentTarget.style.background = '#2a2a2a'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = '#282828'; }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12, gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>{item.event}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <SeverityBadge severity={item.severity} />
          {item.url && <ExternalLink size={11} color="#555" />}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', marginBottom: 12 }}>
        {[['Região', item.region], ['Horizonte', item.horizon]].map(([label, value]) => (
          <div key={label}>
            <div style={{ fontSize: 10, color: '#555', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {label}
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#C5C5C4' }}>{value}</div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10, fontSize: 11, lineHeight: 1.55 }}>
        <span style={{ color: '#00C8BB', fontWeight: 600 }}>Impacto: </span>
        <span style={{ color: '#888' }}>{item.impact}</span>
      </div>
    </Tag>
  );
}

export function ClimateNews() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getClimateNews().then(setEvents).catch(() => {});
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <Cloud size={15} color="#00C8BB" />
        <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>Eventos Climáticos</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
        {events.map(item => <ClimateCard key={item.id} item={item} />)}
      </div>
    </div>
  );
}

