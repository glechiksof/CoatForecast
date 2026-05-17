# CoatForecast

[![CI/CD Pipeline](https://github.com/glechiksof/CoatForecast/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/glechiksof/CoatForecast/actions/workflows/ci-cd.yml)

Real-time weather forecast and clothing advisor. Pick a city and hour — CoatForecast tells you exactly what to wear.

## Features

- **Forecast section** — hourly weather data for any city (temperature, precipitation chance, conditions)
- **Visual aids section** — clothing icons recommended for the selected hour

## Tech stack

- Vanilla JS + [Vite](https://vitejs.dev/)
- [Open-Meteo API](https://open-meteo.com/) — free, no API key required

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests |
| `npm run coverage` | Unit tests with coverage report |
| `npm run test:e2e` | End-to-end tests (Playwright) |

## API

Weather data from [Open-Meteo](https://open-meteo.com/) — no key needed, works directly in the browser.

- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`
- Forecast: `https://api.open-meteo.com/v1/forecast`
