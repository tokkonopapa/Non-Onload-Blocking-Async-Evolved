/*! This starter can be used in both parent and iframe */
var win = parent ? parent.window : window;
(function (window, document, $) {

	/* Extract path and page url from location.href */
	var url_parser = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
	window.location.href.match(url_parser);
	var path = RegExp.$5;
	var page = RegExp.$1 + RegExp.$3 + path;

	/* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
	var disqus_shortname = $('#disqus_thread').data('disqus-username');
	var disqus_identifier = path;
	var disqus_url = page;
	var disqus_developer = window.location.protocol.indexOf('http') === 0 ? 0 : 1; /* developer mode is on */

	/* * * DON'T EDIT BELOW THIS LINE * * */
	(function() {
		var add = function(disqus_script) {
			var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
			dsq.src = 'http://' + disqus_shortname + '.disqus.com/' + disqus_script;
			(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
		}
		add('embed.js');
		add('count.js');
	})();

})(win, win.document, win.jQuery);
