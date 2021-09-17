if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

let scroller = document.querySelector(".scroller")

if (location.pathname == "/") {
    fetch("https://jokzbackend.locknessko.repl.co/api/v1/list").then(x => {
        return x.text()
    }).then(z => {
        opts = JSON.parse(z);

        opts.forEach(element => {
            fetch("https://jokzbackend.locknessko.repl.co/api/v1/get?id=" + element).then(x => {
                return x.text()
            }).then(y => {
                // console.log(y);
                a = document.createElement("div");
                a.className = "joke";
                a.innerHTML = `<div class="content"><a href="/j/`+element+`">`+atob(y).toHtmlEntities()+`</a></div>
<div class="share">
    <i class="far fa-laugh-squint"> &laughs;</i>
</div>`;
                scroller.appendChild(a);
            });
        });
    });
}

String.prototype.toHtmlEntities = function() {
    return this.replace(/./gm, function(s) {
        // return "&#" + s.charCodeAt(0) + ";";
        return (s.match(/[a-z0-9\s]+/i)) ? s : "&#" + s.charCodeAt(0) + ";";
    });
};

editable = document.querySelector(".editable");

editable.onkeydown = (e) => {
    // console.log(e.keyCode)
    if(editable.innerText.length > 150 && e.keyCode != 8 && e.keyCode != 46 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40) {
        e.preventDefault();
    }
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

function create() {
    fetch('https://jokzbackend.locknessko.repl.co/api/v1/set?id='+makeid(5)+'&data='+btoa(editable.innerText)).then(x=>{window.location="/"});
}