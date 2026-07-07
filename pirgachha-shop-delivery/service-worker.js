const CACHE_NAME = "psd-delivery-v10-mobile-order-20260707";
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
  "./home-compact.css",
  "./app.js",
  "./manifest.json",
  "./manifest-rider.json",
  "./icon-192.svg",
  "./icon-512.svg",
  "./assets/images/home-poster.png",
  "./assets/images/grocery-banner.png",
  "./assets/images/restaurant-banner.png",
  "./assets/images/medicine-banner.png"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((key) => key !== CACHE_NAME ? caches.delete(key) : null)))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
