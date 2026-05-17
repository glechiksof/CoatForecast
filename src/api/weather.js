const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

export async function searchCities(query) {
  const res = await fetch(`${GEO_URL}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`)
  if (!res.ok) throw new Error('Geocoding request failed')
  const data = await res.json()
  return data.results ?? []
}

export async function fetchForecast(latitude, longitude) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    hourly: 'temperature_2m,weathercode,precipitation_probability,wind_speed_10m',
    forecast_days: '1',
    timezone: 'auto',
  })
  const res = await fetch(`${FORECAST_URL}?${params}`)
  if (!res.ok) throw new Error('Forecast request failed')
  return res.json()
}
