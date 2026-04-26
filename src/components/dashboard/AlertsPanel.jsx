import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

const SEVERITY_CONFIG = {
  high: {
    bg: 'rgba(60,10,10,0.6)', border: 'rgba(239,68,68,0.22)', borderLeft: '#ef4444',
    badgeBg: 'rgba(239,68,68,0.12)', badgeColor: '#ef4444', badgeBorder: 'rgba(239,68,68,0.3)',
    Icon: AlertTriangle, iconColor: '#ef4444',
  },
  medium: {
    bg: 'rgba(50,30,0,0.6)', border: 'rgba(245,158,11,0.22)', borderLeft: '#f59e0b',
    badgeBg: 'rgba(245,158,11,0.12)', badgeColor: '#f59e0b', badgeBorder: 'rgba(245,158,11,0.3)',
    Icon: AlertCircle, iconColor: '#f59e0b',
  },
  info: {
    bg: 'rgba(10,20,50,0.6)', border: 'rgba(96,165,250,0.22)', borderLeft: '#60a5fa',
    badgeBg: 'rgba(96,165,250,0.12)', badgeColor: '#60a5fa', badgeBorder: 'rgba(96,165,250,0.3)',
    Icon: Info, iconColor: '#60a5fa',
  },
};

const ALERTS = [
  {
    id: 'a1',
    severity: 'high',
    horizon: 'Curto Prazo',
    title: 'Irregularidade de Chuvas',
    riskType: 'Hídrico',
    description: 'Irregularidade de chuvas no Centro-Oeste pode comprimir janela de plantio e reduzir demanda por sementes.',
  },
  {
    id: 'a2',
    severity: 'medium',
    horizon: 'Médio Prazo',
    title: 'La Niña — MATOPIBA',
    riskType: 'Climático',
    description: 'La Niña aumenta risco de seca no MATOPIBA — revisão de guidance e pressão em capital de giro.',
  },
  {
    id: 'a3',
    severity: 'info',
    horizon: 'Longo Prazo',
    title: 'Estresse Hídrico Estrutural',
    riskType: 'Estratégico',
    description: 'Estresse hídrico estrutural eleva risco de quebra de safra recorrente nas regiões-core.',
  },
];

function AlertCard({ alert }) {
  const cfg = SEVERITY_CONFIG[alert.severity] || SEVERITY_CONFIG.info;
  const { Icon } = cfg;

  return (
    <div style={{
      background: cfg.bg,
      border: `1px solid ${cfg.border}`,
      borderLeft: `4px solid ${cfg.borderLeft}`,
      borderRadius: 12,
      padding: '16px 18px',
      display: 'flex', gap: 14, alignItems: 'flex-start',
    }}>
      <div style={{ flexShrink: 0, marginTop: 1 }}>
        <Icon size={16} color={cfg.iconColor} strokeWidth={2} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
          <span style={{
            fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
            background: cfg.badgeBg, color: cfg.badgeColor, border: `1px solid ${cfg.badgeBorder}`,
            textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'Inter, sans-serif',
          }}>
            {alert.horizon}
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0' }}>{alert.title}</span>
        </div>
        <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6, margin: '0 0 8px' }}>
          {alert.description}
        </p>
        <span style={{
          fontSize: 10, fontWeight: 600, padding: '1px 7px', borderRadius: 20,
          background: 'rgba(255,255,255,0.05)', color: '#475569',
          border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'Inter, sans-serif',
        }}>
          {alert.riskType}
        </span>
      </div>
    </div>
  );
}

export function AlertsPanel() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <AlertTriangle size={15} color="#f59e0b" />
        <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>Alertas Acionáveis</span>
        <span style={{
          fontSize: 10, fontWeight: 600, padding: '1px 7px', borderRadius: 20,
          background: 'rgba(245,158,11,0.12)', color: '#f59e0b',
          border: '1px solid rgba(245,158,11,0.25)', fontFamily: 'Inter, sans-serif',
        }}>
          {ALERTS.length}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ALERTS.map(alert => <AlertCard key={alert.id} alert={alert} />)}
      </div>
    </div>
  );
}
