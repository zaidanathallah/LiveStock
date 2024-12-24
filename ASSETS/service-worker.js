const CACHE_NAME = "Dashboard LiveStock-cache-v1";
const ASSETS = [
    "/index.html",
    "/Dashboard.html",
    "/iconsicon-192x192.png",
    "/iconsicon-512x512.png",
    "/Female.png",
    "/Male.png",
    "/manifest.json",
    "/service-worker.js"
];

// Install service worker dan cache file
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching assets...");
            return cache.addAll(ASSETS);
        })
    );
});

// Fetch file dari cache atau server jika tersedia
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Hapus cache lama saat ada update
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            );
        })
    );
});