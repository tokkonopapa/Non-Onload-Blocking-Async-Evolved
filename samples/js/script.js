/*! Script starter */
/* Start script at onload */

function startOnload(callback) {
    var args = ([].slice.call(arguments)).slice(1);
    if (window.addEventListener) {
        window.addEventListener('load', function () {
            callback.apply({}, args);
        }, false);
    } else {
        window.attachEvent('onload', function () {
            callback.apply({}, args);
        });
    }
}

/* Start script at DOM ready using jQuery */

function startReady(callback) {
    var args = ([].slice.call(arguments)).slice(1);
    $ && $(function () {
        callback.apply({}, args);
    });
}

/* Load script using DOM injection */

function loadAsync(src, onload, onerror) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = src;
    script.onload = onload;
    script.onerror = onerror;
    script.onreadystatechange = function () {
        if (this.readyState === 'loaded' ||
            this.readyState === 'complete') {
            this.onreadystatechange = null;
            if (this.onload) this.onload();
        }
    };
//  var where = document.getElementsByTagName('script')[0];
//  where.parentNode.insertBefore(iframe, where);
//  document.getElementsByTagName('head')[0].appendChild(script);
    document.body.appendChild(script);
}

/* Load script into an iframe (frame-in-frame) */

function loadIframe(url, id) {
    setTimeout(function () {
        var iframe = document.createElement('iframe');
        (iframe.frameElement || iframe).style.cssText = "display:none";
        iframe.src = "javascript:false";
        var where = document.getElementsByTagName('script')[0];
        where.parentNode.insertBefore(iframe, where);
        var doc = (iframe.contentWindow.document || iframe.contentDocument);
        doc.open().write('<body onload="' +
            'var js = document.createElement(\'script\');' +
            'js.type = \'text/javascript\';' +
            'js.async = true;' +
            (id ? 'js.id = \'' + id + '\';' : '') +
            'js.src = \'' + url + '\';' +
            'document.body.appendChild(js);' +
            '">');
        doc.close();
    }, 0);
}

// /* Invoke function in an iframe with parent.window ... it blocks onload!

function execIframe(script) {
    var iframe = document.createElement('iframe');
    (iframe.frameElement || iframe).style.cssText = "display:none";
    iframe.src = "javascript:false";
    var where = document.getElementsByTagName('script')[0];
    where.parentNode.insertBefore(iframe, where);
    var doc = (iframe.contentWindow.document || iframe.contentDocument);
    doc.open().write('<body onload="' +
        // asign window.parent to iframe's context
        'var win = parent.window;' +
        '(function (window, document) {' +
        script +
        '})(win, win.document)' +
        '">');
    doc.close();
}

// Load script into an iframe with current context ... it blocks onload!

function loadIframe2(url, id) {
    var iframe = document.createElement('iframe');
    (iframe.frameElement || iframe).style.cssText = "display:none";
    iframe.src = "javascript:false";
    var where = document.getElementsByTagName('script')[0];
    where.parentNode.insertBefore(iframe, where);
    var doc = (iframe.contentWindow.document || iframe.contentDocument);
    doc.open().write('<body onload="' +
        // asign window.parent to iframe's context
        'var win = parent.window;' +
        '(function (window, document) {' +
        'var js = document.createElement(\'script\');' +
        'js.type = \'text/javascript\';' +
        'js.async = true;' +
        (id ? 'js.id = \'' + id + '\';' : '') +
        'js.src = \'' + url + '\';' +
        'document.body.appendChild(js);' +
        '})(win, win.document)' +
        '">');
    doc.close();
}
// */

/* Create an iframe with styles for jsFiddle */

function createFiddle(id, src, style) {
    // Keep params in iframe object
    var iframe = document.createElement('iframe');
    iframe.id = id + '-iframe';

    // Resouce
    iframe.src = src ? src.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : null;

    // Styles
    // http://nanto.asablo.jp/blog/2005/10/29/123294
    iframe.style.cssText = style;
    iframe.setAttribute('frameborder', 0);
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('marginheight', 0);
    iframe.setAttribute('marginwidth', 0);

    // Attach first to make body in iframe
    var elem = document.getElementById(id);
    elem.style.cssText = 'overflow: auto';
    elem.appendChild(iframe);
}
