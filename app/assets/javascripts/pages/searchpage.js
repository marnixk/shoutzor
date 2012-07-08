/**
 * Behavior initializations for the search page
 */
(function($, undefined) {

	window.Pages = window.Pages || {};

	/**
	 * retrieve the now playing text
	 */
	function getNowPlayingText() {
		return $("#status .now-playing").text();
	}

	/**
	 * Search page initialization
	 */
	window.Pages.SearchPage = function() {

		$("#songlist").songList();
		$("#status").playerStatus();

		$("#comingup").comingUp({ 
			container : "#comingUpContainer"
		});

		$("#history").history({});

		$("#modal_dialog").modalDialog();

		function effectTint(x) {

			return {
				r : 0.4,
				g : 1.0,
				b : 0.3
			};			

		}

		$("#effect").visualBase({
			copyRatio : 0.8,
			copyMargin: 0.1,
			tint: effectTint,
			plugins : [
				new Plugins.Fuel({}),
				new Plugins.Composite({
					mode : "sequential",
					parts : [
						
						// introduction text
						new Plugins.TextScroller({
							text : "  welcome  to \n  CLASS 2012!",
							effects : [ 
								['top'], ['wait', {delay: 100}]
							]
						}),

						new Plugins.TextScroller({
							text : getNowPlayingText,
							effects : [
								['left'],
							]
						}),

						// class logo
						new Plugins.Bitmap({bitmap : 'ClassLogo'}),

						// where to upload to
						new Plugins.TextScroller({
							text : "upload files to\n\\\\shoutzor.com",
							effects : [ 
								['top'], ['wait', {delay: 150}]
							]
						}),

						new Plugins.Bitmap({bitmap : "SCNLogo"})

					]
				})

			]
		});
		
		$("#searchbox").search({
			onSearch : function(item, q) {
				$("#songlist").data("songList").retrieveItems(item, q);
			}
		});

	};

})(jQuery);