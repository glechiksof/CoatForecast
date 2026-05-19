import * as Sentry from '@sentry/browser'

export function initSentry() {
  Sentry.init({
    dsn: 'https://226623f833d313c33c318d1ceb73acd7@o4511418197934080.ingest.de.sentry.io/4511418213793872',
    environment: import.meta.env.VITE_APP_STATUS ?? 'development',
    integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  })
}

export function captureException(error, context = {}) {
  Sentry.captureException(error, { extra: context })
}

export function addBreadcrumb(message, data = {}) {
  Sentry.addBreadcrumb({ message, data, category: 'user' })
}

export { Sentry }
