/*! Twitter widget */
var win = parent ? parent.window : window;
(function (window, document, $) {

var twitterTimeline = function (id) {

	/* convert date to a hyperlink */
	function linkifyDate(date, url) {
		/* "Tue Jun 11 13:51:04 +0000 2013" */
		if (isNaN(Date.parse(date))) { // if lte IE 8
			date = date.replace(" +0000", "Z");
		}
		var d = new Date(date);
		date = d.getMonth() + 1 + '月' + d.getDate() + '日';
		return '<a href="' + url + '" title="tweet on ' + date + ' - ' + d.getHours() + ':' + ('0' + d.getMinutes()).slice(-2) + '">' + date + '</a>';
	}

	/* convert ulrs to hyperlinks */
	function linkifyTweet(text, url) {
		// Linkify urls, usernames, hashtags
		text = text.replace(/(https?:\/\/)([\w\-:;?&=+.%#\/]+)/gi, '<a href="$1$2" title="$1$2">$2</a>')
			.replace(/(^|\W)@(\w+)/g, '$1<a href="https://twitter.com/$2">@$2</a>')
			.replace(/(^|\W)#(\w+)/g, '$1<a href="https://search.twitter.com/search?q=%23$2">#$2</a>');

		// Use twitter's api to replace t.co shortened urls with expanded ones.
		var surl; // short url
		for (var u in url) {
			if (url[u].expanded_url !== null) {
				surl = new RegExp(url[u].url, 'g');
				text = text.replace(surl, url[u].expanded_url);
			}
			if (url[u].display_url !== null) {
				surl = new RegExp(">" + (url[u].url.replace(/https?:\/\//, '')), 'g');
				text = text.replace(surl, ">" + url[u].display_url);
			}
		}
		return text;
	}

	/* build widget */
	function buildWidget(widget) {
		$.ajax('http://tokkono.cute.coocan.jp/twitter/twitter.php', {
			dataType: 'jsonp'
		}).done(function (tweets, textStatus, jqXHR) {
			var i, content, user = tweets[0].user;

			/* header */
			content = '<li><div class="header"><a href="http://twitter.com/' + user.name + '" title="@' + user.name + '"><img class="avator" src="' + user.profile_image_url + '" alt="@' + user.name + '" /></a><h3><a href="http://twitter.com/' + user.name + '">' + user.name + '</a></h3></div></li>';

			/* timeline */
			for (i = 0; i < tweets.length; i++) {
				content += '<li><p>' + linkifyDate(tweets[i].created_at, 'https://twitter.com/' + user.name + '/status/' + tweets[i].id_str) + '<br />' + linkifyTweet(tweets[i].text.replace(/\n/g, '<br>'), tweets[i].entities.urls) + '</p></li>';
			}

			/* footer */
			content += '<li><div class="footer"><a href="https://twitter.com/' + user.name + '" class="twitter-follow-button" data-show-count="false" data-lang="ja" target=_blank>@' + user.name + 'さんをフォロー</a></div></li>';

			/* render */
			widget.innerHTML = '<ul>' + content + '</ul>';

			/* load twitter */
/*			(function (d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0],
					p = /^http:/.test(d.location) ? 'http' : 'https';
				if (!d.getElementById(id)) {
					js = d.createElement(s);
					js.id = id;
					js.async = true;
					js.src = p + '://platform.twitter.com/widgets.js';
					fjs.parentNode.insertBefore(js, fjs);
				}
			})(document, 'script', 'twitter-wjs');
*/
		}).fail(function (jqXHR, textStatus, errorThrown) {
			widget.innerHTML = '<ul><li><p>' + textStatus + '</p></li></ul>';
		});
	}

	/* build widget */
	buildWidget(document.getElementById(id));
};

/* start widget */
twitterTimeline('mytweet');

})(win, win.document, win.jQuery);
