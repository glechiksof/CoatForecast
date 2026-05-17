import { buildHourlyList } from '../logic/forecast.js'

const WEATHER_EMOJI = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
  45: '🌫️', 48: '🌫️',
  51: '🌦️', 53: '🌦️', 55: '🌧️',
  56: '🌧️', 57: '🌧️',
  61: '🌧️', 63: '🌧️', 65: '🌧️',
  71: '🌨️', 73: '❄️', 75: '❄️', 77: '🌨️',
  80: '🌦️', 81: '🌧️', 82: '⛈️',
  85: '🌨️', 86: '❄️',
  95: '⛈️', 96: '⛈️', 99: '⛈️',
}

function weatherEmoji(code) {
  return WEATHER_EMOJI[code] ?? '🌡️'
}

function tempClass(temp) {
  if (temp >= 28) return 'hot'
  if (temp >= 18) return 'warm'
  if (temp >= 10) return 'mild'
  if (temp >= 0)  return 'cool'
  return 'cold'
}

function formatTime(hour) {
  const d = new Date(2000, 0, 1, hour)
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

export function renderForecast(container, hourly, _cityName, onHourSelect) {
  container.innerHTML = ''
  const hours = buildHourlyList(hourly)

  hours.forEach((h) => {
    const card = document.createElement('div')
    card.className = 'hour-card'
    card.dataset.hour = h.hour

    const tempEl = document.createElement('span')
    tempEl.className = `card-temp ${tempClass(h.temp)}`
    tempEl.textContent = `${Math.round(h.temp)}°`

    card.innerHTML = `
      <span class="card-time">${formatTime(h.hour)}</span>
      <span class="card-emoji">${weatherEmoji(h.weathercode)}</span>
    `
    card.appendChild(tempEl)
    card.insertAdjacentHTML('beforeend', `<span class="card-precip">💧${h.precipitation}%</span>`)

    card.addEventListener('click', () => {
      document.querySelectorAll('.hour-card').forEach((c) => c.classList.remove('active'))
      card.classList.add('active')
      onHourSelect(h)
    })

    container.appendChild(card)
  })
}
