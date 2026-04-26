import axios from 'axios';

const KEY = process.env.REACT_APP_GNEWS_KEY;
const BASE = 'https://gnews.io/api/v4/search';

export const MOCK_CORPORATE = [
  {
    id: 'm1',
    title: 'Boa Safra registra queda de 12% no volume de sementes vendidas no 3T24 em razão da irregularidade hídrica no Centro-Oeste.',
    source: 'Valor Econômico', date: 'Abr 2025', impactType: 'neutral', impact: 'Receita',
    url: 'https://valor.globo.com/agronegocios/busca/?q=boa+safra+sementes+SOJA3',
  },
  {
    id: 'm2',
    title: 'Gestão amplia capital de giro em R$ 85M para cobrir pressão de inadimplência de cooperativas afetadas pela seca.',
    source: 'Reuters', date: 'Mar 2025', impactType: 'warning', impact: 'Capital',
    url: 'https://www.reuters.com/search/news?blob=boa+safra+sementes+soja+brasil',
  },
  {
    id: 'm3',
    title: 'Inadimplência de clientes no MATOPIBA sobe para 8,3% no trimestre, acima da estimativa de 5,5% do mercado.',
    source: 'InfoMoney', date: 'Mar 2025', impactType: 'negative', impact: 'Inadimplência',
    url: 'https://infomoney.com.br/busca/?q=SOJA3+inadimplencia+MATOPIBA',
  },
];

export const MOCK_CLIMATE = [
  {
    id: 'c1', event: 'Déficit Hídrico Centro-Oeste',
    region: 'MT / GO / MS', severity: 'high', horizon: 'Próximos 30 dias',
    impact: 'Redução de 15-20% no volume plantado de soja na região',
    url: 'https://clima.inmet.gov.br/',
  },
  {
    id: 'c2', event: 'La Niña Ativa — MATOPIBA',
    region: 'MA / PI / BA / TO', severity: 'high', horizon: '3-6 meses',
    impact: 'Revisão de guidance de receita e risco de inadimplência de cooperativas',
    url: 'https://enos.cptec.inpe.br/',
  },
  {
    id: 'c3', event: 'Estresse Hídrico Estrutural',
    region: 'Brasil Central', severity: 'medium', horizon: '12+ meses',
    impact: 'Risco crescente de quebra de safra recorrente nas regiões-core',
    url: 'https://monitoramento.ana.gov.br/',
  },
];

function mapArticle(a, i) {
  return {
    id: `api-${i}`,
    title: a.title,
    source: a.source?.name || 'Fonte',
    date: new Date(a.publishedAt).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }),
    impactType: 'neutral',
    impact: 'Notícia',
    url: a.url || null,
  };
}

export async function getCorporateNews() {
  if (!KEY) return MOCK_CORPORATE;
  try {
    const { data } = await axios.get(BASE, {
      params: { q: '"Boa Safra" OR "SOJA3"', lang: 'pt', max: 3, token: KEY },
      timeout: 6000,
    });
    const articles = data.articles?.slice(0, 3).map(mapArticle);
    return articles?.length ? articles : MOCK_CORPORATE;
  } catch {
    return MOCK_CORPORATE;
  }
}

export async function getClimateNews() {
  if (!KEY) return MOCK_CLIMATE;
  try {
    await axios.get(BASE, {
      params: { q: 'clima agronegócio seca safra Brasil', lang: 'pt', max: 3, token: KEY },
      timeout: 6000,
    });
    return MOCK_CLIMATE;
  } catch {
    return MOCK_CLIMATE;
  }
}
