const CACHE_NAME = 'wepay-static-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/favicon-transparent.png',
  '/logo192.png',
  '/logo512.png'
  // أضف هنا ملفات CSS/JS المهمة أو أي موارد ثابتة تريد كاشها
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  // تجاهل طلبات غير-GET
  if (req.method !== 'GET') return;
  // استجابة من الكاش أولاً ثم الشبكة
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          // نسخ في الكاش للطلبات الناجحة من نفس الأصل
          if (!res || res.status !== 200 || res.type !== 'basic') return res;
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(() => cached || fetch(req));
    })
  );
});
