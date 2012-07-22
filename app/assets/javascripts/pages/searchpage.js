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


		$("#effect").visualBase({
			copyRatio : 0.8,
			copyMargin: 0.1,
			tint: ColorSets.green,
			plugins : [
				new Plugins.ColorShift({tints : [
						ColorSets.cyan, ColorSets.green, ColorSets.purple, 
						ColorSets.red, ColorSets.blue
					]}
				),
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
							text : "upload files to\n\\\\shoutzor",
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