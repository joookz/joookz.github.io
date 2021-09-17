self.addEventListener('install', function (event) {
    console.log("Installed Service Worker!")
});

self.addEventListener('fetch', function (event) {
    const url = new URL(event.request.url);
    console.log(url, location)
    event.respondWith(
        new Response(fetch("jokzbackend.locknessko.repl.co/api/v1/get?id=" + url).then(x=>{return x.text()}).then(y=>{return y}), {
            headers: {
                'Content-Type': 'text/html'
            }
        })
    )
});