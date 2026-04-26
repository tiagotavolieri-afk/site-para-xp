import React from 'react';

/**
 * ClimateRisk SVG Logo icon — bar chart in rounded square.
 * Same design as the favicon, scales clean from 16px to 256px.
 */
export function CRLogo({ size = 28, style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      aria-label="ClimateRisk logo"
    >
      <rect width="32" height="32" rx="7" fill="#1F1F1F" />
      <rect x="6"    y="18" width="5" height="9"  rx="1" fill="#FBC102" opacity="0.5" />
      <rect x="13.5" y="13" width="5" height="14" rx="1" fill="#FBC102" opacity="0.75" />
      <rect x="21"   y="7"  width="5" height="20" rx="1" fill="#FBC102" />
    </svg>
  );
}
