export const APP_CONFIG = {
  name: 'Aarogya AI',
  version: '1.0.0',
  description: 'AI-powered healthcare companion with Tavus video agents',
  author: 'Anikethan Joshi',
  contact: {
    email: 'akhilajoshi0609@gmail.com',
    phone: '+91 9606725656',
    linkedin: 'https://www.linkedin.com/in/anikethan-joshi-050ab6242/',
    github: 'https://github.com/Anikethanjoshi'
  }
};

export const API_ENDPOINTS = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  MEDICINES: '/medicines',
  HOSPITALS: '/hospital',
  LOCATIONS: '/locations',
  JAN_AUSHADHI: '/jan-aushadhi',
  AUTH: '/auth',
  HEALTH: '/health'
};

export const TAVUS_CONFIG = {
  API_URL: 'https://api.tavus.io/v1',
  DEFAULT_AGENT: 'dr-aarogya',
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  MAX_SESSION_DURATION: 60 * 60 * 1000 // 1 hour
};

export const SUBSCRIPTION_PLANS = {
  BASIC: 'basic',
  PREMIUM: 'premium',
  ENTERPRISE: 'enterprise'
};

export const STORAGE_KEYS = {
  USER: 'aarogya_user',
  THEME: 'aarogya_theme',
  LANGUAGE: 'aarogya_language',
  SETTINGS: 'aarogya_settings'
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please login to continue.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.'
};