const CACHE_NAME = "psd-delivery-v5";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./grocery.html",
  "./restaurant.html",
  "./medicine.html",
  "./delivery.html",
  "./partner.html",
  "./rider.html",
  "./track.html",
  "./privacy.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./icon-192.svg",
  "./icon-512.svg",
  "./assets/images/home-poster.png",
  "./assets/images/grocery-banner.png",
  "./assets/images/restaurant-banner.png",
  "./assets/images/medicine-banner.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((key) => key !== CACHE_NAME ? caches.delete(key) : null)))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)));
});
