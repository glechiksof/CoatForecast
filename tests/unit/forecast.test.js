import { describe, it, expect } from 'vitest'
import { formatHour, findHourData, weatherLabel, buildHourlyList } from '../../src/logic/forecast.js'

describe('formatHour', () => {
  it('formats midnight as 12:00 AM', () => {
    expect(formatHour(0)).toBe('12:00 AM')
  })

  it('formats noon as 12:00 PM', () => {
    expect(formatHour(12)).toBe('12:00 PM')
  })

  it('formats 13 as 1:00 PM', () => {
    expect(formatHour(13)).toBe('1:00 PM')
  })

  it('formats 9 as 9:00 AM', () => {
    expect(formatHour(9)).toBe('9:00 AM')
  })
})

const mockHourly = {
  time: [
    '2024-05-17T00:00',
    '2024-05-17T01:00',
    '2024-05-17T14:00',
    '2024-05-17T23:00',
  ],
  temperature_2m: [10, 9, 22, 15],
  weathercode: [0, 0, 1, 61],
  precipitation_probability: [5, 5, 0, 60],
  wind_speed_10m: [10, 12, 8, 35],
}

describe('findHourData', () => {
  it('returns correct entry for hour 14', () => {
    const result = findHourData(mockHourly, 14)
    expect(result).not.toBeNull()
    expect(result.temp).toBe(22)
    expect(result.hour).toBe(14)
  })

  it('returns correct entry for hour 0', () => {
    const result = findHourData(mockHourly, 0)
    expect(result.temp).toBe(10)
  })

  it('returns null for hour not in data', () => {
    expect(findHourData(mockHourly, 7)).toBeNull()
  })

  it('returns weathercode and windSpeed', () => {
    const result = findHourData(mockHourly, 23)
    expect(result.weathercode).toBe(61)
    expect(result.windSpeed).toBe(35)
  })
})

describe('weatherLabel', () => {
  it('returns Clear for code 0', () => {
    expect(weatherLabel(0)).toBe('Clear')
  })

  it('returns Rain for codes 61-67', () => {
    expect(weatherLabel(61)).toBe('Rain')
    expect(weatherLabel(65)).toBe('Rain')
  })

  it('returns Snow for codes 71-77', () => {
    expect(weatherLabel(73)).toBe('Snow')
  })

  it('returns Thunderstorm for code 95', () => {
    expect(weatherLabel(95)).toBe('Thunderstorm')
  })
})

describe('buildHourlyList', () => {
  it('maps all hourly entries', () => {
    const list = buildHourlyList(mockHourly)
    expect(list).toHaveLength(4)
  })

  it('each entry has hour, temp, weathercode', () => {
    const list = buildHourlyList(mockHourly)
    expect(list[2].hour).toBe(14)
    expect(list[2].temp).toBe(22)
    expect(list[2].weathercode).toBe(1)
  })
})
