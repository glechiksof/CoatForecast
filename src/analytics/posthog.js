import posthog from 'posthog-js'

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST ?? 'https://eu.i.posthog.com'

export function initPostHog() {
  if (!POSTHOG_KEY) return
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: 'identified_only',
  })
}

export function captureEvent(event, properties = {}) {
  if (!POSTHOG_KEY) return
  posthog.capture(event, properties)
}

export function isFeatureEnabled(flag) {
  if (!POSTHOG_KEY) return false
  return posthog.isFeatureEnabled(flag)
}

export function onFeatureFlags(callback) {
  if (!POSTHOG_KEY) return
  posthog.onFeatureFlags(callback)
}

export { posthog }
