Non Onload Blocking Async JS Loading Evolved
============================================

Load 3rd party scripts in parallel with the rest of your content without blocking onload.

### How ?

Prepare a small snippet like [Nicolas Gallagher's code](https://gist.github.com/necolas/1025811) to launch 3rd party scripts.

```javascript
(function (win, doc, script) {
    var js,
        fjs = doc.getElementsByTagName(script)[0],
        add = function (url, id) {
            if (doc.getElementById(id)) {
                js = doc.createElement(script);
                js.src = url;
                id && (js.id = id);
                fjs.parentNode.insertBefore(js, fjs);
            }
        };

    // Google Analytics
    add(('https:' == location.protocol ? '//ssl' : '//www') + '.google-analytics.com/ga.js', 'ga');
    // Google+ button
    add('https://apis.google.com/js/plusone.js');
    // Facebook SDK
    add("//connect.facebook.net/en_US/all.js#xfbml=1", "facebook-jssdk");
    // Twitter SDK
    add("//platform.twitter.com/widgets.js", "twitter-wjs");
    // Pocket SDK
    add("https://widgets.getpocket.com/v1/j/btn.js?v=1");
}(window, document, 'script'));
```

Wrap above code with `parent.window` and save it as snippet.js.

```javascript
var win = parent ? parent.window : window;
    // above codes here
(function (window, document) {
```

Fetch snippet.js with __frame-in-frame__ method that is described in [Stoyan Stefanov's post](http://www.phpied.com/non-onload-blocking-async-js/).

```Javascript
(function (url) {
    var iframe = document.createElement('iframe');
    (iframe.frameElement || iframe).style.cssText = 'display:none';
    iframe.src = 'javascript:false';
    var where = document.getElementsByTagName('script')[0];
    where.parentNode.insertBefore(iframe, where);
    var doc = iframe.contentWindow.document;
    doc.open().write('&lt;body onload="' +
        'var js = document.createElement(\'script\');' +
        'js.src = \'' + url + '\';' +
        'document.body.appendChild(js);"&gt;');
    doc.close();
}('snippet.js'));
```

That's it!

### Demos

- Basic pages:
    + [Conventional page](http://tokkonopapa.github.io/Non-Onload-Blocking-Async-Evolved/samples/basic1.html)
    + [Evolutionary page](http://tokkonopapa.github.io/Non-Onload-Blocking-Async-Evolved/samples/basic2.html)
- Practical pages:
    + [Conventional page](http://tokkonopapa.github.io/Non-Onload-Blocking-Async-Evolved/samples/practical1.html)
    + [Evolutionary page](http://tokkonopapa.github.io/Non-Onload-Blocking-Async-Evolved/samples/practical2.html)

### Related references

- May 8, 2010 [Lazy Loading Asyncronous Javascript &#8211; Friendly Bit](http://friendlybit.com/js/lazy-loading-asyncronous-javascript/)
- Oct 25, 2011 [LightningJS: safe, fast, and asynchronous third-party Javascript | Something People Want](http://www.olark.com/spw/2011/10/lightningjs-safe-fast-and-asynchronous-third-party-javascript/)
- Nov 23, 2011 Aaron Peters [Why loading third party scripts async is not good enough](http://www.aaronpeters.nl/blog/why-loading-third-party-scripts-async-is-not-good-enough)
- June 28, 2012 [Non-onload-blocking async JS / Stoyan's phpied.com](http://www.phpied.com/non-onload-blocking-async-js/)
- Dec 8th 2012 [Under the Hood: The JavaScript SDK – Truly Asynchronous Loading](http://www.facebook.com/note.php?note_id=10151176218703920)
- Dec 9th 2012 [Performance Calendar &raquo; The non-blocking script loader pattern](http://calendar.perfplanet.com/2012/the-non-blocking-script-loader-pattern/)
- [olark/lightningjs](https://github.com/olark/lightningjs)
- [meebo/embed-code](https://github.com/meebo/embed-code)
