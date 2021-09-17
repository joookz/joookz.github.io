self.addEventListener('install', function (event) {
    console.error("AAAAAAAAAAAAAAA");
});

self.addEventListener('fetch', function (event) {
    console.error("AAAAAAAAAAAAAAA");
    const url = new URL(event.request.url);
    event.respondWith(
        new Response("Hello World!", {headers: {'Content-Type': 'text/html'}});
    );
});