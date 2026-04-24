import React from 'react';
import { DollarSign } from 'lucide-react';
import { BOA_SAFRA } from '../../data/boasafra';

const IMPACT_COLORS = {
  negative: '#ef4444',
  warning:  '#f59e0b',
  positive: '#10b981',
};

function ProbBar({ value, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div
        style={{
          width: 72,
          height: 4,
          background: 'rgba(26,39,68,0.8)',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${value * 100}%`,
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            borderRadius: 2,
            transition: 'width 0.8s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
      </div>
      <span style={{ fontSize: 11, color, fontWeight: 600 }}>{Math.round(value * 100)}%</span>
    </div>
  );
}

export function FinancialImpact() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <DollarSign size={15} color="#10b981" />
        <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>
          Impacto Financeiro Estimado
        </span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="cr-table" style={{ minWidth: 560 }}>
          <thead>
            <tr>
              <th>Fator Climático</th>
              <th>Métrica Afetada</th>
              <th>Impacto Estimado</th>
              <th>Probabilidade</th>
            </tr>
          </thead>
          <tbody>
            {BOA_SAFRA.financialImpact.map((row) => {
              const impactColor = IMPACT_COLORS[row.impactDir] || '#94a3b8';
              return (
                <tr key={row.id}>
                  <td>
                    <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{row.factor}</span>
                  </td>
                  <td>{row.metric}</td>
                  <td>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        fontSize: 13,
                        color: impactColor,
                      }}
                    >
                      {row.impact}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: '1px 7px',
                          borderRadius: 20,
                          background: `${row.probColor}18`,
                          color: row.probColor,
                          border: `1px solid ${row.probColor}35`,
                          display: 'inline-block',
                          fontFamily: 'Inter, sans-serif',
                          marginBottom: 4,
                        }}
                      >
                        {row.probability}
                      </span>
                      <ProbBar value={row.probValue} color={row.probColor} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
