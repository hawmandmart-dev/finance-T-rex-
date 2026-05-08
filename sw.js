const CACHE_NAME = 'myfinance-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap'
];

// Install — cache all assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS).catch(err => {
        console.log('Cache addAll partial error (fonts may fail offline):', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate — clean up old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch — serve from cache, fallback to network
self.addEventListener('fetch', e => {
  // Skip non-GET and chrome-extension requests
  if(e.request.method !== 'GET') return;
  if(e.request.url.startsWith('chrome-extension')) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if(cached) return cached;

      return fetch(e.request)
        .then(response => {
          // Cache successful responses (not opaque/error)
          if(!response || response.status !== 200 || response.type === 'error') {
            return response;
          }
          const toCache = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, toCache));
          return response;
        })
        .catch(() => {
          // Offline fallback — return index.html for navigation
          if(e.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
    })
  );
});
