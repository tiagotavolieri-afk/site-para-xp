import React, { useState, useEffect } from 'react';
import { ArrowDown, AlertTriangle, Clock, MapPin, Activity } from 'lucide-react';
import { RatingBadge } from '../ui/RatingBadge';
import { BOA_SAFRA } from '../../data/boasafra';
import { getONIData } from '../../services/oniService';

function MetricCard({ icon, label, value, sub, valueColor }) {
  return (
    <div style={{
      background: '#282828',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 12,
      padding: '14px 16px',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        fontSize: 10, color: '#666', marginBottom: 8,
        textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500,
      }}>
        {icon}
        {label}
      </div>
      <div style={{ fontWeight: 700, fontSize: 14, color: valueColor || '#F2F2F2' }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: '#666', marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

export function RatingPanel() {
  const d = BOA_SAFRA;
  const [oni, setOni] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    function fetchONI() {
      getONIData()
        .then(data => { setOni(data); setLastUpdate(new Date()); })
        .catch(() => {});
    }
    fetchONI();
    const interval = setInterval(fetchONI, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const oniColor = !oni ? '#666'
    : oni.phase === 'La Niña' ? '#ef4444'
    : oni.phase === 'El Niño' ? '#f59e0b'
    : '#00C8BB';

  const regionTags = d.criticalRegions.map((r) => (
    <span key={r} style={{
      fontSize: 11, fontWeight: 600, padding: '2px 7px', borderRadius: 5,
      background: 'rgba(239,68,68,0.12)', color: '#ef4444',
      border: '1px solid rgba(239,68,68,0.25)',
    }}>
      {r}
    </span>
  ));

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1C1800 0%, #1F1F1F 55%, #001C1A 100%)',
      border: '1.5px solid rgba(251,193,2,0.28)',
      borderRadius: 18,
      padding: '22px 26px',
      boxShadow: '0 0 0 1px rgba(251,193,2,0.06), 0 8px 32px rgba(0,0,0,0.45), 0 0 70px rgba(251,193,2,0.06)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient corner glow */}
      <div style={{
        position: 'absolute', top: -50, left: -50, width: 200, height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(251,193,2,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(251,193,2,0.12)', border: '1px solid rgba(251,193,2,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Activity size={17} color="#FBC102" />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#F2F2F2', lineHeight: 1.2 }}>Rating Climático</div>
            <div style={{ fontSize: 11, color: '#555', marginTop: 1 }}>Boa Safra Sementes S.A. · B3:SOJA3</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              backgroundColor: '#00C8BB',
              animation: 'pulse-dot 2s infinite',
            }} />
            <span style={{ fontSize: 10, color: '#00C8BB', fontWeight: 700, letterSpacing: '0.08em' }}>AO VIVO</span>
          </div>
          {lastUpdate && (
            <span style={{ fontSize: 10, color: '#444' }}>
              {lastUpdate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 22, alignItems: 'flex-start', position: 'relative' }}>
        {/* Left column: rating badge + ONI */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, minWidth: 110 }}>
          <div style={{ fontSize: 10, color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>
            Nota atual
          </div>
          <RatingBadge rating={d.rating} size="xl" />
          <div style={{ fontSize: 12, fontWeight: 600, color: '#FBC102', textAlign: 'center' }}>
            {d.ratingLabel}
          </div>
          {/* ONI live widget */}
          <div style={{
            background: `${oniColor}12`,
            border: `1px solid ${oniColor}30`,
            borderRadius: 10, padding: '8px 12px', textAlign: 'center', width: '100%',
            transition: 'border-color 0.4s, background 0.4s',
          }}>
            <div style={{ fontSize: 9, color: '#555', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Índice ONI
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: oniColor, lineHeight: 1 }}>
              {oni ? oni.phase : '—'}
            </div>
            {oni && (
              <div style={{ fontSize: 10, color: `${oniColor}cc`, marginTop: 3 }}>
                {oni.intensity} · {oni.value?.toFixed(1)}
              </div>
            )}
          </div>
        </div>

        {/* Metrics grid */}
        <div style={{
          flex: 1, minWidth: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 10,
        }}>
          <MetricCard
            icon={<ArrowDown size={13} color="#ef4444" />}
            label="Tendência"
            value={d.trend}
            sub={d.trendPeriod}
            valueColor="#ef4444"
          />
          <MetricCard
            icon={<AlertTriangle size={13} color="#FBC102" />}
            label="Principal Risco"
            value={d.mainRisk}
            sub={d.riskRegion}
            valueColor="#FBC102"
          />
          <MetricCard
            icon={<Clock size={13} color="#fb923c" />}
            label="Horizonte Crítico"
            value={d.horizon}
            sub={d.horizonPeriod}
            valueColor="#fb923c"
          />
          <div style={{
            background: '#282828',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 12, padding: '14px 16px',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 10, color: '#666', marginBottom: 8,
              textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500,
            }}>
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

