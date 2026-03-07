const CACHE_NAME = 'daily-health-v3';
const ASSETS = [
  '/Daily-Health-/',
  '/Daily-Health-/index.html',
  '/Daily-Health-/dieta.html',
  '/Daily-Health-/manifest.json',
  '/Daily-Health-/icon-192.png',
  '/Daily-Health-/icon-512.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/Daily-Health-/index.html')))
  );
});
