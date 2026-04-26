export const MAP_SCENARIOS = {
  '7d': {
    MT: 'high', GO: 'high', MS: 'high',
    BA: 'moderate', PI: 'moderate', MA: 'moderate', TO: 'moderate',
    SP: 'low', PR: 'low', RS: 'low', SC: 'low',
  },
  '30d': {
    MT: 'high', GO: 'high', MS: 'high',
    BA: 'moderate', PI: 'moderate', MA: 'moderate', TO: 'moderate',
    SP: 'low', PR: 'low', RS: 'low', SC: 'low',
  },
  '12m': {
    MT: 'high', GO: 'high', MS: 'moderate',
    BA: 'high', PI: 'high', MA: 'moderate', TO: 'high',
    SP: 'moderate', PR: 'low', RS: 'low', SC: 'low',
  },
  '5y': {
    MT: 'high', GO: 'high', MS: 'high',
    BA: 'high', PI: 'high', MA: 'high', TO: 'high',
    SP: 'moderate', PR: 'moderate', RS: 'low', SC: 'low',
  },
};

export const RISK_COLORS = {
  high: '#ef4444',
  moderate: '#f59e0b',
  low: '#10b981',
  none: '#1e2d4a',
};

export const RISK_LABELS = {
  high: 'Alto Risco',
  moderate: 'Risco Moderado',
  low: 'Baixo Risco',
  none: 'Sem Exposição',
};

// Simplified polygon points for Brazil states — viewBox "0 0 580 660"
export const BRAZIL_STATES = [
  // Norte
  { id: 'RR', label: 'RR', labelPos: [183, 52], pts: '155,14 218,14 222,76 158,80' },
  { id: 'AP', label: 'AP', labelPos: [297, 52], pts: '268,18 325,18 328,82 270,85' },
  { id: 'AM', label: 'AM', labelPos: [135, 170], pts: '22,102 158,68 222,76 250,94 254,192 240,255 122,268 68,262 22,242' },
  { id: 'PA', label: 'PA', labelPos: [300, 148], pts: '222,20 268,18 325,18 382,62 400,138 372,190 366,218 316,222 254,206 250,94 222,76' },
  { id: 'AC', label: 'AC', labelPos: [72, 265], pts: '22,248 122,242 128,280 65,285 22,268' },
  { id: 'RO', label: 'RO', labelPos: [183, 288], pts: '122,255 240,252 246,315 186,322 122,308' },
  // Nordeste
  { id: 'TO', label: 'TO', labelPos: [396, 250], pts: '366,188 426,182 430,314 366,318' },
  { id: 'MA', label: 'MA', labelPos: [416, 168], pts: '366,132 426,126 462,142 470,202 426,208 372,202 366,188' },
  { id: 'PI', label: 'PI', labelPos: [492, 192], pts: '462,126 512,128 526,186 528,252 486,258 466,232 460,208 470,202' },
  { id: 'CE', label: 'CE', labelPos: [532, 134], pts: '502,95 558,95 562,162 520,172 498,155' },
  { id: 'RN', label: 'RN', labelPos: [573, 112], pts: '550,80 586,78 588,142 552,152' },
  { id: 'PB', label: 'PB', labelPos: [568, 164], pts: '542,148 588,140 588,178 542,182' },
  { id: 'PE', label: 'PE', labelPos: [530, 232], pts: '468,228 498,222 520,240 588,175 588,212 522,248 470,255' },
  { id: 'AL', label: 'AL', labelPos: [574, 232], pts: '555,242 588,208 588,248 558,258' },
  { id: 'SE', label: 'SE', labelPos: [570, 268], pts: '545,255 588,245 588,280 548,282' },
  { id: 'BA', label: 'BA', labelPos: [476, 345], pts: '375,282 468,265 545,255 548,282 578,412 488,428 392,402 370,360' },
  // Centro-Oeste
  { id: 'MT', label: 'MT', labelPos: [255, 340], pts: '126,282 250,272 375,278 380,398 262,408 128,368' },
  { id: 'GO', label: 'GO', labelPos: [422, 340], pts: '380,275 462,270 468,400 380,405' },
  { id: 'DF', label: 'DF', labelPos: [421, 342], pts: '408,328 432,325 434,350 408,352' },
  { id: 'MS', label: 'MS', labelPos: [316, 448], pts: '248,402 382,408 385,488 248,492' },
  // Sudeste
  { id: 'MG', label: 'MG', labelPos: [484, 462], pts: '388,402 468,398 548,285 578,315 580,418 578,515 452,522 388,518' },
  { id: 'ES', label: 'ES', labelPos: [586, 435], pts: '572,388 596,382 598,472 575,478' },
  { id: 'RJ', label: 'RJ', labelPos: [518, 528], pts: '460,515 575,498 572,542 462,548' },
  { id: 'SP', label: 'SP', labelPos: [355, 515], pts: '248,478 460,470 462,555 248,560' },
  // Sul
  { id: 'PR', label: 'PR', labelPos: [352, 582], pts: '248,558 458,552 455,615 248,618' },
  { id: 'SC', label: 'SC', labelPos: [345, 636], pts: '250,618 440,614 436,656 250,658' },
  { id: 'RS', label: 'RS', labelPos: [318, 688], pts: '222,655 422,650 416,725 222,725' },
];
