const CACHE_NAME = 'remedy-whisper-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/assets/index.css',
    '/assets/index.js',
    '/manifest.json',
    '/favicon.ico',
    '/assets/icons/icon-192x192.png',
    '/assets/icons/icon-512x512.png'
];

// Install the service worker and cache assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Intercept fetch requests and return cached assets when offline
self.addEventListener('fetch', event => {
    // Skip cross-origin requests
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    // Cache hit - return the response
                    if (response) {
                        return response;
                    }

                    // Clone the request
                    const fetchRequest = event.request.clone();

                    return fetch(fetchRequest)
                        .then(response => {
                            // Check if we received a valid response
                            if (!response || response.status !== 200 || response.type !== 'basic') {
                                return response;
                            }

                            // Clone the response
                            const responseToCache = response.clone();

                            caches.open(CACHE_NAME)
                                .then(cache => {
                                    cache.put(event.request, responseToCache);
                                });

                            return response;
                        })
                        .catch(() => {
                            // If fetch fails, try to return the cached offline page
                            if (event.request.destination === 'document') {
                                return caches.match('/');
                            }
                        });
                })
        );
    }
});

// Listen for messages from the client
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
}); 