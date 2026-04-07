const CACHE_NAME = 'mntlive-v1';
const ASSETS = [
    'index.html',
    'livescore.html',
    'landing.css',
    'livescore.png',
    'main.js',
    'mntlabs-ai.js'
];

// install — cache all assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

// activate — clear old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
});

// fetch — serve from cache, fallback to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cached => cached || fetch(event.request))
    );
});