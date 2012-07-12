(function($, undefined) {

	window.ColorSets = {

		blue : function(x) {
				return {
					r : 0.1,
					g : 0.4,
					b : 0.9
				};			
		},

		green : function(x) {

			return {
				r : 0.4,
				g : 1.0,
				b : 0.3
			};			

		},

		red : function(x) {

			return {
				r : 1.0,
				g : 0.4,
				b : 0.3
			};			

		},

		purple : function(x) {

			return {
				r : 1.0,
				g : 0.0,
				b : 1.0
			};			

		},

		cyan : function(x) {

			return {
				r : 0.0,
				g : 1.0,
				b : 1.0
			};			

		},		


		fire : function(x) {
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
		}
	};




})(jQuery);