/*! This starter can be used in both parent and iframe */
var win = parent ? parent.window : window;
(function (window, document) {

    (function (w, d, s) {
        w._gaq = [
            ["_setAccount", "UA-42366765-1"],
            ["_trackPageview"]
        ];
        var s, e = d.getElementsByTagName("script")[0],
            a = function (u, f) {
                if (!d.getElementById(f)) {
                    s = d.createElement("script");
                    s.src = u;
                    s.async = !0;
                    if (f) s.id = f;
                    e.parentNode.insertBefore(s, e);
                }
            };
        a(("https:" == location.protocol ? "//ssl" : "//www") + ".google-analytics.com/ga.js", "ga");
        a("https://apis.google.com/js/plusone.js");
        a("//connect.facebook.net/en_US/all.js#xfbml=1", "facebook-jssdk");
        a("https://widgets.getpocket.com/v1/j/btn.js?v=1");
        a("//platform.twitter.com/widgets.js", "twitter-wjs");
    })(window, document);

})(win, win.document);