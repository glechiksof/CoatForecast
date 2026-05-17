export function celsiusToFahrenheit(c) {
  return Math.round((c * 9) / 5 + 32)
}

export function kmhToMph(kmh) {
  return Math.round(kmh * 0.621371)
}

export function formatTemp(temp, unit = 'C') {
  if (unit === 'F') return `${celsiusToFahrenheit(temp)}°F`
  return `${Math.round(temp)}°C`
}
