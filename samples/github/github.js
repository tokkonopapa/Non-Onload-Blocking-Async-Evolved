/*! Github widget */
var win = parent ? parent.window : window;
(function (window, document, $) {

var githubRepos = function (id, user, login) {
	function getRepos(data) {
		var i, j, n = data.length;
		var list = [];

		for (i = 0; i < n; i++) {
			j = data[i];
			if (false === j['fork'] &&
				false === j['private'] &&
				login === j['owner'].login) {
				list.push(j);
			}
		}

		list.sort(function (a, b) {
			if (a.watchers > b.watchers) return -1;
			if (a.watchers < b.watchers) return 1;
			if (a.id > b.id) return -1;
			if (a.id < b.id) return 1;
			return 0;
		});

		var t, s = '<ul>';
		n = Math.min(list.length, 5);
		for (i = 0; i < n; i++) {
			j = list[i];
			s += '<li>';
			s += '<a href="' + j.html_url +
				'" title="' + j.full_name +
				'">' + j.name + '</a><br/>';
			t = j.description.substr(0, 50);
			if (j.description.length > t.length) t += '...';
			s += t + '<br/>';
			s += '<span class="github-repos-stars">&#9733; ' + j.watchers +
				' / forks ' + j.forks + '</span>';
			s += '</li>';
			// description, forks_count, watchers_count
		}

		return s + '</ul>';
	}

	function putRepos(html) {
		id = document.getElementById(id);
		if (id) { id.innerHTML =
			'<div class="github-repos-wrap">' +
			'<div class="github-repos-head">' +
				'<div class="github-repos-octocat"></div>' +
				'<p>' +
					'<a href="https://github.com/' + login +
					'">' + login + '</a> on GitHub' +
				'</p>' +
			'</div>' +
			'<div class="github-repos-doc">' + html + '</div>' +
			'<div class="github-repos-foot">' +
				'<p>' +
					'<a href="https://github.com/' + login +
					'?tab=repositories" title="' + login +
					' on GitHub">and more...</a>' +
				'</p>' +
				'<a href="https://github.com/" title="GitHub">' +
					'<div class="github-repos-logo"></div>' +
				'</a>' +
			'</div>' +
			'</div>';
		}
	}

	// 'https://api.github.com' + '/users/' + user + '/watched',
	// 'https://api.github.com' + '/users/' + user + '/starred',
	// 'https://api.github.com' + '/users/' + user + '/subscriptions',
	$.ajax('https://api.github.com' + '/users/' + user + '/repos', {
		dataType: 'json',
		success: function (repos, textStatus, jqXHR) {
			putRepos(repos.message ?
				'<ul><li>' + repos.message + '</li></ul>' :
				getRepos(repos)
			);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			putRepos('<ul><li>Error loading feed</li></ul>');
		}
	});
};

/* start widget */
githubRepos('github', 'tokkonoPapa', 'tokkonopapa');

})(win, win.document, win.jQuery);
