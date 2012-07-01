(function($, undefined) {

	/**
	 * Extension for the default fuel plugin
	 */
	$.extend(window.Plugins, {

		/**
		 * Create a new Notice
		 */
		Fuel : function(options) {
			for (var idx in Plugins.FuelObject) {
				this[idx] = Plugins.FuelObject[idx];
			}
			this._construct($.extend(this.defaults, options));
			return this;
		},

		/**
		 * Text scroller object implementation
		 */
		FuelObject : { 

			/**
			 * Default options
			 */
			defaults : {

			},

			/**
			 * Construct the scroller
			 */
			_construct : function(options) {
				this.options = options;
			},

			/**
			 * Execute the scroller
			 */
			execute : function(visual, world) {

				if (visual.options.fire) {

					// set new values for the bottom
					var 
						$this = visual,
						baton = world.baton,
						offset = ($this.height - 1) * $this.width;
					
					// iterate bottom
					for (var x = 0; x < $this.width; ++x) {
						$this.matrix[offset] = 16 + Math.ceil($this.random[baton.seed % baton.rSize] * 200);

						var b = $this.blocks[offset];
						$this.canvas.fillStyle = $this.colors[$this.matrix[offset]];
						$this.canvas.fillRect(b.x, b.y, b.w, b.h);

						++offset;
						++baton.seed;
					}			
				}
			}
		}

	});
})(jQuery);

