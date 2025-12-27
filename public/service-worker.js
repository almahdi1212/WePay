const CACHE_NAME = 'wepay-static-v4';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});



self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // ❌ لا نكاش API ولا auth ولا login
  if (
    req.method !== "GET" ||
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/sanctum") ||
    url.pathname.startsWith("/login")
  ) {
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;

      return fetch(req)
        .then((res) => {
          // ✅ نكاش فقط الردود الصحيحة
          if (!res || res.status !== 200) return res;

          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, resClone);
          });

          return res;
        })
        .catch(() => cached);
    })
  );
});


