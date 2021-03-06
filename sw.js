let template = `<!DOCTYPE html>
<html lang="en-AU">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="robots" content="index, follow">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="A Joke Sharing Platform">
    <meta name="keywords" content="Joke,Jokes,Jokz,Funny,Incredibly">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="/static/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inconsolata&display=swap" rel="stylesheet">
    <title>jokz | &title;</title>
</head>

<body>
    <ul>
        <li><a class="active" href="/"><i class="far fa-laugh-squint"></i></a></li>
        <li><a href="/about.html">About</a></li>
    </ul>
    <div class="scroller">
        <div class="joke">
            <div class="content">
                &joke;
            </div>
            <div class="share">
                <i class="far fa-laugh-squint"> &laughs;</i>
            </div>
        </div>
    </div>
    <script src="/static/joke.js"></script>
</body>

</html>`


self.addEventListener('install', function (event) {
    console.log("Installed Service Worker!")
});

String.prototype.toHtmlEntities = function() {
    return this.replace(/./gm, function(s) {
        // return "&#" + s.charCodeAt(0) + ";";
        return (s.match(/[a-z0-9\s]+/i)) ? s : "&#" + s.charCodeAt(0) + ";";
    });
};

self.addEventListener('fetch', function (event) {
    const url = new URL(event.request.url);
    if (url.href.split(url.hostname)[1].includes("j") && url.href.split(url.hostname)[1].split("j/")[1] != undefined) {
        event.respondWith(
            fetch("https://jokzbackend.locknessko.repl.co/api/v1/get?id=" + url.href.split(url.hostname)[1].split("j/")[1]).then(x => {
                return x.text()
            }).then(y => {
                console.error(y);
                return new Response(template.replace("&joke;",atob(y).toHtmlEntities()).replace("&title;",url.href.split(url.hostname)[1].split("j/")[1]), {
                    headers: {
                        'Content-Type': 'text/html'
                    }
                })
            })
        )
    }
});