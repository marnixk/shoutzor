(function($, undefined) {

	/**
	 * Can read text input from server, and display it on screen in "terminal" style
	 */
	var TextBannerObject = {


		/**
		 * Initialize text-banner
		 */
		_construct : function(options) {
			this.font = VGAFont;
		},

		/**
		 * Print a character
		 */
		printChar : function(buffer, x, y, width, height, ch) {

			var 
				ascii = ch.charCodeAt(0),
				offset = 0;

			// go through row,col
			for (var row = 0; row < 16; ++row) {

				var 
					mask = 1 << 8,
					data = this.font[ascii][row],
					result = "";

				for (var col = 0; col < 8; ++col) {

					// inside buffer?
					if (col + x >= width || col + x < 0 || row + y >=  height || row + y < 0) {
						continue;
					}

					// has bit enabled? draw.
					if ((data & mask) > 0) {
						buffer[(y + row) * width + (x + col)] = 255;
					}
					// douse surroundings
					else {
						buffer[(y + row) * width + (x + col)] *= 0.9;					
					}

					mask >>= 1;
				}
				++offset;
			}


		},


		/**
		 * Print a character
		 */
		printString : function(buffer, x, y, width, height, string) {
			var yOffset = 0, xOffset = 0;

			for (var idx = 0; idx < string.length; ++idx) {
				// next line
				if (string.charAt(idx) == '\n') {
					yOffset += 18;
					xOffset = 0;
					continue;
				}
				
				this.printChar(buffer, x + xOffset, y + yOffset, width, height, string.charAt(idx));

				xOffset += 9;
			}

		}
	};

	/**
	 * Create a textbanner
	 */
	window.TextBanner = function(options) {
		for (var idx in TextBannerObject) {
			this[idx] = TextBannerObject[idx];
		}
		this._construct(options);
	}

})(jQuery);