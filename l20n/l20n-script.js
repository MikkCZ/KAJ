/*
Reused from michal.stanke.cz
*/
var l20n = function() {
    var ctx = document.l10n;

    var logger = function(e) {
        console.log('L20n '+e.type+':', e);
    };
    ctx.addEventListener('error', logger);
    ctx.addEventListener('warning', logger);

    var langs = document.getElementById('langs').children;

    var setLang = function(lang) {
        if (!lang) {
            lang = ctx.supportedLocales[0];
        }
        ctx.requestLocales(lang);
        for (var i = 0; i < langs.length; i++) {
            var a = langs[i];
            while (a.nodeName.toLowerCase() !== 'a') {
                a = a.parentNode;
            }
            if (a.href.split('#')[1] == lang) {
                a.style.display = 'none';
            } else {
                a.style.display = 'inline';
            }
        }
    };

    var langClickListener = function(e) {	
        var a = e.target;
        while (a.nodeName.toLowerCase() !== 'a') {
            a = a.parentNode;
        }
        setLang(a.href.split('#')[1]);
    };

    for (var i = 0; i < langs.length; i++) {
        langs[i].addEventListener('click', langClickListener);
    }

    ctx.addEventListener('ready', function(e) {
        ctx.removeEventListener('ready', arguments.callee);
        setLang(window.location.hash.split('#')[1]);
    });
}

window.addEventListener('DOMContentLoaded', l20n);
