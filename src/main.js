import { searchCities, fetchForecast } from './api/weather.js'
import { renderForecast } from './ui/forecast.js'
import { renderClothing } from './ui/clothing.js'

const cityInput = document.getElementById('city-input')
const searchBtn = document.getElementById('search-btn')
const suggestions = document.getElementById('suggestions')
const forecastSection = document.getElementById('forecast-section')
const forecastCards = document.getElementById('forecast-cards')
const cityLabel = document.getElementById('city-label')
const clothingSection = document.getElementById('clothing-section')
const clothingItems = document.getElementById('clothing-items')
const clothingHourLabel = document.getElementById('clothing-hour-label')
const envBadge = document.getElementById('env-badge')

envBadge.textContent = `Mode: ${import.meta.env.VITE_APP_STATUS ?? 'development'}`

let debounceTimer = null

cityInput.addEventListener('input', () => {
  clearTimeout(debounceTimer)
  const q = cityInput.value.trim()
  if (q.length < 2) {
    hideSuggestions()
    return
  }
  debounceTimer = setTimeout(() => loadSuggestions(q), 300)
})

cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    clearTimeout(debounceTimer)
    hideSuggestions()
    triggerSearch()
  }
})

searchBtn.addEventListener('click', () => {
  hideSuggestions()
  triggerSearch()
})

document.addEventListener('click', (e) => {
  if (!suggestions.contains(e.target) && e.target !== cityInput) hideSuggestions()
})

async function loadSuggestions(query) {
  try {
    const cities = await searchCities(query)
    suggestions.innerHTML = ''
    if (!cities.length) { hideSuggestions(); return }
    cities.forEach((city) => {
      const li = document.createElement('li')
      li.textContent = `${city.name}, ${city.country}`
      li.addEventListener('click', () => {
        cityInput.value = city.name
        hideSuggestions()
        loadForecast(city)
      })
      suggestions.appendChild(li)
    })
    suggestions.hidden = false
  } catch {
    hideSuggestions()
  }
}

async function triggerSearch() {
  const q = cityInput.value.trim()
  if (!q) return
  try {
    const cities = await searchCities(q)
    if (cities.length) loadForecast(cities[0])
  } catch {
    alert('Could not find city. Try again.')
  }
}

async function loadForecast(city) {
  try {
    const data = await fetchForecast(city.latitude, city.longitude)
    cityLabel.textContent = `${city.name}, ${city.country_code?.toUpperCase() ?? ''}`
    renderForecast(forecastCards, data.hourly, city.name, onHourSelect)
    forecastSection.hidden = false
    clothingSection.hidden = true
  } catch {
    alert('Failed to load forecast.')
  }
}

function onHourSelect(hourData) {
  const label = new Date(hourData.time).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true,
  })
  clothingHourLabel.textContent = `${label} — ${Math.round(hourData.temp)}°C`
  renderClothing(clothingItems, label, hourData)
  clothingSection.hidden = false
  clothingSection.scrollIntoView({ behavior: 'smooth' })
}

function hideSuggestions() {
  suggestions.hidden = true
  suggestions.innerHTML = ''
}
