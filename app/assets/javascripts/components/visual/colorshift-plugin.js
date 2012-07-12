/**

	Color TransformH(
	    const Color &in,  // color to transform
	    float H
	)
	{
	  float U = cos(H*M_PI/180);
	  float W = sin(H*M_PI/180);

	  Color ret;
	  ret.r = (.701*U+.168*W)*in.r
	    + (-.587*U+.330*W)*in.g
	    + (-.114*U-.497*W)*in.b;
	  ret.g = (-.299*U-.328*W)*in.r
	    + (.413*U+.035*W)*in.g
	    + (-.114*U+.292*W)*in.b;
	  ret.b = (-.3*U+1.25*W)*in.r
	    + (-.588*U-1.05*W)*in.g
	    + (.886*U-.203*W)*in.b;
	  return ret;
	}

 */


(function($, undefined) {

	/**
	 * Extension for the default fuel plugin
	 */
	$.extend(window.Plugins, {

		/**
		 * Create a new Notice
		 */
		ColorShift : function(options) {
			for (var idx in Plugins.ColorShiftObject) {
				this[idx] = Plugins.ColorShiftObject[idx];
			}
			this._construct($.extend(this.defaults, options));
			return this;
		},

		ColorShiftObject : {

			defaults : {
				everyNFrames: 200,
				shiftForNFrames : 20,
				colorShift : 3,
			},

			/**
			 * Initialize ColorShift
			 */
			_construct : function(options) {
				this.options = options;
				this.tints = options.tints;

				// base colors
				this.colors = [];

				for (var tIdx = 0; tIdx < $(this.tints).length; ++tIdx) {
					var tFunc = this.tints[tIdx];
					this.colors[tIdx] = new Array(255);
					for (var cIdx = 0; cIdx < this.colors[tIdx].length; ++cIdx) {
						this.colors[tIdx][cIdx] = {
									r: tFunc(cIdx).r * 255 * (cIdx / 255), 
									g: tFunc(cIdx).g * 255 * (cIdx / 255), 
									b: tFunc(cIdx).b * 255 * (cIdx / 255)
								};
					}
				}

				this.reset();
			},

			/**
			 * Reset the plugin function
			 */
			reset : function(visual, world) {
				this.hue = 0;
			},

			/**
			 * Do color shift
			 */
			execute : function(visual, world) {

				var fPos = (world.frame % this.options.everyNFrames);

				this.paletteIdx = 
					Math.floor(world.frame / this.options.everyNFrames) % this.colors.length;

				if (fPos < this.options.shiftForNFrames) {
					this._paletteShift(visual, fPos / this.options.shiftForNFrames);
				}
			},

			/**
			 * Shift the entire palette
			 */
			_paletteShift : function(visual, hue) {
				var 
					nowSet = this.colors[this.paletteIdx],
					nextSet = this.colors[(this.paletteIdx + 1) % this.colors.length];

				for (var idx = 0; idx < 255; ++idx) {
					var 
						nowColor = nowSet[idx],
						nextColor = nextSet[idx],
						color = {
							r : nowColor.r + (nextColor.r - nowColor.r) * hue,
							g : nowColor.g + (nextColor.g - nowColor.g) * hue,
							b : nowColor.b + (nextColor.b - nowColor.b) * hue
						};

					visual.colors[idx] = Raphael.rgb(color.r, color.g, color.b);
				}
			}

			/**
			 * Hue shift:
			 *
			 * transforms hue into UW tex-coord and applies a matrix transform

			_hueShift : function(rgb, hue) {
				var 
					U = Math.cos(hue * Math.PI/180.0),
			  		W = Math.sin(hue * Math.PI/180.0);

			  var mulFactor = 1.6;
			  var ret = {};

			  ret.r = Math.min(255, 
					  		mulFactor * Math.abs(
					  		  (.701 * U +.168 * W) * rgb.r
							  + (-.587 * U +.330 * W) * rgb.g
							  + (-.114 * U -.497 * W) * rgb.b
					 ));

			  ret.g = Math.min(255,
					  		mulFactor * Math.abs(
					  		  (-.299 * U -.328 * W) * rgb.r
							  + (.413 * U +.035 * W) * rgb.g
							  + (-.114 * U +.292 * W) * rgb.b
					 ));


			  ret.b = Math.min(255, 
						  	mulFactor * Math.abs(
					  		  (-.3 * U +1.25 * W) * rgb.r
							  + (-.588 * U -1.05 * W) * rgb.g
							  + (.886 * U-.203 * W) * rgb.b
					 ));

			  return ret;				
			}
						 */
		}
	});

})(jQuery);