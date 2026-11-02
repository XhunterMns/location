
const PRODUCTION_API_URL = 'https://location-vz0m.onrender.com/api';

export function getApiBaseUrl(hostname?: string): string {
  const runtimeOverride =
    typeof window !== 'undefined' && (window as any).__API_BASE_URL
      ? String((window as any).__API_BASE_URL)
      : '';

  if (runtimeOverride) {
    return runtimeOverride.replace(/\/$/, '');
  }

  const currentHost =
    hostname ??
    (typeof window !== 'undefined' ? window.location.hostname : '');

  const isLocalHost =
    ['localhost', '127.0.0.1', '0.0.0.0'].includes(currentHost) ||
    currentHost.startsWith('192.168.') ||
    currentHost.endsWith('.local');

  return isLocalHost
    ? 'http://localhost:3000/api'
    : PRODUCTION_API_URL;
}

export const API_BASE_URL = getApiBaseUrl();
