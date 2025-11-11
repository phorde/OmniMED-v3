/**
 * OmniMED Production Configuration
 * Contains all production-ready settings and environment variables
 */

const PRODUCTION_CONFIG = {
  // Application Environment
  environment: 'production',
  version: '3.0.0',
  debug: false,
  logLevel: 'warn',

  // Security Settings
  security: {
    // HTTPS is mandatory in production
    https: true,
    // Content Security Policy
    csp: {
      'default-src': "'self'",
      'script-src': "'self'",
      'style-src': "'self' 'unsafe-inline'",
      'img-src': "'self' data: https:",
      'font-src': "'self' https://fonts.googleapis.com",
      'connect-src': "'self'",
      'frame-src': "'none'",
    },
    // XSS Protection
    xssProtection: true,
    // Disable MIME type sniffing
    noSniff: true,
    // Clickjacking protection
    frameOptions: 'DENY',
  },

  // Performance Settings
  performance: {
    // Cache duration in seconds
    cacheDuration: 86400, // 24 hours
    // Asset cache duration
    assetCacheDuration: 604800, // 7 days
    // Enable gzip compression
    gzip: true,
    // Minification enabled
    minification: true,
  },

  // API Configuration
  api: {
    // Base URL for API calls (if needed in future)
    baseUrl: process.env.API_URL || 'https://api.example.com',
    // Request timeout in ms
    timeout: 30000,
    // Retry attempts
    retries: 3,
  },

  // Logging Configuration
  logging: {
    // Send errors to external service
    enableRemoteLogging: true,
    // Remote logging endpoint
    loggingEndpoint: process.env.LOGGING_ENDPOINT || '',
    // Log only errors and warnings in production
    minLevel: 'warn',
  },

  // Database Configuration (if future implementation)
  database: {
    enabled: false,
    // Connection details from environment
    url: process.env.DATABASE_URL || '',
  },

  // Analytics (optional)
  analytics: {
    enabled: false,
    trackingId: process.env.TRACKING_ID || '',
  },

  // PWA Configuration
  pwa: {
    enabled: true,
    // Service Worker settings
    serviceWorker: {
      enabled: true,
      cacheName: 'omnimed-v3-cache-v1',
      networkTimeout: 5000,
    },
    // Manifest settings
    manifest: {
      name: 'OmniMED - Suporte Clínico',
      shortName: 'OmniMED',
      description: 'Aplicação de suporte clínico para medicina de emergência',
      theme_color: '#1a9b8e',
      background_color: '#ffffff',
    },
  },

  // Server Headers
  headers: {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  },

  // Feature Flags
  features: {
    medicationCalculator: true,
    themeToggle: true,
    offline Mode: true,
    darkMode: true,
  },

  // CORS Configuration
  cors: {
    enabled: false,
    allowedOrigins: [],
  },
};

// Load environment-specific overrides
if (process.env.NODE_ENV === 'production') {
  // Apply production-specific settings
  Object.assign(PRODUCTION_CONFIG, {
    debug: false,
    logLevel: 'error',
  });
}

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PRODUCTION_CONFIG;
} else if (typeof window !== 'undefined') {
  window.OMNIMED_CONFIG = PRODUCTION_CONFIG;
}
