/* Regular expression to parse uri
 * @link: http://tools.ietf.org/html/rfc2396#appendix-B
 * @example:
 * var url = 'scheme://authority/path?query#fragment';
 * if (url.match(url_parse)) {
 *     // RegExp
 *     // $1: scheme://, $2: scheme
 *     // $3: authority, $4: authority
 *     // $5: path
 *     // $6: ?query, $7: query
 *     // $8: #fragment, $9: fragment
 * }
 */
var url_parser = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;

/* Add query string to href depending on status of checkbox */
function addDelay(obj) {
	var nav = document.getElementById('site-navigation').children;
	for (var i = nav.length-1; i >= 0; i--) {
		if ('ul' === nav[i].nodeName.toLowerCase()) {
			var li = nav[i].children;
			for (var j = li.length-1; j >= 0; j--) {
				var a = li[j].children[0];
				if ('a' === a.nodeName.toLowerCase()) {
					if (a.href.match(url_parser)) {
						a.href = RegExp.$1 + RegExp.$3 + RegExp.$5;
						if (obj.checked) a.href += '?delay=' + obj.value;
					}
				}
			}
			break;
		}
	}
}

/* Get query string from the url */
function getDelay(url) {
	if (url.match(url_parser)) {
		url = RegExp.$1 + RegExp.$3 + RegExp.$5;
		var wait = RegExp.$7.replace(/\D/g, '');
		if (wait) {
			return 'http://tokkono.cute.coocan.jp/blog/slow/wp-content/uploads/test/sleep.php?type=img&cache=false&wait=' + wait + '&url=' + url.replace(/[\w\-\.]+?\.html$/, '')
		}
	}
	return '';
}

/* Set the checkbox status depending on query string in the url */
function setDelay(url, id) {
	id = document.getElementById(id);
	if (id && url.match(url_parser)) {
		var wait = RegExp.$7.replace(/\D/g, '');
		id.checked = wait ? true : false;

		// update href
		addDelay(id);
	}
}

setDelay(location.href, 'delay');
