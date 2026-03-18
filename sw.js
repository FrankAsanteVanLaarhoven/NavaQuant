// SOTA ANNIHILATION WORM: This Service Worker replaces the old one and unregisters itself immediately.
self.addEventListener('install', (e) => {
    self.skipWaiting(); 
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    return caches.delete(cache); // Nuke EVERY cache
                })
            );
        }).then(() => {
            self.registration.unregister(); // Kill the service worker permanently
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', (e) => {
    // Completely bypass cache.
    e.respondWith(fetch(e.request));
});
