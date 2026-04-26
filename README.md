# ClimateRisk Intelligence

Protótipo de plataforma de análise de risco climático para empresas B3, desenvolvido para apresentação à XP Investimentos.

## Stack
- React 18 + Create React App
- APIs: Open-Meteo, NOAA CPC, BRAPI, GNews

## Deploy
Vercel: conectar este repositório, Framework Preset = **Create React App**. Sem configuração extra.

## Desenvolvimento local
```bash
npm install
npm start
```

## Variáveis de ambiente (opcionais)
```
REACT_APP_BRAPI_TOKEN=seu_token
REACT_APP_GNEWS_KEY=sua_chave
```
Sem elas o app funciona com dados mock.
