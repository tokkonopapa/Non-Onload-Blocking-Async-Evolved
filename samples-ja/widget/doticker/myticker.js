/*! jsdo.it widget */
var win = parent ? parent.window : window;
(function (window, document, $) {

var doTicker = function(id) {
	$('#' + id).doticker({
		name: "tokkonopapa",
		loop: false,
		maxCodes: 10,
		interval: 6000,
		scrollbar: true,
		duration: "slow",
		width: "auto",
		height: "400px",
		background: "#1b222b",
		bodyground: "#1b222b",
		bordercolor: "#888"
	});
};

/* start widget */
doTicker('mydoit');

})(win, win.document, win.jQuery);
