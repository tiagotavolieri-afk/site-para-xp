/**
 * ClimateRisk Intelligence — PDF Technical Documentation Generator
 * Run: node scripts/generateDocs.js
 */

'use strict';
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// ─── Palette ─────────────────────────────────────────────────────────────────
const BG     = '#0D0D0D';
const CARD   = '#1A1A1A';
const CARD2  = '#222222';
const YELLOW = '#FBC102';
const TEAL   = '#00C8BB';
const TEXT1  = '#F0F0F0';
const TEXT2  = '#BEBEBE';
const TEXT3  = '#666666';
const RED    = '#EF4444';
const ORANGE = '#F97316';
const GREEN  = '#81C046';
const BORDER = '#303030';

// ─── Setup ───────────────────────────────────────────────────────────────────
const OUT = path.join(__dirname, '..', 'ClimateRisk_DocumentacaoTecnica.pdf');
const doc = new PDFDocument({
  size: 'A4',
  autoFirstPage: false,
  info: {
    Title:    'ClimateRisk Intelligence — Documentação Técnica',
    Author:   'ClimateRisk Analytics',
    Subject:  'Arquitetura, APIs e Programação',
    Keywords: 'React, API, ClimateRisk, Documentação',
  },
});

const writeStream = fs.createWriteStream(OUT);
doc.pipe(writeStream);

const PW = 595.28;
const PH = 841.89;
const ML = 52;
const MT = 52;
const TW = PW - ML * 2;

let pageNum = 0;

// ─── Page helper ─────────────────────────────────────────────────────────────
function newPage() {
  doc.addPage({ size: 'A4', margins: { top: MT, bottom: 52, left: ML, right: ML } });
  pageNum++;
  doc.rect(0, 0, PW, PH).fill(BG);
  doc.rect(0, PH - 38, PW, 38).fill(CARD);
  doc.moveTo(ML, PH - 38).lineTo(PW - ML, PH - 38).lineWidth(0.4).stroke(BORDER);
  // Disable bottom margin temporarily so the page-number text at PH-23 does NOT
  // trigger an automatic page break (PDFKit breaks when y > pageH - margin.bottom).
  doc.page.margins.bottom = 0;
  doc.fillColor(TEXT3).font('Helvetica').fontSize(8)
     .text(String(pageNum), 0, PH - 23, { align: 'center', width: PW, lineBreak: false });
  doc.page.margins.bottom = 52;
  doc.y = MT;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function checkPage(minSpace) {
  minSpace = minSpace || 80;
  if (doc.y + minSpace > PH - 60) newPage();
}

function hLine(color, w) {
  color = color || BORDER;
  w = w || 0.4;
  var y = doc.y;
  doc.moveTo(ML, y).lineTo(ML + TW, y).lineWidth(w).stroke(color);
  doc.y = y + 12;
}

function sectionBanner(label, color) {
  color = color || YELLOW;
  checkPage(44);
  var y = doc.y;
  doc.rect(0, y, PW, 32).fill(CARD2);
  doc.rect(0, y, 4, 32).fill(color);
  doc.fillColor(color).font('Helvetica-Bold').fontSize(10)
     .text(label.toUpperCase(), ML + 12, y + 11, { width: TW - 12 });
  doc.y = y + 44;
}

function h1(text, color) {
  color = color || YELLOW;
  checkPage(50);
  doc.fillColor(color).font('Helvetica-Bold').fontSize(22)
     .text(text, ML, doc.y, { width: TW });
  doc.y += 6;
}

function h2(text, color) {
  color = color || TEXT1;
  checkPage(44);
  doc.y += 10;
  var y = doc.y;
  doc.fillColor(color).font('Helvetica-Bold').fontSize(14)
     .text(text, ML, y, { width: TW });
  var lineY = y + 18;
  doc.moveTo(ML, lineY).lineTo(ML + 180, lineY).lineWidth(1.5).stroke(YELLOW);
  doc.y = lineY + 10;
}

function h3(text, color) {
  color = color || TEAL;
  checkPage(36);
  doc.y += 6;
  doc.fillColor(color).font('Helvetica-Bold').fontSize(11)
     .text(text, ML, doc.y, { width: TW });
  doc.y += 2;
}

function body(text, indent) {
  indent = indent || 0;
  checkPage(24);
  doc.fillColor(TEXT2).font('Helvetica').fontSize(9.5)
     .text(text, ML + indent, doc.y, { width: TW - indent, lineGap: 3 });
  doc.y += 4;
}

function bullet(text, indent, color) {
  indent = indent || 0;
  color = color || YELLOW;
  checkPage(20);
  var bx = ML + indent;
  var ty = doc.y;
  doc.circle(bx + 3.5, ty + 5.5, 2.2).fill(color);
  doc.fillColor(TEXT2).font('Helvetica').fontSize(9.5)
     .text(text, bx + 13, ty, { width: TW - indent - 13, lineGap: 2 });
  doc.y += 2;
}

function codeBlock(lines, accentColor) {
  accentColor = accentColor || TEAL;
  var totalLines = lines.length;
  checkPage(totalLines * 13 + 28);
  var lineH = 13;
  var padY  = 10;
  var padX  = 14;
  var totalH = totalLines * lineH + padY * 2;
  var bx = ML;
  var startY = doc.y;

  doc.roundedRect(bx, startY, TW, totalH, 5).fill(CARD2);
  doc.rect(bx, startY, 3, totalH).fill(accentColor);

  var ly = startY + padY;
  lines.forEach(function(line) {
    var trimmed = line.trim();
    var color = TEXT2;
    if (trimmed.startsWith('//') || trimmed.startsWith('#')) {
      color = TEXT3;
    } else if (/^(import|export|const|function|async|return|if|else|try|catch|new|class|let|var|default|switch|case)\b/.test(trimmed)) {
      color = ORANGE;
    } else if (trimmed.startsWith('GET ') || trimmed.startsWith('POST ') || trimmed.startsWith('https://')) {
      color = GREEN;
    }
    doc.fillColor(color).font('Courier').fontSize(8)
       .text(line, bx + padX + 2, ly, { width: TW - padX - 6, lineBreak: false });
    ly += lineH;
  });
  doc.y = startY + totalH + 10;
}

function infoBox(title, text, color) {
  color = color || TEAL;
  doc.font('Helvetica').fontSize(9.5);
  var textH = doc.heightOfString(text, { width: TW - 28, lineGap: 3 });
  var totalH = 16 + textH + 28;
  checkPage(totalH + 10);
  var startY = doc.y;
  doc.roundedRect(ML, startY, TW, totalH, 6).fill(CARD);
  doc.roundedRect(ML, startY, TW, totalH, 6).lineWidth(0.8).stroke(color);
  doc.fillColor(color).font('Helvetica-Bold').fontSize(9)
     .text(title, ML + 14, startY + 12, { width: TW - 28 });
  doc.fillColor(TEXT2).font('Helvetica').fontSize(9.5)
     .text(text, ML + 14, startY + 28, { width: TW - 28, lineGap: 3 });
  doc.y = startY + totalH + 10;
}

function tableRow(label, value, isAlt) {
  // Dynamically compute row height so long values never overflow the row box.
  doc.font('Helvetica').fontSize(9);
  var labelH = doc.heightOfString(label, { width: 160 });
  var valueH = doc.heightOfString(value, { width: TW - 185 });
  var rowH = Math.max(22, Math.max(labelH, valueH) + 14);
  checkPage(rowH + 2);
  var y = doc.y;
  if (isAlt) doc.rect(ML, y, TW, rowH).fill(CARD2);
  doc.fillColor(TEXT3).font('Helvetica').fontSize(9).text(label, ML + 10, y + 6, { width: 160 });
  doc.fillColor(TEXT1).font('Helvetica').fontSize(9).text(value, ML + 175, y + 6, { width: TW - 185 });
  doc.y = y + rowH;
}

function kvTable(rows) {
  rows.forEach(function(row, i) { tableRow(row[0], row[1], i % 2 === 1); });
}

function techRow(name, desc, color) {
  color = color || YELLOW;
  // Compute height from description text so it never overflows the box.
  doc.font('Helvetica').fontSize(9);
  var descH = doc.heightOfString(desc, { width: TW - 165, lineGap: 1 });
  var totalH = Math.max(26, descH + 16);
  checkPage(totalH + 6);
  var y = doc.y;
  doc.roundedRect(ML, y, TW, totalH, 4).fill(CARD2);
  // Vertically center the name in the box
  var nameY = y + Math.max(8, (totalH - 11) / 2);
  doc.fillColor(color).font('Helvetica-Bold').fontSize(9)
     .text(name, ML + 10, nameY, { width: 140, lineBreak: false });
  doc.fillColor(TEXT2).font('Helvetica').fontSize(9)
     .text(desc, ML + 155, y + 8, { width: TW - 165, lineGap: 1 });
  doc.y = y + totalH + 6;
}

function sep() {
  doc.y += 8;
  hLine(BORDER, 0.4);
}

// ═══════════════════════════════════════════════════════════════════════════════
// CAPA
// ═══════════════════════════════════════════════════════════════════════════════
doc.addPage({ size: 'A4', margins: { top: 0, bottom: 0, left: 0, right: 0 } });
doc.rect(0, 0, PW, PH).fill(BG);
doc.rect(0, 0, PW, 5).fill(YELLOW);

// Logo bars
var LX = ML, LY = 80;
doc.roundedRect(LX, LY, 58, 58, 10).fill(CARD);
doc.rect(LX + 10, LY + 34, 9, 15).fillOpacity(0.45).fill(YELLOW);
doc.rect(LX + 24, LY + 25, 9, 24).fillOpacity(0.72).fill(YELLOW);
doc.rect(LX + 38, LY + 14, 9, 35).fillOpacity(1).fill(YELLOW);
doc.fillOpacity(1);

doc.fillColor(YELLOW).font('Helvetica-Bold').fontSize(34)
   .text('ClimateRisk', ML, LY + 72, { width: PW - ML * 2 });
doc.fillColor(TEXT1).font('Helvetica').fontSize(34)
   .text('Intelligence', ML, LY + 110, { width: PW - ML * 2 });
doc.fillColor(TEXT3).font('Helvetica').fontSize(13)
   .text('Documentação Técnica de Programação', ML, LY + 156, { width: PW - ML * 2 });

doc.rect(ML, LY + 186, 80, 2).fill(YELLOW);
doc.rect(ML + 84, LY + 186, 36, 2).fill(TEAL);

var MY = LY + 208;
[
  ['Versão',      '1.0 — Protótipo XP Investimentos'],
  ['Data',        'Abril 2026'],
  ['Tecnologia',  'React 18 · Create React App · Node.js v24'],
  ['APIs',        'Open-Meteo · NOAA CPC · BRAPI · GNews'],
  ['Autor',       'ClimateRisk Analytics'],
].forEach(function(row, i) {
  doc.fillColor(TEXT3).font('Helvetica').fontSize(9).text(row[0], ML, MY + i * 22, { width: 120 });
  doc.fillColor(TEXT1).font('Helvetica').fontSize(9).text(row[1], ML + 130, MY + i * 22, { width: PW - ML * 2 - 130 });
});

doc.rect(0, PH - 60, PW, 60).fill(CARD);
doc.rect(0, PH - 60, PW, 1).fill(YELLOW);
doc.fillColor(TEXT3).font('Helvetica').fontSize(8.5)
   .text('Confidencial · Uso Interno · Protótipo ClimateRisk Intelligence', ML, PH - 32, { width: PW - ML * 2 });

// ═══════════════════════════════════════════════════════════════════════════════
// SUMÁRIO
// ═══════════════════════════════════════════════════════════════════════════════
newPage();
h1('Sumário');
hLine(YELLOW, 1.5);
doc.y += 4;

var TOC = [
  [false, '1.',    'Visão Geral da Arquitetura',                    '3'],
  [false, '2.',    'Stack de Tecnologias',                          '3'],
  [false, '3.',    'Estrutura de Arquivos',                         '4'],
  [false, '4.',    'Sistema de Roteamento e Navegação',             '5'],
  [false, '5.',    'Context Providers (Estado Global)',             '6'],
  [false, '6.',    'Custom Hooks',                                  '7'],
  [false, '7.',    'Camada de Serviços — APIs em Tempo Real',       '8'],
  [true,  '  7.1', 'stockService — Cotação SOJA3 via BRAPI',       '8'],
  [true,  '  7.2', 'climateService — Open-Meteo + Risco ONI',      '9'],
  [true,  '  7.3', 'oniService — NOAA CPC (La Niña / El Niño)',    '10'],
  [true,  '  7.4', 'newsService — GNews + Mocks',                  '11'],
  [false, '8.',    'Camada de Dados (data/)',                       '12'],
  [false, '9.',    'Componentes de Tela',                           '13'],
  [true,  '  9.1', 'LandingScreen',                                '13'],
  [true,  '  9.2', 'SectorScreen',                                 '13'],
  [true,  '  9.3', 'CompaniesScreen',                              '14'],
  [true,  '  9.4', 'DashboardScreen',                              '14'],
  [true,  '  9.5', 'FavoritesScreen',                              '15'],
  [false, '10.',   'Componentes de Dashboard',                      '16'],
  [true,  '  10.1','RatingPanel — ONI ao vivo',                    '16'],
  [true,  '  10.2','BrazilMap — Mapa interativo',                  '17'],
  [true,  '  10.3','RatingComposition e FinancialImpact',          '18'],
  [true,  '  10.4','AlertsPanel, CorporateNews, ClimateNews',      '19'],
  [true,  '  10.5','CompanyProfile',                               '20'],
  [false, '11.',   'Componentes de Layout (Header, Breadcrumb)',    '20'],
  [false, '12.',   'Componentes UI Reutilizáveis',                  '21'],
  [false, '13.',   'Sistema de Estilos e Design Tokens',            '22'],
  [false, '14.',   'Fluxo Completo de Dados',                       '23'],
  [false, '15.',   'Variáveis de Ambiente',                         '24'],
  [false, '16.',   'Build e Deploy',                                '24'],
];

TOC.forEach(function(item) {
  var isSub = item[0], num = item[1], label = item[2], pg = item[3];
  var y = doc.y;
  var indent = isSub ? 16 : 0;
  var sz = isSub ? 9 : 10;
  var fg = isSub ? TEXT2 : TEXT1;
  var fontW = isSub ? 'Helvetica' : 'Helvetica-Bold';

  doc.fillColor(isSub ? TEXT3 : YELLOW).font(fontW).fontSize(sz)
     .text(num.trim(), ML + indent, y, { width: 28 });
  doc.fillColor(fg).font(fontW).fontSize(sz)
     .text(label, ML + indent + 32, y, { width: TW - indent - 52 });
  doc.fillColor(TEXT3).font('Helvetica').fontSize(sz)
     .text(pg, ML, y, { width: TW, align: 'right' });

  if (!isSub) {
    doc.moveTo(ML + indent + 32, y + sz + 4)
       .lineTo(ML + TW, y + sz + 4).lineWidth(0.25).stroke(BORDER);
  }
  doc.y = y + sz + (isSub ? 7 : 10);
});

// ═══════════════════════════════════════════════════════════════════════════════
// 1. VISÃO GERAL
// ═══════════════════════════════════════════════════════════════════════════════
newPage();
sectionBanner('1. Visão Geral da Arquitetura');

body('O ClimateRisk Intelligence é uma Single-Page Application (SPA) construída em React 18. Toda a navegação entre telas acontece via troca de estado em memória — não há URLs diferentes nem React Router. O estado global de navegação e de favoritos é gerenciado por Context API.');

doc.y += 6;
infoBox('Paradigma arquitetural',
  'SPA com roteamento por estado (não por URL). Quando o usuário clica em um setor ou empresa, um hook de navegação atualiza um estado "screen" global que faz o React renderizar um componente diferente — sem reload nem mudança de URL no browser.',
  YELLOW);

h2('Diagrama de camadas');
body('De cima a baixo, o app é dividido em 5 camadas:');
doc.y += 6;

var layers = [
  { label: 'Telas (Screens)',     desc: 'LandingScreen, SectorScreen, CompaniesScreen, DashboardScreen, FavoritesScreen', color: YELLOW  },
  { label: 'Componentes UI',      desc: 'Header, Breadcrumb, RatingBadge, Badge, Skeleton, CRLogo, FilterButtons',        color: TEAL    },
  { label: 'Context / Hooks',     desc: 'NavigationContext + useNavigation | FavoritesContext + useFavorites',             color: ORANGE  },
  { label: 'Services (APIs)',     desc: 'stockService, climateService, oniService, newsService — todos com fallback mock', color: GREEN   },
  { label: 'Dados estáticos',     desc: 'boasafra.js, companies.js, sectors.js, climateEvents.js, brazilGeo.js',          color: TEXT3   },
];

layers.forEach(function(layer) {
  checkPage(30);
  var y = doc.y;
  doc.roundedRect(ML, y, TW, 28, 4).fill(CARD2);
  doc.rect(ML, y, 4, 28).fill(layer.color);
  doc.fillColor(layer.color).font('Helvetica-Bold').fontSize(9.5)
     .text(layer.label, ML + 14, y + 9, { width: 150 });
  doc.fillColor(TEXT2).font('Helvetica').fontSize(9)
     .text(layer.desc, ML + 168, y + 9, { width: TW - 178 });
  doc.y = y + 34;
});

// ═══════════════════════════════════════════════════════════════════════════════
// 2. STACK
// ═══════════════════════════════════════════════════════════════════════════════
sectionBanner('2. Stack de Tecnologias');

[
  ['React 18',             'Biblioteca de UI. Hooks (useState, useEffect, useContext, useRef, useCallback) usados extensivamente.'],
  ['Create React App 5',   'Toolchain de build — Webpack + Babel + ESLint pré-configurados. Comando: npm run build.'],
  ['axios',                'Cliente HTTP para todas as chamadas a APIs externas. Usado com timeout configurado em cada service.'],
  ['framer-motion',        'Animações declarativas (initial/animate/transition). Usado em LandingScreen e FavoritesScreen.'],
  ['lucide-react',         'Biblioteca de ícones SVG — mais de 20 ícones (AlertTriangle, BarChart2, Cloud, Heart, Globe, etc).'],
  ['Tailwind CSS',         'Configurado mas pouco usado — estilo é feito majoritariamente com inline styles e globals.css.'],
  ['Node.js v24',          'Runtime para scripts auxiliares (buildBrazilGeo.js, generateDocs.js). Não está no bundle React.'],
  ['pdfkit',               'Gerador de PDF puro Node.js (dependência de dev). Usado apenas para gerar esta documentação.'],
].forEach(function(row) { techRow(row[0], row[1], YELLOW); });

// ═══════════════════════════════════════════════════════════════════════════════
// 3. ESTRUTURA DE ARQUIVOS
// ═══════════════════════════════════════════════════════════════════════════════
newPage();
sectionBanner('3. Estrutura de Arquivos');
body('Organização da pasta src/ e scripts/ com responsabilidade de cada módulo:');
doc.y += 6;

var TREE = [
  [YELLOW,  'src/App.jsx',                      'Componente raiz. Monta os Providers e renderiza a tela ativa via switch.'],
  [YELLOW,  'src/index.js',                     'Entry point do React DOM. Renderiza <App /> no elemento #root.'],
  [TEAL,    'src/styles/globals.css',           'Design tokens CSS, animações, classes utilitárias.'],
  [null,    '',                                 ''],
  [ORANGE,  'src/context/',                     'Context API — estado global compartilhado sem prop drilling.'],
  [TEAL,    '  NavigationContext.jsx',          'Provedor do hook useNavigation para toda a árvore React.'],
  [TEAL,    '  FavoritesContext.jsx',           'Provedor do hook useFavorites (localStorage) para toda a árvore React.'],
  [null,    '',                                 ''],
  [ORANGE,  'src/hooks/',                       'Custom hooks com lógica de negócio reutilizável.'],
  [TEAL,    '  useNavigation.js',              'Máquina de estados de telas — qual tela está ativa e funções de transição.'],
  [TEAL,    '  useFavorites.js',               'Persiste lista de IDs favoritos no localStorage do browser.'],
  [null,    '',                                 ''],
  [ORANGE,  'src/services/',                    'Camada de acesso a dados externos (APIs com fallback para mocks).'],
  [GREEN,   '  stockService.js',               'Cotação de ações via BRAPI.dev'],
  [GREEN,   '  climateService.js',             'Previsão climática via Open-Meteo + algoritmo de risco ONI'],
  [GREEN,   '  oniService.js',                 'Índice ONI via NOAA CPC (arquivo ASCII público)'],
  [GREEN,   '  newsService.js',               'Notícias via GNews API ou mocks locais com links reais'],
  [null,    '',                                 ''],
  [ORANGE,  'src/data/',                        'Dados estáticos e semi-estáticos do protótipo.'],
  [YELLOW,  '  boasafra.js',                   'Objeto completo da Boa Safra: rating, alertas, composição, perfil.'],
  [YELLOW,  '  companies.js',                  'Lista de 8 empresas do setor de Agronegócio.'],
  [YELLOW,  '  sectors.js',                    'Lista de 7 setores econômicos.'],
  [YELLOW,  '  climateEvents.js',              'Cenários de risco por estado + RISK_COLORS + RISK_LABELS.'],
  [YELLOW,  '  brazilGeo.js',                  'Paths SVG dos 27 estados — gerado por buildBrazilGeo.js (~26KB).'],
  [null,    '',                                 ''],
  [ORANGE,  'src/screens/',                     'Telas de nível superior (fora do fluxo principal).'],
  [TEAL,    '  LandingScreen.jsx',             'Homepage de entrada do app.'],
  [TEAL,    '  FavoritesScreen.jsx',           'Tela "Minha Carteira" com empresas favoritas.'],
  [null,    '',                                 ''],
  [ORANGE,  'src/components/screens/',          'Telas do fluxo principal de navegação.'],
  [TEAL,    '  SectorScreen.jsx',             'Grid de setores econômicos.'],
  [TEAL,    '  CompaniesScreen.jsx',          'Grid de empresas do setor selecionado.'],
  [TEAL,    '  DashboardScreen.jsx',          'Dashboard completo de análise climática.'],
  [null,    '',                                 ''],
  [ORANGE,  'src/components/dashboard/',        'Painéis do Dashboard.'],
  [ORANGE,  'src/components/layout/',           'Header (nav global) e Breadcrumb.'],
  [ORANGE,  'src/components/ui/',              'Átomos: RatingBadge, Badge, Skeleton, CRLogo, FilterButtons.'],
  [null,    '',                                 ''],
  [TEAL,    'scripts/buildBrazilGeo.js',       'Baixa GeoJSON do Brasil e converte para SVG paths.'],
  [TEAL,    'scripts/generateDocs.js',         'Gera esta documentação PDF.'],
];

TREE.forEach(function(row) {
  var color = row[0], file = row[1], desc = row[2];
  if (!file) { doc.y += 3; return; }
  checkPage(16);
  var y = doc.y;
  var indent = file.startsWith('  ') ? 18 : 0;
  doc.fillColor(color || TEXT3).font('Courier').fontSize(8)
     .text(file, ML + indent, y, { width: 200 - indent });
  if (desc) {
    doc.fillColor(TEXT3).font('Helvetica').fontSize(8)
       .text(desc, ML + 218, y, { width: TW - 222 });
  }
  doc.y = y + 13;
});

// ═══════════════════════════════════════════════════════════════════════════════
// 4. NAVEGAÇÃO
// ═══════════════════════════════════════════════════════════════════════════════
newPage();
sectionBanner('4. Sistema de Roteamento e Navegação');

body('O app não usa React Router. Toda navegação é controlada pelo hook useNavigation que mantém um enum "screen" em useState. O App.jsx faz switch nesse valor e renderiza o componente correspondente.');

h3('Enum SCREENS — src/hooks/useNavigation.js');
codeBlock([
  'export const SCREENS = {',
  '  LANDING:   "landing",    // Página inicial com hero e módulos',
  '  SECTORS:   "sectors",    // Grid de setores econômicos',
  '  COMPANIES: "companies",  // Grid de empresas do setor',
  '  DASHBOARD: "dashboard",  // Análise climática completa',
  '  FAVORITES: "favorites",  // Minha Carteira',
  '};',
], TEAL);

h3('Hook useNavigation — funções disponíveis');
body('O hook retorna um objeto com estado e todas as funções de navegação:');
doc.y += 4;
[
  ['goToLanding()',           'Vai para LANDING, limpa setor e empresa selecionados'],
  ['goToSectors()',           'Vai para SECTORS, limpa setor e empresa'],
  ['goToCompanies(sectorId)', 'Armazena o sectorId e vai para COMPANIES'],
  ['goToDashboard(companyId)','Armazena o companyId e vai para DASHBOARD'],
  ['goToFavorites()',         'Vai para FAVORITES'],
  ['goBack()',               'Volta hierarquicamente: DASHBOARD -> COMPANIES -> SECTORS -> LANDING'],
].forEach(function(row) {
  checkPage(24);
  var y = doc.y;
  doc.roundedRect(ML, y, TW, 22, 3).fill(CARD2);
  doc.fillColor(ORANGE).font('Courier-Bold').fontSize(8.5)
     .text(row[0], ML + 10, y + 6, { width: 195 });
  doc.fillColor(TEXT2).font('Helvetica').fontSize(9)
     .text(row[1], ML + 210, y + 6, { width: TW - 220 });
  doc.y = y + 28;
});

h3('Como App.jsx usa o contexto de navegação');
codeBlock([
  '// src/App.jsx — função renderScreen()',
  'const nav = useNavigationContext(); // acessa NavigationContext',
  '',
  'function renderScreen() {',
  '  switch (nav.screen) {',
  '    case SCREENS.LANDING:    return <LandingScreen />;',
  '    case SCREENS.COMPANIES:  return <CompaniesScreen />;',
  '    case SCREENS.DASHBOARD:  return <DashboardScreen />;',
  '    case SCREENS.FAVORITES:  return <FavoritesScreen />;',
  '    default:                 return <SectorScreen />;',
  '  }',
  '}',
], YELLOW);

infoBox('Por que sem React Router?',
  'O protótipo é uma SPA sem necessidade de URLs compartilháveis. Usar estado React puro elimina dependência extra e simplifica o bundle. Toda a lógica de "onde estou" fica em ~60 linhas em useNavigation.js. Para produção com links diretos para dashboards, React Router seria a escolha certa.',
  TEAL);

// ═══════════════════════════════════════════════════════════════════════════════
// 5. CONTEXT PROVIDERS
// ═══════════════════════════════════════════════════════════════════════════════
newPage();
sectionBanner('5. Context Providers (Estado Global)');

body('A aplicação usa dois Context Providers que envolvem toda a árvore no App.jsx. Eles expõem estado e funções para qualquer componente sem prop drilling.');

h3('NavigationContext — src/context/NavigationContext.jsx');
body('Envolve toda a aplicação com o estado de navegação (screen, selectedSector, selectedCompany) e todas as funções de transição de tela. Qualquer componente pode navegar sem precisar receber props.');
codeBlock([
  '// Criação do contexto:',
  'const NavigationContext = createContext(null);',
  '',
  '// Provider que envolve o app:',
  'export function NavigationProvider({ children }) {',
  '  const nav = useNavigation(); // instancia o hook',
  '  return (',
  '    <NavigationContext.Provider value={nav}>',
  '      {children}',
  '    </NavigationContext.Provider>',
  '  );',
  '}',
  '',
  '// Uso em qualquer componente filho:',
  'const nav = useNavigationContext();',
  'nav.goToDashboard("boasafra"); // navega sem prop drilling',
], TEAL);

sep();
h3('FavoritesContext — src/context/FavoritesContext.jsx');
body('Mesmo padrão: envolve a aplicação com o estado de favoritos. Persiste automaticamente no localStorage via useEffect interno ao hook useFavorites.');
codeBlock([
  'export function FavoritesProvider({ children }) {',
  '  const favoritesApi = useFavorites(); // lê/escreve localStorage',
  '  return (',
  '    <FavoritesContext.Provider value={favoritesApi}>',
  '      {children}',
  '    </FavoritesContext.Provider>',
  '  );',
  '}',
  '',
  '// Uso em qualquer componente:',
  'const { favorites, toggleFavorite, isFavorite } = useFavoritesContext();',
  'toggleFavorite("boasafra"); // adiciona ou remove dos favoritos',
], YELLOW);

infoBox('Hierarquia dos Providers no App.jsx',
  'NavigationProvider envolve FavoritesProvider que envolve AppContent. Isso garante que ambos os contextos estejam disponíveis em todos os componentes, incluindo o Header (que precisa de ambos: exibe contador de favoritos E executa navegação ao clicar nos botões).',
  ORANGE);

// ═══════════════════════════════════════════════════════════════════════════════
// 6. CUSTOM HOOKS
// ═══════════════════════════════════════════════════════════════════════════════
newPage();
sectionBanner('6. Custom Hooks');

h3('useNavigation — src/hooks/useNavigation.js');
body('Hook que gerencia toda a máquina de estados de navegação. Mantém 3 estados em useState:');
bullet('screen: qual tela está visível (valor do enum SCREENS)');
bullet('selectedSector: ID do setor selecionado — ex: "agro"');
bullet('selectedCompany: ID da empresa selecionada — ex: "boasafra"');
doc.y += 6;
body('A função goBack() implementa a hierarquia de navegação de forma determinística:');
codeBlock([
  '// src/hooks/useNavigation.js',
  'const goBack = () => {',
  '  if (screen === SCREENS.DASHBOARD)   return setScreen(SCREENS.COMPANIES);',
  '  if (screen === SCREENS.COMPANIES)   return setScreen(SCREENS.SECTORS);',
  '  if (screen === SCREENS.SECTORS)     return setScreen(SCREENS.LANDING);',
  '  if (screen === SCREENS.FAVORITES)   return setScreen(SCREENS.SECTORS);',
  '};',
  '',
  '// O estado selectedSector persiste ao voltar para COMPANIES,',
  '// permitindo que a tela saiba qual setor exibir novamente.',
], TEAL);

sep();
h3('useFavorites — src/hooks/useFavorites.js');
body('Hook que sincroniza a lista de IDs favoritos com localStorage. A leitura inicial usa um lazy initializer no useState:');
codeBlock([
  '// Lazy initializer: executa apenas na primeira renderização',
  'const [favorites, setFavorites] = useState(() => {',
  '  try {',
  '    const stored = localStorage.getItem("climaterisk_favorites");',
  '    return stored ? JSON.parse(stored) : [];',
  '  } catch { return []; }',
  '});',
  '',
  '// Sincroniza localStorage sempre que favorites mudar:',
  'useEffect(() => {',
  '  localStorage.setItem("climaterisk_favorites",',
  '    JSON.stringify(favorites));',
  '}, [favorites]);',
  '',
  '// Adiciona ou remove um ID da lista:',
  'const toggleFavorite = (id) =>',
  '  setFavorites(prev =>',
  '    prev.includes(id)',
  '      ? prev.filter(f => f !== id)  // remove',
  '      : [...prev, id]               // adiciona',
  '  );',
], YELLOW);

infoBox('Persistência sem backend',
  'Como não há servidor, o localStorage serve como banco de dados do cliente. Chave: "climaterisk_favorites". Os dados sobrevivem a reloads e fechamento do browser, mas são específicos do dispositivo. Limpar o storage do navegador apaga os favoritos.',
  TEAL);

// ═══════════════════════════════════════════════════════════════════════════════
// 7. SERVIÇOS / APIs
// ═══════════════════════════════════════════════════════════════════════════════
newPage();
sectionBanner('7. Camada de Serviços — APIs em Tempo Real');

body('Todos os services seguem o mesmo padrão defensivo: tentam a API real e, em caso de falha ou ausência de chave, retornam mocks predefinidos. O app nunca quebra, mesmo offline.');

codeBlock([
  '// Padrão universal de todos os services:',
  'export async function getDados() {',
  '  if (!API_KEY) return MOCK_DATA;   // sem chave -> mock imediato',
  '  try {',
  '    const { data } = await axios.get(URL, {',
  '      params: { ...queryParams },',
  '      timeout: 6000,',
  '    });',
  '    const resultado = transformar(data);',
  '    return resultado || MOCK_DATA;',
  '  } catch {',
  '    return MOCK_DATA;',
  '  }',
  '}',
], TEAL);

h2('7.1  stockService — Cotação SOJA3');
body('Busca o preço atual e variação percentual da ação SOJA3 (Boa Safra Sementes) na B3.');
doc.y += 4;
kvTable([
  ['Arquivo',        'src/services/stockService.js'],
  ['API',            'BRAPI — https://brapi.dev/api/quote/{ticker}'],
  ['Autenticação',   'REACT_APP_BRAPI_TOKEN no .env — opcional (nível gratuito sem token)'],
  ['Timeout',        '5.000ms'],
  ['Retorno',        '{ price: number, change: number, changePercent: number }'],
  ['Mock',           '{ price: 9.42, change: -0.18, changePercent: -1.87 }'],
  ['Atualização',    'Uma vez ao montar DashboardScreen — sem polling automático'],
]);
doc.y += 4;
codeBlock([
  'GET https://brapi.dev/api/quote/SOJA3?token=TOKEN',
  '',
  '// Campos usados da resposta JSON:',
  '// data.results[0].regularMarketPrice         -> preco atual em R$',
  '// data.results[0].regularMarketChange        -> variacao em R$',
  '// data.results[0].regularMarketChangePercent -> variacao em %',
], ORANGE);

checkPage(120);
doc.y += 14;
h2('7.2  climateService — Open-Meteo + Risco ONI');
body('Serviço de dados climáticos em tempo real. Cobre 11 estados brasileiros usando Open-Meteo (gratuita, sem autenticação). Também contém computeONIRisk() para horizontes de médio/longo prazo.');
doc.y += 4;
kvTable([
  ['Arquivo',        'src/services/climateService.js'],
  ['API',            'Open-Meteo — https://api.open-meteo.com/v1/forecast'],
  ['Autenticação',   'Nenhuma — totalmente gratuita e pública'],
  ['Timeout',        '8.000ms por estado'],
  ['Parâmetros',     'daily=precipitation_sum,temperature_2m_max | forecast_days=7 ou 16'],
  ['Concorrência',   'Promise.all() — todos os 11 estados consultados em paralelo'],
  ['Estados',        'MT, GO, MS, BA, PI, MA, TO, SP, PR, RS, SC'],
]);

h3('Coordenadas dos estados (STATE_COORDS)');
body('Cada estado é representado pelo centróide geográfico [latitude, longitude]. A Open-Meteo retorna a previsão mais próxima a essas coordenadas:');
codeBlock([
  'const STATE_COORDS = {',
  '  MT: [-12.64, -55.42],  // Mato Grosso — maior produtor de soja',
  '  GO: [-15.83, -49.83],  // Goiás',
  '  MS: [-20.47, -54.62],  // Mato Grosso do Sul',
  '  BA: [-12.97, -41.47],  // Bahia — MATOPIBA',
  '  PI: [ -7.72, -42.73],  // Piaui — MATOPIBA',
  '  MA: [ -5.07, -45.27],  // Maranhao — MATOPIBA',
  '  TO: [-10.17, -48.33],  // Tocantins — MATOPIBA',
  '  SP: [-22.19, -48.79],  // Sao Paulo',
  '  PR: [-24.89, -51.55],  // Parana',
  '  RS: [-29.68, -53.80],  // Rio Grande do Sul',
  '  SC: [-27.45, -51.01],  // Santa Catarina',
  '};',
], TEAL);

h3('Algoritmo getRiskLevel() — classificação climática');
codeBlock([
  'export function getRiskLevel(precipitation, temperature) {',
  '  const valid = precipitation.filter(v => v != null);',
  '  const avgPrecip = valid.length',
  '    ? valid.reduce((a, b) => a + b, 0) / valid.length',
  '    : 5; // fallback: 5mm/dia',
  '',
  '  const maxTemp = Math.max(',
  '    ...temperature.filter(t => t != null), 25',
  '  );',
  '',
  '  // Regras de classificacao:',
  '  if (avgPrecip < 3 && maxTemp > 33) return "alto";',
  '  if (avgPrecip < 8 || maxTemp > 30) return "medio";',
  '  return "baixo";',
  '}',
], RED);

h3('computeONIRisk() — risco para 12 meses e 5 anos');
body('Para os filtros de longo prazo, usa o índice ONI porque Open-Meteo só prevê 16 dias. A função mapeia La Niña/El Niño para risco esperado por estado, baseado em padrões históricos:');
codeBlock([
  '// La Nina -> seca no Centro-Oeste e Nordeste (MATOPIBA)',
  '// El Nino -> chuvas intensas no Sul do Brasil',
  '',
  'if (phase === "La Nina") {',
  '  ["MT","GO","MS","DF"] -> "alto" (ou "medio" se fraco)',
  '  ["BA","PI","MA","TO","CE",...] -> risco elevado',
  '} else if (phase === "El Nino") {',
  '  ["PR","RS","SC"] -> "medio" a "alto"',
  '  ["MT","GO","MS"] -> "medio"',
  '}',
], ORANGE);

checkPage(120);
doc.y += 14;
h2('7.3  oniService — Índice ONI (NOAA CPC)');
body('O Oceanic Niño Index (ONI) é o índice oficial americano para classificar episódios de El Niño e La Niña. O serviço lê um arquivo de texto ASCII diretamente do servidor da NOAA — dados públicos do governo americano.');
doc.y += 4;
kvTable([
  ['Arquivo',      'src/services/oniService.js'],
  ['URL',          'https://www.cpc.ncep.noaa.gov/data/indices/oni.ascii.txt'],
  ['Autenticação', 'Nenhuma — dado público do NOAA (National Oceanic and Atmospheric Administration)'],
  ['Formato',      'Texto ASCII: colunas ANO, SEAS, ANOM. Ex: "2025  DJF  -0.8"'],
  ['Timeout',      '5.000ms'],
  ['La Nina',      'ONI menor ou igual a -0.5 — resfriamento do Pacifico Equatorial'],
  ['El Nino',      'ONI maior ou igual a +0.5 — aquecimento do Pacifico Equatorial'],
  ['Intensidade',  'ONI acima de 1.5 = forte | acima de 1.0 = moderado | abaixo de 1.0 = fraco'],
  ['Mock',         '{ value: -0.8, phase: "La Nina", intensity: "moderado" }'],
  ['Atualização',  'RatingPanel: a cada 5 min | BrazilMap 12m/5y: a cada 10 min'],
]);

h3('Parsing do arquivo ASCII da NOAA');
codeBlock([
  '// Formato do arquivo (primeiras linhas sao header):',
  '// YR   MON  TOTAL',
  '// 2024  DJF  -0.5',
  '// 2024  JFM  -0.6',
  '// ... (ultima linha = periodo mais recente)',
  '',
  'function parseONI(text) {',
  '  const lines = text.trim().split("\\n")',
  '    .filter(l => l.trim()',
  '      && !l.startsWith("YR")',
  '      && !l.startsWith("SEAS"));',
  '',
  '  const parts = lines[lines.length - 1].trim().split(/\\s+/);',
  '  const value = parseFloat(parts[2]); // terceira coluna = anomalia',
  '',
  '  if (value <= -0.5) phase = "La Nina";',
  '  if (value >= +0.5) phase = "El Nino";',
  '  return { value, phase, intensity };',
  '}',
], TEAL);

infoBox('Impacto do ONI no mapa do Brasil',
  'Quando o índice ONI indica La Niña (como o valor atual de -0.8), o mapa dos filtros "12 meses" e "5 anos" pinta o Centro-Oeste e MATOPIBA em vermelho/amarelo. Isso reflete padrões históricos: La Niña correlaciona com estiagens severas nessas regiões — afetando diretamente a safra de soja, principal produto da Boa Safra.',
  YELLOW);

h2('7.4  newsService — GNews + Mocks');
body('Fornece notícias corporativas (Boa Safra / SOJA3) e eventos climáticos. Sem a chave GNews, retorna mocks com URLs de busca válidas em fontes reais.');
doc.y += 4;
kvTable([
  ['Arquivo',          'src/services/newsService.js'],
  ['API',              'GNews — https://gnews.io/api/v4/search'],
  ['Chave',            'REACT_APP_GNEWS_KEY no .env (100 req/dia grátis)'],
  ['Query corporativa', '"Boa Safra" OR "SOJA3" | lang=pt | max=3'],
  ['Query climática',  'clima agronegócio seca safra Brasil | lang=pt | max=3'],
  ['Timeout',          '6.000ms'],
  ['Mock corporativo', 'Links para Valor Econômico, Reuters, InfoMoney'],
  ['Mock climático',   'Links para INMET, CPTEC/INPE, Agência Nacional de Águas'],
]);
codeBlock([
  '// Hierarquia de fallback:',
  'if (!GNEWS_KEY)           -> retorna MOCK_CORPORATE / MOCK_CLIMATE',
  'if (erro de rede)         -> retorna MOCK_CORPORATE / MOCK_CLIMATE',
  'if (0 artigos retornados) -> retorna MOCK_CORPORATE / MOCK_CLIMATE',
  'senao                     -> retorna artigos reais via mapArticle()',
], ORANGE);

// ═══════════════════════════════════════════════════════════════════════════════
// 8. CAMADA DE DADOS
// ═══════════════════════════════════════════════════════════════════════════════
newPage();
sectionBanner('8. Camada de Dados (data/)');

body('Os arquivos em src/data/ contêm os dados estáticos do protótipo. Em produção real, viriam de uma API REST ou GraphQL.');

h3('boasafra.js — Objeto principal da empresa');
body('Exporta o objeto BOA_SAFRA com aproximadamente 100 campos em sub-objetos:');
doc.y += 4;
kvTable([
  ['rating / ratingLabel',    '"C" / "Moderado-Alto" — nota climática geral da empresa'],
  ['trend / trendDir',        '"Piorando" / "down" — direção da tendência de risco'],
  ['mainRisk / riskRegion',   '"Irreg. Hídrica" / "Centro-Oeste"'],
  ['criticalRegions: []',     'Array de siglas críticas: ["MT","GO","MS","BA","PI"]'],
  ['alerts: []',              '3 alertas com severity (high/medium/info), horizon e description'],
  ['ratingComposition: []',   '4 dimensões de rating com peso, avaliação e direção de contribuição'],
  ['financialImpact: []',     '4 linhas de impacto financeiro com probabilidades e valores'],
  ['profile: {}',             'Textos descritivos da empresa + array stats[] com indicadores'],
]);

sep();
h3('brazilGeo.js — Mapa SVG dos 27 estados');
body('Arquivo auto-gerado pelo script scripts/buildBrazilGeo.js. Contém paths SVG simplificados de todos os estados brasileiros. Não editar manualmente.');
codeBlock([
  '// Estrutura de cada estado no array BRAZIL_GEO_STATES:',
  '{',
  '  sigla:  "MT",',
  '  name:   "Mato Grosso",',
  '  paths:  ["M123,45 L234,67 ... Z"],',
  '  labelX: 180,  // posicao X do rotulo no mapa',
  '  labelY: 340,  // posicao Y do rotulo no mapa',
  '}',
  '',
  '// BRAZIL_VIEWBOX = "0 0 600 600"',
  '// Fonte: github.com/codeforamerica/click_that_hood',
  '// Simplificacao: algoritmo Douglas-Peucker (epsilon = 0.06 graus)',
], TEAL);

// ═══════════════════════════════════════════════════════════════════════════════
// 9. TELAS
// ═══════════════════════════════════════════════════════════════════════════════
newPage();
sectionBanner('9. Componentes de Tela');

h3('9.1  LandingScreen — src/screens/LandingScreen.jsx');
body('Homepage de entrada. Usa framer-motion para animações de entrada. Seções verticais:');
bullet('Hero: título, badge "Análise Climática · Empresas B3", 3 módulos (Empresas B3, Minha Carteira, Em Breve)');
bullet('Stats Strip: 3 números em destaque (empresas cobertas, setores, estados monitorados)');
bullet('O Problema: 3 cards explicativos com ícones de problema climático-financeiro');
bullet('Como Funciona: 5 steps com conectores visuais');
bullet('Setores: grid de cards com badge de disponibilidade');
bullet('CTA final: botão "Começar Análise" → goToSectors()');

sep();
h3('9.2  SectorScreen — src/components/screens/SectorScreen.jsx');
body('Grid de 7 setores econômicos. Lê SECTORS de src/data/sectors.js. Apenas "Agronegócio" tem available: true — os outros exibem badge "Expansão Futura" e ficam desabilitados. Callback onSelect(sectorId) → goToCompanies("agro").');

sep();
h3('9.3  CompaniesScreen — src/components/screens/CompaniesScreen.jsx');
body('Grid de empresas do setor selecionado. Lê AGRO_COMPANIES de src/data/companies.js (8 empresas). Apenas Boa Safra (available: true) tem análise completa. Cada card mostra:');
bullet('Logo com iniciais coloridas + ticker em monospace');
bullet('RatingBadge com a nota climática');
bullet('Indicador visual de disponibilidade');
bullet('Botão de favoritar integrado ao FavoritesContext');

sep();
h3('9.4  DashboardScreen — src/components/screens/DashboardScreen.jsx');
body('Componente mais complexo do app. Ao montar (useEffect), chama getStockQuote e getONIData em paralelo. Exibe:');
bullet('Cabeçalho da empresa com preço real-time (Skeleton enquanto carrega)');
bullet('ONI Card: fase atual (La Niña/El Niño/Neutro) com impacto explicado');
bullet('Grid de todos os painéis do dashboard');
doc.y += 4;
codeBlock([
  '// Layout do dashboard (ordem de renderizacao):',
  '1. RatingPanel      — topo, fundo gradiente amarelo+teal, AO VIVO',
  '2. BrazilMap        — esquerda (coluna larga)',
  '3. AlertsPanel      — direita (coluna estreita)',
  '4. RatingComposition — esquerda',
  '5. FinancialImpact  — direita',
  '6. CorporateNews    — esquerda',
  '7. ClimateNews      — direita',
  '8. CompanyProfile   — largura total (accordion)',
], YELLOW);

sep();
h3('9.5  FavoritesScreen — src/screens/FavoritesScreen.jsx');
body('Tela "Minha Carteira". Cruza o array favorites[] do contexto com AGRO_COMPANIES para listar as favoritas. Se vazia, exibe empty state com CTA para explorar setores. Usa framer-motion para animação de entrada dos cards.');

// ═══════════════════════════════════════════════════════════════════════════════
// 10. COMPONENTES DE DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════
newPage();
sectionBanner('10. Componentes de Dashboard');

h3('10.1  RatingPanel — dashboard/RatingPanel.jsx');
body('Painel de destaque no topo do dashboard. Estrutura:');
bullet('Header: ícone Activity, nome da empresa, badge "AO VIVO" com timestamp da última atualização');
bullet('Coluna esquerda: RatingBadge xl (nota "C" com glow amarelo) + widget ONI ao vivo');
bullet('Coluna direita: 4 MetricCards (Tendência, Principal Risco, Horizonte Crítico, Regiões Críticas)');
doc.y += 4;
body('Auto-refresh do ONI a cada 5 minutos com cleanup no return do useEffect:');
codeBlock([
  '// Auto-refresh no RatingPanel:',
  'useEffect(() => {',
  '  let cancelled = false;',
  '  function fetchONI() {',
  '    getONIData().then(data => {',
  '      if (!cancelled) {',
  '        setOni(data);',
  '        setLastUpdate(new Date());',
  '      }',
  '    }).catch(() => {});',
  '  }',
  '  fetchONI();  // executa imediatamente ao montar',
  '  const iv = setInterval(fetchONI, 5 * 60 * 1000); // 5 min',
  '  return () => { cancelled = true; clearInterval(iv); };',
  '  // "cancelled" evita setState em componente desmontado',
  '}, []);',
], TEAL);

sep();
h3('10.2  BrazilMap — dashboard/BrazilMap.jsx');
body('Mapa interativo do Brasil em SVG puro — sem Mapbox ou Google Maps. Risco por estado com 4 filtros:');
doc.y += 4;
kvTable([
  ['7d / 30d',  'Dados reais via Open-Meteo. Classifica por precipitação e temperatura. Refresh a cada 5 min.'],
  ['12m / 5y',  'Dados ONI via NOAA CPC. computeONIRisk() mapeia fase para risco por estado. Refresh a cada 10 min.'],
  ['Cache',     'apiRisk[filter] armazena resultado. Evita refetch ao alternar e voltar para o mesmo filtro.'],
  ['Hover',     'onMouseEnter/Leave exibe tooltip com nome do estado + nível de risco.'],
]);
doc.y += 4;
codeBlock([
  '// Cores por nivel de risco:',
  'alto:  "#DE482B"  // vermelho',
  'medio: "#FCCF03"  // amarelo',
  'baixo: "#81C046"  // verde',
  'null:  "#2a2a2a"  // cinza (sem dados)',
  '',
  '// Cache de resultados por filtro:',
  'const [apiRisk, setApiRisk] = useState({});',
  'setApiRisk(prev => ({ ...prev, [filter]: data }));',
  'const riskData = apiRisk[filter] || {};',
], YELLOW);

sep();
h3('10.3  RatingComposition — dashboard/RatingComposition.jsx');
body('Grid 2x2 das 4 dimensões que compõem o rating "C". Cada card exibe nome da dimensão, badge de contribuição (seta vermelha "eleva" ou teal "reduz"), avaliação e barra de peso:');
bullet('Exposição Geográfica — peso 35% — seta vermelha (eleva)');
bullet('Dependência Hídrica — peso 30% — seta vermelha (eleva)');
bullet('Diversificação de Risco — peso 20% — seta teal (reduz)');
bullet('Perfil de Crédito de Clientes — peso 15% — seta vermelha (eleva)');

sep();
h3('10.4  FinancialImpact — dashboard/FinancialImpact.jsx');
body('Lista vertical de 4 cards de impacto financeiro. Layout "1fr auto" em cada card:');
bullet('Esquerda: fator causador + badge da métrica afetada + barra de probabilidade (flex: 1)');
bullet('Direita: impacto em % + badge de probabilidade colorido por severidade');
bullet('Fator 1: Seca Centro-Oeste → Receita: -8% a -15% | Prob: 75%');
bullet('Fator 2: Irregularidade hídrica → Capital de giro: +12% | Prob: 60%');
bullet('Fator 3: Quebra safra clientes → Inadimplência: +3-5pp | Prob: 55%');
bullet('Fator 4: Atraso janela plantio → Volume vendido: -10% a -20% | Prob: 70%');

checkPage(80);
h3('10.5  AlertsPanel — dashboard/AlertsPanel.jsx');
body('3 alertas em lista vertical. Cada card tem borda esquerda colorida por severidade e ícone lucide-react:');
bullet('high (alto): borda + ícone vermelho — AlertTriangle — curto prazo');
bullet('medium (médio): borda + ícone amarelo — AlertCircle — médio prazo');
bullet('info: borda + ícone azul — Info — longo prazo');

sep();
h3('10.6  CorporateNews e ClimateNews');
body('Ambos chamam o service no useEffect ao montar. Cards são renderizados como links clicáveis quando têm URL:');
codeBlock([
  '// Tag dinamica — link se tiver URL, div caso contrario:',
  'const Tag = item.url ? "a" : "div";',
  'const linkProps = item.url',
  '  ? { href: item.url, target: "_blank", rel: "noopener noreferrer" }',
  '  : {};',
  '',
  '<Tag {...linkProps}>',
  '  <ExternalLink size={12} />',
  '  {item.title}',
  '</Tag>',
], TEAL);

sep();
h3('10.7  CompanyProfile — dashboard/CompanyProfile.jsx');
body('Accordion expansível via useState local. Quando aberto, exibe:');
bullet('3 parágrafos de texto (summary, model, climate) de BOA_SAFRA.profile');
bullet('Grid de stats cards (Fundação, Funcionários, Presença, Receita, Market Cap, Produtos)');

// ═══════════════════════════════════════════════════════════════════════════════
// 11. LAYOUT
// ═══════════════════════════════════════════════════════════════════════════════
sectionBanner('11. Componentes de Layout');

h3('Header — components/layout/Header.jsx');
body('Barra de navegação sticky (position: sticky, top: 0) com efeito de vidro (backdrop-filter blur). Estrutura em 3 blocos flexbox:');
codeBlock([
  '// Estrutura do Header — 3 blocos flex:',
  '<header style={{ display:"flex", justifyContent:"space-between" }}>',
  '',
  '  <div style={{ flex: 1 }}>',
  '    // Logo CRLogo + botao "Voltar" (se canGoBack)',
  '    // canGoBack = true fora de SECTORS/FAVORITES/LANDING',
  '  </div>',
  '',
  '  <nav style={{ flexShrink: 0 }}>',
  '    // Centro: DropdownHome + botao Setores + botao Carteira',
  '    // Carteira exibe badge com numero de favoritos',
  '  </nav>',
  '',
  '  <div style={{ flex: 1, justifyContent:"flex-end" }}>',
  '    // Badge "Dados ao Vivo" com dot pulsante',
  '  </div>',
  '',
  '</header>',
], YELLOW);

body('Dropdown do botão Home: fecha ao clicar fora (useRef + addEventListener) ou ao pressionar Escape. Os listeners são removidos no cleanup do useEffect.');

sep();
h3('Breadcrumb — components/layout/Breadcrumb.jsx');
body('Trilha "Início > Agronegócio > Boa Safra Sementes". Cada item (exceto o último) é um botão clicável com função onClick. O último item é texto puro representando a tela atual. Separador: › em TEXT3.');

// ═══════════════════════════════════════════════════════════════════════════════
// 12. COMPONENTES UI
// ═══════════════════════════════════════════════════════════════════════════════
checkPage(260);
sectionBanner('12. Componentes UI Reutilizáveis');

[
  ['RatingBadge',   TEAL,   'Círculo com nota climática (A/B/C/D/E). Cada nota tem cor, glow e bg próprios. Props: rating, size (sm/md/lg/xl).'],
  ['RatingScale',   TEAL,   'Linha com todos os 5 ratings lado a lado. O rating ativo tem bg preenchido; os outros são ghost.'],
  ['Badge',         YELLOW, 'Pill genérico com variantes de cor: blue/red/green/yellow/muted. Sizes: sm/md. Suporta dot pulsante.'],
  ['FilterButtons', YELLOW, 'Grupo de botões de filtro (7d/30d/12m/5y). O ativo tem bg sólido; os outros são ghost com borda sutil.'],
  ['Skeleton',      ORANGE, 'Placeholder animado para loading. Props: width, height, borderRadius. Fundo #282828 com shimmer animation.'],
  ['CRLogo',        YELLOW, 'Logo SVG do ClimateRisk — 3 barras em rounded rect escuro. Prop size em pixels. Usado no Header.'],
  ['Card',          TEXT2,  'Wrapper com bg var(--cr-card), border e border-radius do design system.'],
].forEach(function(row) {
  checkPage(30);
  var y = doc.y;
  doc.roundedRect(ML, y, TW, 32, 4).fill(CARD2);
  doc.rect(ML, y, 3, 32).fill(row[1]);
  doc.fillColor(row[1]).font('Courier-Bold').fontSize(9.5)
     .text(row[0], ML + 12, y + 10, { width: 130 });
  doc.fillColor(TEXT2).font('Helvetica').fontSize(9)
     .text(row[2], ML + 146, y + 10, { width: TW - 156 });
  doc.y = y + 38;
});

h3('RatingBadge — configuração por nota');
codeBlock([
  'const RATING_CONFIG = {',
  '  A: { color: "#81C046", label: "Minimo"   }, // verde',
  '  B: { color: "#4db89e", label: "Baixo"    }, // verde-azulado',
  '  C: { color: "#FCCF03", label: "Moderado" }, // amarelo <- Boa Safra',
  '  D: { color: "#f5823a", label: "Alto"     }, // laranja',
  '  E: { color: "#DE482B", label: "Critico"  }, // vermelho',
  '};',
], YELLOW);

// ═══════════════════════════════════════════════════════════════════════════════
// 13. ESTILOS
// ═══════════════════════════════════════════════════════════════════════════════
checkPage(260);
sectionBanner('13. Sistema de Estilos e Design Tokens');

body('O app usa CSS Custom Properties como design tokens em globals.css, combinados com inline styles nos componentes React.');

h3('Tokens CSS em :root — globals.css');
codeBlock([
  ':root {',
  '  --cr-bg:        #020202;   /* fundo do body */',
  '  --cr-surface:   #141414;   /* superficie intermediaria */',
  '  --cr-card:      #1F1F1F;   /* cards principais */',
  '  --cr-card-hi:   #282828;   /* cards aninhados / hover */',
  '  --cr-border:    rgba(255,255,255, 0.07);',
  '  --cr-border-hi: rgba(255,255,255, 0.13);',
  '  --cr-yellow:    #FBC102;   /* destaque principal */',
  '  --cr-teal:      #00C8BB;   /* destaque secundario */',
  '  --cr-text-1:    #F2F2F2;   /* texto primario */',
  '  --cr-text-2:    #C5C5C4;   /* texto secundario */',
  '  --cr-text-3:    #666666;   /* texto terciario / labels */',
  '}',
], YELLOW);

h3('Gradiente de profundidade no body');
codeBlock([
  'body {',
  '  background-color: #020202;',
  '  background-image:',
  '    radial-gradient(ellipse 65% 45% at 8% 12%,',
  '      rgba(251,193,2, 0.045) 0%, transparent 65%),',
  '    radial-gradient(ellipse 50% 35% at 92% 88%,',
  '      rgba(0,200,187, 0.035) 0%, transparent 65%);',
  '  /* Glow amarelo no canto superior esquerdo  */',
  '  /* Glow teal no canto inferior direito      */',
  '}',
], TEAL);

h3('Animações — keyframes em globals.css');
kvTable([
  ['pulse-dot',  'Pulsa o ponto de status "ao vivo" — opacity + scale, 2s infinite'],
  ['screen-in',  'Fade + slide-up ao entrar em nova tela — 0.3s ease-out'],
  ['fade-in',    'Fade + slide-up para elementos internos — 0.35s. Classes delay-1 a delay-6 criam efeito stagger'],
  ['dropdownIn', 'Slide-down suave para dropdowns de navegação'],
]);

h3('Classes utilitárias principais');
bullet('.cr-card — base de todos os cards (bg, border, border-radius 14px)');
bullet('.cr-card-hover — transição de border-color e background no :hover');
bullet('.glass — backdrop-filter blur(20px) para o header sticky');
bullet('.grid-2-col, .grid-sectors, .grid-companies — layouts responsivos');
bullet('Media query max-width: 768px — empilha grids em mobile');

// ═══════════════════════════════════════════════════════════════════════════════
// 14. FLUXO DE DADOS
// ═══════════════════════════════════════════════════════════════════════════════
checkPage(260);
sectionBanner('14. Fluxo Completo de Dados');

body('Como os dados percorrem o sistema desde as fontes externas até a interface:');
doc.y += 8;

var FLOW = [
  { title: 'Fontes Externas',  color: ORANGE, items: ['BRAPI (cotação B3)', 'Open-Meteo (clima)', 'NOAA CPC (ONI)', 'GNews (notícias)'] },
  { title: 'src/services/',    color: TEAL,   items: ['stockService.js', 'climateService.js', 'oniService.js', 'newsService.js'] },
  { title: 'Screen / Context', color: YELLOW, items: ['DashboardScreen', 'useEffect -> fetch', 'useState -> dados', 'props -> painéis'] },
  { title: 'Dashboard Panels', color: GREEN,  items: ['RatingPanel', 'BrazilMap', 'CorporateNews', 'ClimateNews'] },
];

var colW2 = (TW - 18) / 4;
var startX = ML;
var startY = doc.y;

FLOW.forEach(function(col, i) {
  var cx = startX + i * (colW2 + 6);
  var colH = 24 + col.items.length * 16 + 14;
  doc.roundedRect(cx, startY, colW2, colH, 5).fill(CARD2);
  doc.rect(cx, startY, colW2, 3).fill(col.color);
  doc.fillColor(col.color).font('Helvetica-Bold').fontSize(8.5)
     .text(col.title, cx + 8, startY + 9, { width: colW2 - 16 });
  col.items.forEach(function(item, j) {
    doc.fillColor(TEXT2).font('Helvetica').fontSize(8)
       .text('· ' + item, cx + 8, startY + 24 + j * 15, { width: colW2 - 16 });
  });
  if (i < FLOW.length - 1) {
    doc.fillColor(YELLOW).font('Helvetica-Bold').fontSize(12)
       .text('>', cx + colW2 + 1, startY + 22, { width: 10 });
  }
});
doc.y = startY + 110;

sep();
h3('Padrão de auto-refresh com cleanup (BrazilMap e RatingPanel)');
codeBlock([
  '// Evita memory leak ao desmontar o componente:',
  'useEffect(() => {',
  '  let cancelled = false;',
  '',
  '  async function fetchData() {',
  '    try {',
  '      const data = await getXxxData(params);',
  '      if (!cancelled) {       // nao atualiza se desmontou',
  '        setState(data);',
  '        setLastUpdate(new Date());',
  '      }',
  '    } catch (err) {',
  '      // silencia erros — mock ja foi retornado pelo service',
  '    }',
  '  }',
  '',
  '  fetchData();                             // executa imediatamente',
  '  const iv = setInterval(fetchData, INT);  // recorrente',
  '',
  '  return () => {        // CLEANUP ao desmontar:',
  '    cancelled = true;   // impede setState em componente morto',
  '    clearInterval(iv);  // cancela o timer',
  '  };',
  '}, [filter]); // re-executa quando filtro de horizonte muda',
], TEAL);

sep();
h3('Cache por filtro no BrazilMap');
codeBlock([
  '// apiRisk acumula resultados sem sobrescrever outros filtros:',
  'const [apiRisk, setApiRisk] = useState({});',
  '',
  '// Salva resultado no filtro atual sem apagar outros:',
  'setApiRisk(prev => ({ ...prev, [filter]: data }));',
  '',
  '// Na renderizacao, usa cache se disponivel:',
  'const riskData = apiRisk[filter] || {};',
  '',
  '// Resultado: trocar de "7d" para "30d" e voltar para "7d"',
  '// NAO faz um novo fetch — usa resultado ja em memoria.',
], YELLOW);

// ═══════════════════════════════════════════════════════════════════════════════
// 15. VARIÁVEIS DE AMBIENTE
// ═══════════════════════════════════════════════════════════════════════════════
checkPage(260);
sectionBanner('15. Variáveis de Ambiente');

body('O app usa variáveis de ambiente do Create React App (prefixo REACT_APP_). São definidas em um arquivo .env que NUNCA é commitado — está no .gitignore.');

codeBlock([
  '# .env — nao commitar! Adicionar ao .gitignore',
  '',
  '# Token BRAPI para cotacoes reais da B3',
  '# Obter em: https://brapi.dev (plano gratuito disponivel)',
  'REACT_APP_BRAPI_TOKEN=seu_token_aqui',
  '',
  '# Chave GNews para noticias em portugues',
  '# Obter em: https://gnews.io (100 req/dia gratis)',
  'REACT_APP_GNEWS_KEY=sua_chave_aqui',
], ORANGE);

infoBox('Funcionamento sem variáveis configuradas',
  'O app funciona 100% sem nenhuma variável de ambiente. Os services retornam dados mock realistas com links para fontes reais. Open-Meteo e NOAA CPC são completamente gratuitos e públicos — não requerem autenticação. BRAPI tem nível gratuito sem token com limite de requisições.',
  TEAL);

h3('Como as variáveis são acessadas no código');
codeBlock([
  '// React substitui REACT_APP_* em build time (nao runtime):',
  'const TOKEN = process.env.REACT_APP_BRAPI_TOKEN;',
  '',
  '// Verificacao antes de usar:',
  'if (!TOKEN) return MOCK_DATA;',
  '',
  '// ATENCAO: variaveis REACT_APP_* ficam expostas no bundle JS.',
  '// Nunca coloque chaves secretas de backend aqui.',
  '// Para producao, use um proxy backend para proteger chaves.',
], YELLOW);

// ═══════════════════════════════════════════════════════════════════════════════
// 16. BUILD E DEPLOY
// ═══════════════════════════════════════════════════════════════════════════════
sectionBanner('16. Build e Deploy');

h3('Scripts do package.json');
[
  ['npm start',                       'Servidor de desenvolvimento em localhost:3000 com hot reload automático.'],
  ['npm run build',                   'Build de produção em /build — minificação, tree-shaking, hash nos nomes.'],
  ['npm test',                        'Testes com Jest e React Testing Library.'],
  ['node scripts/buildBrazilGeo.js',  'Regenera o mapa SVG dos 27 estados do Brasil (requer internet).'],
  ['node scripts/generateDocs.js',    'Regenera esta documentação PDF.'],
].forEach(function(row) {
  checkPage(24);
  var y = doc.y;
  doc.roundedRect(ML, y, TW, 22, 3).fill(CARD2);
  doc.fillColor(ORANGE).font('Courier-Bold').fontSize(8)
     .text(row[0], ML + 10, y + 6, { width: 220 });
  doc.fillColor(TEXT2).font('Helvetica').fontSize(9)
     .text(row[1], ML + 234, y + 6, { width: TW - 244 });
  doc.y = y + 28;
});

h3('Deploy no Vercel via GitHub');
bullet('1. git push para o repositório GitHub');
bullet('2. Acessar vercel.com/new → Import Git Repository');
bullet('3. Framework Preset: Create React App (detectado automaticamente)');
bullet('4. Adicionar REACT_APP_* em Settings → Environment Variables');
bullet('5. Deploy → URL pública em aproximadamente 2 minutos');
bullet('6. Cada novo git push dispara redeploy automático');

h3('Outputs do build — /build/static/');
codeBlock([
  'build/',
  '  index.html',
  '  favicon.svg',
  '  manifest.json',
  '  static/',
  '    js/',
  '      main.[hash].js          // bundle principal (~150 KB gzip)',
  '      453.[hash].chunk.js     // chunk de code-splitting',
  '    css/',
  '      main.[hash].css         // estilos (~3 KB gzip)',
  '',
  '// Nomes com hash = cache busting automatico no browser',
  '// /build esta no .gitignore — Vercel faz o build no servidor',
], TEXT2);

infoBox('Testar o build localmente',
  'Para testar o build de producao antes do deploy:\n1. npm run build\n2. npx serve -s build -l 5000\n3. Acessar http://localhost:5000\n\nIsso simula exatamente o que o Vercel executa no servidor.',
  YELLOW);

// ─── Finish ───────────────────────────────────────────────────────────────────
doc.end();

writeStream.on('finish', function() {
  var kb = Math.round(fs.statSync(OUT).size / 1024);
  console.log('\n✅ PDF gerado com sucesso!');
  console.log('   Arquivo: ClimateRisk_DocumentacaoTecnica.pdf');
  console.log('   Tamanho: ' + kb + ' KB');
  console.log('   Caminho: ' + OUT + '\n');
});
writeStream.on('error', function(err) {
  console.error('❌ Erro ao gerar PDF:', err.message);
  process.exit(1);
});
