import { buildHourlyList, weatherLabel } from '../logic/forecast.js'
import { renderClothing } from './clothing.js'

export function renderForecast(container, hourly, cityName, onHourSelect) {
  container.innerHTML = ''
  const hours = buildHourlyList(hourly)

  hours.forEach((h) => {
    const card = document.createElement('div')
    card.className = 'hour-card'
    card.dataset.hour = h.hour
    card.innerHTML = `
      <span class="card-time">${formatTime(h.hour)}</span>
      <span class="card-temp">${Math.round(h.temp)}°C</span>
      <span class="card-cond">${weatherLabel(h.weathercode)}</span>
      <span class="card-precip">💧 ${h.precipitation}%</span>
    `
    card.addEventListener('click', () => {
      document.querySelectorAll('.hour-card').forEach((c) => c.classList.remove('active'))
      card.classList.add('active')
      onHourSelect(h)
    })
    container.appendChild(card)
  })
}

function formatTime(hour) {
  const d = new Date(2000, 0, 1, hour)
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}
