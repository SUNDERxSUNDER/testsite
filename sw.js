const CACHE_NAME = 'estate-offline-test-v1';


// Установка
self.addEventListener('install', event => {

    self.skipWaiting();

});


// Активация
self.addEventListener('activate', event => {

    event.waitUntil(
        self.clients.claim()
    );

});


// Перехват запросов
self.addEventListener('fetch', event => {

    event.respondWith(

        caches.match(event.request)
            .then(cached => {

                // Есть файл в кэше
                if (cached) {
                    return cached;
                }

                // Если нет — пробуем интернет
                return fetch(event.request);

            })
            .catch(() => {

                // Если это открытие страницы
                // без интернета — отдаём index.html
                if (
                    event.request.mode === 'navigate'
                ) {

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
