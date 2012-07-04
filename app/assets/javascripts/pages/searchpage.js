/**
 * Behavior initializations for the search page
 */
(function($, undefined) {

	window.Pages = window.Pages || {};

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
			plugins : [
				new Plugins.Fuel({}),
				new Plugins.Composite({
					mode : "sequential",
					parts : [
						new Plugins.Bitmap({bitmap : "SCNLogo"}),
						

						// introduction text
						new Plugins.TextScroller({
							text : "  welcome  to \n  CLASS 2012!",
							effects : [ 
								['up'], ['wait', {delay: 3000}], ['hide']
							]
						}),

						// class logo
						new Plugins.Bitmap({bitmap : 'ClassLogo'}),

						// where to upload to
						new Plugins.TextScroller({
							text : "upload files to _\n\\\\shoutzor.com",
							effects : [ 
								['up'], ['wait', {delay: 1500}], ['hide']
							]
						}),


						// new Plugins.TextScroller({
						// 	type : 'pattern',
						// 	pattern : [],
						// 	effects : [ ['pulsate'] ]
						// }),

						// // when: at end of song
						// // show: coming up next
						// new Plugins.TextScroller({
						// 	when : function() { return false;  },
						// 	text : function() { return 'coming up next: NextSong'; },
						// 	effects : [ ['left'] ]
						// })
					]
				})
/*
				new Plugins.TextScroller({
					
				})
				 */
			]
		});
		
		$("#searchbox").search({
			onSearch : function(item, q) {
				$("#songlist").data("songList").retrieveItems(item, q);
			}
		});

	};

})(jQuery);