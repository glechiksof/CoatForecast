export function formatHour(hour) {
  const date = new Date(2000, 0, 1, hour)
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

export function findHourData(hourly, hour) {
  const idx = hourly.time.findIndex((t) => new Date(t).getHours() === hour)
  if (idx === -1) return null
  return {
    hour,
    time: hourly.time[idx],
    temp: hourly.temperature_2m[idx],
    weathercode: hourly.weathercode[idx],
    precipitation: hourly.precipitation_probability[idx],
    windSpeed: hourly.wind_speed_10m[idx],
  }
}

export function buildHourlyList(hourly) {
  return hourly.time.map((t, i) => ({
    hour: new Date(t).getHours(),
    time: t,
    temp: hourly.temperature_2m[i],
    weathercode: hourly.weathercode[i],
    precipitation: hourly.precipitation_probability[i],
    windSpeed: hourly.wind_speed_10m[i],
  }))
}

export function weatherLabel(code) {
  if (code === 0) return 'Clear'
  if (code <= 3)  return 'Partly cloudy'
  if (code <= 48) return 'Foggy'
  if (code <= 57) return 'Drizzle'
  if (code <= 67) return 'Rain'
  if (code <= 77) return 'Snow'
  if (code <= 82) return 'Showers'
  if (code <= 99) return 'Thunderstorm'
  return 'Unknown'
}
