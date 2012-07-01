/**
 * Behavior initializations for the login page
 */
(function($, undefined) {

	window.Pages = window.Pages || {};

	window.Pages.LoginPage = function() {

		// fullscreen resize
		$(window).resize(function() {
			$("body").css("height", $(window).innerHeight());
		});

		// set innerheight
		$("body").css("height", $(window).innerHeight());
		$("#effect").attr("width", $(window).innerWidth());
		$("#effect").attr("height", 250);


		var blue = function(x) {
				return {
					r : 0.1,
					g : 0.4,
					b : 0.9
				};			
		}

		var red = function(x) {
			if (x > 100) {
				return {
					r : 0.9,
					g : 0.9,
					b : 0.0
				};
			}
			else if (x > 50) {
				return {
					r : 0.9,
					g : 0.45 ,
					b : 0.0
				};
			}
			else {
				return {
					r : 0.9,
					g : 0,
					b : 0
				};
			}				
		};

		$("#effect").visualBase({
			width : 404,
			height : 250,
			blockSize : 8,
			maxWidth: 100,
			maxHeight: 30,
			copyRatio : 0.8,
			copyMargin: 0.1,
			tint : blue,
			transparent: true,
			plugins : [ new Plugins.Fuel({}) ]
		});		

	};

})(jQuery);