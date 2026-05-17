import { getClothing } from '../logic/clothing.js'
import { weatherLabel } from '../logic/forecast.js'

const ICONS = {
  'heavy parka': '🧥',
  'thermal underlayer': '🩱',
  'balaclava': '🎭',
  'insulated gloves': '🧤',
  'snow boots': '🥾',
  'thick scarf': '🧣',
  'heavy coat': '🧥',
  'fleece underlayer': '🩱',
  'warm hat': '🧢',
  'gloves': '🧤',
  'scarf': '🧣',
  'winter boots': '🥾',
  'coat': '🧥',
  'sweater': '🧶',
  'hat': '🧢',
  'boots': '🥾',
  'closed shoes': '👟',
  'thick sweater': '🧶',
  'light scarf': '🧣',
  'jacket': '🫙',
  'long pants': '👖',
  'light jacket': '🧤',
  'long-sleeve shirt': '👕',
  'jeans': '👖',
  'hoodie': '🧥',
  't-shirt': '👕',
  'light pants': '👖',
  'shorts': '🩳',
  'sunglasses': '🕶️',
  'tank top': '👙',
  'cap': '🧢',
  'umbrella': '☂️',
  'water-resistant jacket': '🧥',
  'waterproof jacket': '🧥',
  'rain boots': '🥾',
  'extra layer': '🧶',
  'waterproof snow boots': '🥾',
  'light reflective layer': '🦺',
  'windbreaker': '🧥',
  '⚠️ stay indoors': '⚠️',
}

export function renderClothing(container, hourLabel, hourData) {
  const items = getClothing(hourData.temp, hourData.weathercode, hourData.windSpeed)
  container.innerHTML = ''
  items.forEach((item) => {
    const el = document.createElement('div')
    el.className = 'clothing-item'
    el.innerHTML = `
      <span class="clothing-icon">${ICONS[item] ?? '👗'}</span>
      <span class="clothing-label">${item}</span>
    `
    container.appendChild(el)
  })
}
