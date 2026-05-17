# CoatForecast

Hourly weather forecast with smart clothing recommendations. Search any city, pick an hour, dress right.

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
