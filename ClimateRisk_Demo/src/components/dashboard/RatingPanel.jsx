import React from 'react';
import { ArrowDown, AlertTriangle, Clock, MapPin } from 'lucide-react';
import { RatingBadge } from '../ui/RatingBadge';
import { BOA_SAFRA } from '../../data/boasafra';

function MetricCard({ icon, label, value, sub, valueColor }) {
  return (
    <div
      style={{
        background: 'rgba(5,10,24,0.7)',
        border: '1px solid #1a2744',
        borderRadius: 12,
        padding: '14px 16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 10,
          color: '#475569',
          marginBottom: 8,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          fontWeight: 500,
        }}
      >
        {icon}
        {label}
      </div>
      <div style={{ fontWeight: 700, fontSize: 14, color: valueColor || '#f1f5f9' }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: '#475569', marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

export function RatingPanel() {
  const d = BOA_SAFRA;

  const regionTags = d.criticalRegions.map((r) => (
    <span
      key={r}
      style={{
        fontSize: 11,
        fontWeight: 600,
        padding: '2px 7px',
        borderRadius: 5,
        background: 'rgba(239,68,68,0.12)',
        color: '#ef4444',
        border: '1px solid rgba(239,68,68,0.25)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {r}
    </span>
  ));

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(18,12,0,0.95) 0%, rgba(13,21,38,0.95) 100%)',
        border: '1px solid rgba(245,158,11,0.25)',
        borderRadius: 16,
        padding: '24px 28px',
        boxShadow: '0 0 40px rgba(245,158,11,0.06)',
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, alignItems: 'flex-start' }}>

        {/* Rating circle */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, minWidth: 100 }}>
          <div
            style={{
              fontSize: 10,
              color: '#475569',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 500,
            }}
          >
            Rating Climático
          </div>
          <RatingBadge rating={d.rating} size="xl" />
          <div style={{ fontSize: 12, fontWeight: 600, color: '#f59e0b', textAlign: 'center' }}>
            {d.ratingLabel}
          </div>
        </div>

        {/* Metrics grid */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 10,
          }}
        >
          <MetricCard
            icon={<ArrowDown size={13} color="#ef4444" />}
            label="Tendência"
            value={d.trend}
            sub={d.trendPeriod}
            valueColor="#ef4444"
          />
          <MetricCard
            icon={<AlertTriangle size={13} color="#f59e0b" />}
            label="Principal Risco"
            value={d.mainRisk}
            sub={d.riskRegion}
            valueColor="#f59e0b"
          />
          <MetricCard
            icon={<Clock size={13} color="#fb923c" />}
            label="Horizonte Crítico"
            value={d.horizon}
            sub={d.horizonPeriod}
            valueColor="#fb923c"
          />
          <div
            style={{
              background: 'rgba(5,10,24,0.7)',
              border: '1px solid #1a2744',
              borderRadius: 12,
              padding: '14px 16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 10,
                color: '#475569',
                marginBottom: 8,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontWeight: 500,
              }}
            >
              <MapPin size={13} color="#ef4444" />
              Regiões Críticas
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>{regionTags}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
