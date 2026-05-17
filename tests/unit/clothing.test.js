import { describe, it, expect } from 'vitest'
import { getClothing } from '../../src/logic/clothing.js'

describe('getClothing — temperature bands', () => {
  it('returns heavy parka below -15°C', () => {
    expect(getClothing(-20)).toContain('heavy parka')
  })

  it('returns balaclava and insulated gloves below -15°C', () => {
    const items = getClothing(-16)
    expect(items).toContain('balaclava')
    expect(items).toContain('insulated gloves')
  })

  it('returns heavy coat between -15 and -5°C', () => {
    expect(getClothing(-10)).toContain('heavy coat')
    expect(getClothing(-10)).not.toContain('heavy parka')
  })

  it('returns coat between -5 and 0°C', () => {
    const items = getClothing(-2)
    expect(items).toContain('coat')
    expect(items).toContain('gloves')
  })

  it('returns jacket between 5 and 10°C', () => {
    expect(getClothing(7)).toContain('jacket')
  })

  it('returns t-shirt above 20°C', () => {
    const items = getClothing(22)
    expect(items).toContain('t-shirt')
    expect(items).not.toContain('coat')
    expect(items).not.toContain('jacket')
  })

  it('returns tank top and cap above 30°C', () => {
    const items = getClothing(32)
    expect(items).toContain('tank top')
    expect(items).toContain('cap')
    expect(items).toContain('sunglasses')
  })
})

describe('getClothing — weather overlays', () => {
  it('adds umbrella for light rain (code 61)', () => {
    expect(getClothing(15, 61)).toContain('umbrella')
  })

  it('adds waterproof jacket for heavy rain (code 65)', () => {
    const items = getClothing(15, 65)
    expect(items).toContain('waterproof jacket')
    expect(items).toContain('rain boots')
  })

  it('adds umbrella for drizzle (code 56)', () => {
    expect(getClothing(15, 56)).toContain('umbrella')
  })

  it('adds winter boots for light snow (code 71)', () => {
    expect(getClothing(-2, 71)).toContain('winter boots')
  })

  it('adds balaclava for heavy snow (code 75)', () => {
    expect(getClothing(-5, 75)).toContain('balaclava')
  })

  it('adds windbreaker when wind > 40 km/h', () => {
    expect(getClothing(15, 0, 50)).toContain('windbreaker')
  })

  it('does NOT add windbreaker when wind ≤ 40 km/h', () => {
    expect(getClothing(15, 0, 30)).not.toContain('windbreaker')
  })

  it('returns no duplicate items when overlays overlap base', () => {
    const items = getClothing(-5, 75)
    const set = new Set(items)
    expect(items.length).toBe(set.size)
  })
})
