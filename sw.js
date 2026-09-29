const CACHE_NAME = 'estate-offline-v2';


self.addEventListener('install', event => {

    self.skipWaiting();

});


self.addEventListener('activate', event => {

    event.waitUntil(
        self.clients.claim()
    );

});


self.addEventListener('fetch', event => {

    event.respondWith(

        caches.match(event.request)
            .then(cachedResponse => {

                // Если файл уже скачан —
                // отдаём его из кэша
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Иначе пытаемся получить из интернета
                return fetch(event.request);

            })
            .catch(() => {

                // Если интернета нет и открывается
                // страница — отдаём сохранённый index.html

                if (event.request.mode === 'navigate') {

                    return caches.match(
                        new URL(
                            './index.html',
                            self.registration.scope
                        ).href
                    );

                }

            })

    );

});
