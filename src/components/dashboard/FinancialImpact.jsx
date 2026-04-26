import React from 'react';
import { DollarSign } from 'lucide-react';

const ROWS = [
  {
    id: 'f1',
    factor: 'Seca Centro-Oeste',
    metric: 'Receita líquida',
    impact: '-8% a -15%',
    impactDir: 'negative',
    probability: '75%',
    probValue: 0.75,
    probColor: '#ef4444',
  },
  {
    id: 'f2',
    factor: 'Irregularidade hídrica',
    metric: 'Capital de giro',
    impact: '+12% necessidade',
    impactDir: 'warning',
    probability: '60%',
    probValue: 0.60,
    probColor: '#f59e0b',
  },
  {
    id: 'f3',
    factor: 'Quebra safra clientes',
    metric: 'Inadimplência',
    impact: '+3-5pp',
    impactDir: 'negative',
    probability: '55%',
    probValue: 0.55,
    probColor: '#f59e0b',
  },
  {
    id: 'f4',
    factor: 'Atraso janela plantio',
    metric: 'Volume vendido',
    impact: '-10% a -20%',
    impactDir: 'negative',
    probability: '70%',
    probValue: 0.70,
    probColor: '#f59e0b',
  },
];

const IMPACT_COLORS = {
  negative: '#ef4444',
  warning:  '#f59e0b',
  positive: '#00C8BB',
};

function ProbBar({ value, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${value * 100}%`,
          background: `linear-gradient(90deg, ${color}60, ${color})`,
          borderRadius: 3,
          transition: 'width 0.8s cubic-bezier(0.22,1,0.36,1)',
        }} />
      </div>
      <span style={{ fontSize: 11, color, fontWeight: 700, minWidth: 28, textAlign: 'right' }}>{Math.round(value * 100)}%</span>
    </div>
  );
}

export function FinancialImpact() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <DollarSign size={15} color="#00C8BB" />
        <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>Impacto Financeiro Estimado</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ROWS.map(row => {
          const impactColor = IMPACT_COLORS[row.impactDir] || '#94a3b8';
          return (
            <div
              key={row.id}
              style={{
                background: '#282828',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12,
                padding: '14px 18px',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '14px 20px',
                alignItems: 'center',
              }}
            >
              {/* Left: factor + metric + bar */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0' }}>{row.factor}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 600, color: '#64748b',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 6, padding: '1px 7px',
                  }}>{row.metric}</span>
                </div>
                <ProbBar value={row.probValue} color={row.probColor} />
              </div>

              {/* Right: impact + probability badge */}
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: 15, fontWeight: 800, color: impactColor,
                  fontFamily: 'monospace', letterSpacing: '-0.02em', marginBottom: 5,
                }}>
                  {row.impact}
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 8,
                  background: `${row.probColor}18`, color: row.probColor,
                  border: `1px solid ${row.probColor}35`,
                  whiteSpace: 'nowrap',
                }}>
                  prob. {row.probability}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
