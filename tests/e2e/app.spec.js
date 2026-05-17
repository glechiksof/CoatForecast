import { test, expect } from '@playwright/test'

test.describe('CoatForecast E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('page loads with search input and header', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('CoatForecast')
    await expect(page.locator('#city-input')).toBeVisible()
    await expect(page.locator('#search-btn')).toBeVisible()
  })

  test('searching for a city shows forecast cards', async ({ page }) => {
    await page.fill('#city-input', 'Kyiv')
    await page.click('#search-btn')

    await expect(page.locator('#forecast-section')).toBeVisible({ timeout: 10_000 })
    await expect(page.locator('#city-label')).toContainText('Kyiv')
    const cards = page.locator('.hour-card')
    await expect(cards).toHaveCount(24)
  })

  test('clicking an hour card shows clothing recommendations', async ({ page }) => {
    await page.fill('#city-input', 'Kyiv')
    await page.click('#search-btn')

    await expect(page.locator('#forecast-section')).toBeVisible({ timeout: 10_000 })
    await page.locator('.hour-card').nth(12).click()

    await expect(page.locator('#clothing-section')).toBeVisible()
    const items = page.locator('.clothing-item')
    expect(await items.count()).toBeGreaterThan(0)
  })

  test('city suggestions appear while typing', async ({ page }) => {
    await page.fill('#city-input', 'Ber')
    await expect(page.locator('#suggestions')).toBeVisible({ timeout: 5_000 })
    expect(await page.locator('#suggestions li').count()).toBeGreaterThan(0)
  })
})
