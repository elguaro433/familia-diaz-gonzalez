// Service Worker v10 - Auto-destructor
// Se desregistra a sí mismo y limpia todos los caches
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    Promise.all([
      caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))),
      self.clients.claim(),
      self.registration.unregister()
    ])
  );
});
self.addEventListener('fetch', e => e.respondWith(fetch(e.request)));
