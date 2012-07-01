(function($, undefined) {

	/**
	 * Extension for the default fuel plugin
	 */
	$.extend(window.Plugins, {

		/**
		 * Create a new Notice
		 */
		Bitmap : function(options) {
			for (var idx in Plugins.BitmapObject) {
				this[idx] = Plugins.BitmapObject[idx];
			}
			this._construct($.extend(this.defaults, options));
			return this;
		},

		BitmapObject : {

			defaults : {

			},

			/**
			 * Initialize bitmap
			 */
			_construct : function(options) {
				this.options = options;
				this.bitmap = Bitmap[options.bitmap];
				this.reset();
			},

			/**
			 * Reset the plugin function
			 */
			reset : function(visual, world) {
				this.row = 0;
				this.startFrame = 0;
			},

			/**
			 * Show bitmap
			 */
			execute : function(visual, world) {

				this.row = -visual.height + Math.floor((world.frame - this.startFrame) * 0.3);

				var 
					centerOffsetX = Math.floor((visual.width / 2) - (this.bitmap.width / 2)),
					startY = this.row,
					buffer = visual.matrix,
					endY = Math.min(this.row + visual.height, this.bitmap.height);

				var pixelOffset = startY * this.bitmap.width;

				for (var y = startY; y < endY; ++y) {
					var matrixOffset = (y - startY) * visual.width + centerOffsetX;
					for (x = 0; x < this.bitmap.width; ++x) {
						var val = this.bitmap.pixels[pixelOffset];
						
						// has bit enabled? draw.
						if (val == 1) {
							visual.matrix[matrixOffset] = 255;
						}
						// douse surroundings
						else {
							visual.matrix[matrixOffset] *= 0.8;					
						}

						++pixelOffset;
						++matrixOffset;
					}
				}

			}
		}
	});

})(jQuery);