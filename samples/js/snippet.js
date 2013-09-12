var win = parent ? parent.window : window;
(function (window, document) {

    (function (win, doc, script) {
        var js,
            fjs = doc.getElementsByTagName(script)[0],
            add = function (url, id) {
                if (!doc.getElementById(id)) {
                    js = doc.createElement(script);
                    js.src = url;
                    id && (js.id = id);
                    fjs.parentNode.insertBefore(js, fjs);
                }
            };

        // Google Analytics
        win._gaq = [["_setAccount", "UA-42366765-1"],["_trackPageview"]];
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

}(win, win.document));
