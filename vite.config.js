import { defineConfig } from 'vite'

export default defineConfig({
  base: '/CoatForecast/',
  test: {
    environment: 'jsdom',
    include: ['tests/unit/**/*.test.js'],
  },
})
