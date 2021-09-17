self.addEventListener('install', function (event) {

});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        new Response(
            "Hello World!", {
                headers: {
                    'Content-Type': 'text/html'
                }
            }
        );
    );
});