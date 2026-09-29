const CACHE_NAME = 'estate-offline-v1';

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

                // Есть сохранённая версия
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Если нет — пытаемся получить из интернета
                return fetch(event.request);

            })
            .catch(() => {

                // Если пользователь открыл страницу без интернета
                if (event.request.mode === 'navigate') {

                    return caches.match('/index.html');

                }

            })

    );

});
