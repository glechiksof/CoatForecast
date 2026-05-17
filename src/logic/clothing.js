const RAIN_LIGHT = new Set([51, 52, 53, 54, 55, 61, 62, 63, 80])
const RAIN_HEAVY = new Set([65, 81, 82])
const DRIZZLE = new Set([56, 57])
const SNOW_LIGHT = new Set([71, 72, 73, 85])
const SNOW_HEAVY = new Set([75, 76, 77, 86])
const THUNDERSTORM = new Set([95, 96, 99])
const FOG = new Set([45, 48])

function byTemp(temp) {
  if (temp < -15) return ['heavy parka', 'thermal underlayer', 'balaclava', 'insulated gloves', 'snow boots', 'thick scarf']
  if (temp < -5)  return ['heavy coat', 'fleece underlayer', 'warm hat', 'gloves', 'scarf', 'winter boots']
  if (temp < 0)   return ['coat', 'sweater', 'hat', 'gloves', 'scarf', 'boots']
  if (temp < 5)   return ['coat', 'thick sweater', 'light scarf', 'closed shoes']
  if (temp < 10)  return ['jacket', 'sweater', 'long pants']
  if (temp < 15)  return ['light jacket', 'long-sleeve shirt', 'jeans']
  if (temp < 20)  return ['hoodie', 'jeans']
  if (temp < 25)  return ['t-shirt', 'light pants']
  if (temp < 30)  return ['t-shirt', 'shorts', 'sunglasses']
  return ['tank top', 'shorts', 'sunglasses', 'cap']
}

function byWeather(weathercode, windSpeed) {
  const extras = []
  if (RAIN_LIGHT.has(weathercode))  extras.push('umbrella', 'water-resistant jacket')
  if (RAIN_HEAVY.has(weathercode))  extras.push('umbrella', 'waterproof jacket', 'rain boots')
  if (DRIZZLE.has(weathercode))     extras.push('umbrella')
  if (SNOW_LIGHT.has(weathercode))  extras.push('winter boots', 'extra layer')
  if (SNOW_HEAVY.has(weathercode))  extras.push('waterproof snow boots', 'insulated gloves', 'balaclava')
  if (THUNDERSTORM.has(weathercode)) extras.push('umbrella', '⚠️ stay indoors')
  if (FOG.has(weathercode))         extras.push('light reflective layer')
  if (windSpeed > 40)               extras.push('windbreaker')
  return extras
}

export function getClothing(temp, weathercode = 0, windSpeed = 0) {
  const base = byTemp(temp)
  const extras = byWeather(weathercode, windSpeed)
  const merged = [...new Set([...base, ...extras])]
  return merged
}
