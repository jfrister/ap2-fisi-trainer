const CACHE = "ap2-fisi-trainer-v2";
const ASSETS = ["./", "./index.html", "./styles.css", "./questions.js", "./question-bank-2025.js", "./app.js", "./manifest.webmanifest", "./icon.svg"];
self.addEventListener("install", (event) => event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS))));
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (event) => event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request))));
