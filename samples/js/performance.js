// https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/NavigationTiming/Overview.html
// https://developer.mozilla.org/ja/docs/Navigation_timing
// https://developer.mozilla.org/en-US/docs/Web/API/Performance.now%28%29
// http://www.html5rocks.com/en/tutorials/webperformance/basics/
// http://kaaes.github.io/timing/
// http://caniuse.com/nav-timing
// http://coding.smashingmagazine.com/2012/11/05/writing-fast-memory-efficient-javascript/
var report = function (legacy) {
    window.performance =
        window.performance ||
        window.msPerformance ||
        window.mozPerformance ||
        window.webkitPerformance ||
        { timing: legacy };

    var check = function () {
        if (window.performance.timing.loadEventEnd == null) {
            window.performance.timing.loadEventEnd = new Date().getTime();
            window.performance.navigation = {
                type: 3
            };
        }
        if (window.performance.timing.loadEventEnd > 0) {
            show();
        } else {
            setTimeout(check, 100);
        }
    }

    var show = function () {
        var type = {
            0: "<code>click or address bar</code>",
            1: "<code>reload</code>",
            2: "<code>history traversal</code>",
            3: "Not supported"
        };

        var i, t;
        var timing = [];
        var list = [{
            name: 'domContentLoadedEventEnd',
            alias: 'DOM ready'
        }, {
            name: 'domComplete',
            alias: 'onload'
        }];
        var start = window.performance.timing.navigationStart;
/*
        for (i in window.performance.timing) {
            t = window.performance.timing[i] - 0;
            if (t > 0) {
                timing.push({
                    key: i,
                    value: t - start
                });
            }
        }
*/
        for (i = 0; i < list.length; i++) {
            t = window.performance.timing[list[i].name] - 0;
            if (t > 0) {
                timing.push({
                    key: list[i].alias,
                    value: t - start
                });
            }
        }

        timing.sort(function (a, b) {
            return a.value > b.value ? 1 : -1;
        });

        var html = '';
        html += '<ul>';
        html += '<li><strong>Navigation Type:</strong><span style="margin-left:0.6em">' + type[window.performance.navigation.type] + '</span></li>';
        html += '<li><table>';
        html += '<tr>';
        html += '<th>Elapsed [msec]</th>';
        html += '<th style="width: 6em;">Event</th>';
        html += '</tr>';
        for (i = 0; i < timing.length; i++) {
            html += '<tr>';
            html += '<td>' + timing[i].value + '</td>';
            html += '<td><code>' + timing[i].key + '</code></td>';
            html += '</tr>';
        }
        html += '</table></li>';
        html += '</ul>';

        var result = document.getElementById('timing-result');
        if (result) {
            result.innerHTML = html;
        }
    }

    check();
}
