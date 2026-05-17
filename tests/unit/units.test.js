import { describe, it, expect } from 'vitest'
import { celsiusToFahrenheit, kmhToMph, formatTemp } from '../../src/logic/units.js'

describe('celsiusToFahrenheit', () => {
  it('converts 0°C to 32°F', () => expect(celsiusToFahrenheit(0)).toBe(32))
  it('converts 100°C to 212°F', () => expect(celsiusToFahrenheit(100)).toBe(212))
  it('converts -40°C to -40°F', () => expect(celsiusToFahrenheit(-40)).toBe(-40))
})

describe('kmhToMph', () => {
  it('converts 0 km/h to 0 mph', () => expect(kmhToMph(0)).toBe(0))
  it('converts 100 km/h to 62 mph', () => expect(kmhToMph(100)).toBe(62))
})

describe('formatTemp', () => {
  it('formats Celsius by default', () => expect(formatTemp(20)).toBe('20°C'))
  it('formats Fahrenheit when unit is F', () => expect(formatTemp(0, 'F')).toBe('32°F'))
})
