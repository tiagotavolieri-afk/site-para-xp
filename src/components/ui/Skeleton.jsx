import React from 'react';

const KEYFRAMES = `
@keyframes skeleton-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.7; }
}`;

let injected = false;
function injectStyles() {
  if (injected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.textContent = KEYFRAMES;
  document.head.appendChild(el);
  injected = true;
}

export function Skeleton({ width = '100%', height = 16, style = {}, borderRadius = 6 }) {
  injectStyles();
  return (
    <div style={{
      backgroundColor: 'rgba(255,255,255,0.07)',
      borderRadius,
      width,
      height,
      animation: 'skeleton-pulse 1.4s ease-in-out infinite',
      flexShrink: 0,
      ...style,
    }} />
  );
}

export function SkeletonText({ lines = 3, gap = 8 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} width={i === lines - 1 ? '65%' : '100%'} height={13} />
      ))}
    </div>
  );
}

export function SkeletonCard({ height = 80 }) {
  return (
    <div style={{
      backgroundColor: '#0d1526',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 12, padding: 16,
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <Skeleton height={height} />
    </div>
  );
}
