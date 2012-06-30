(function($, undefined) {

	/**
	 * Extension for the text scroller
	 */
	$.extend(window.Plugins, {

		/**
		 * Create a new textscroller
		 */
		TextScroller : function(options) {
			for (var idx in Plugins.TextScrollerObject) {
				this[idx] = Plugins.TextScrollerObject[idx];
			}
			this._construct($.extend(this.defaults, options));
			return this;
		},

		/**
		 * Text scroller object implementation
		 */
		TextScrollerObject : { 

			/**
			 * Default options
			 */
			defaults : {

			},

			/**
			 * Construct the scroller
			 */
			_construct : function(options) {
				this.banner = new TextBanner({});
				this.options = options;
			},

			/**
			 * Execute the scroller
			 */
			execute : function(visual, world) {

				this.banner.printString(
					visual.matrix, 
					Math.floor((visual.width / 2) - 65),
					visual.height - Math.floor(world.frame * 0.5),
					visual.width, 
					visual.height, 
					"Hello Chelsey,\n" +
					"Isn't this a love-\n" +
					"ly way to read\ntext? \n\n" +
					"        - Leeuw"
				);

			}
		}

	});
})(jQuery);























































					// 'welcome to _\nCLASS \'12\n\n\n' +
					// 'upload files to _\n \\\\shoutzor.com\n\n' +
					// 'now playing _\n' + 'Queen -\nWho wants to\nlive forever'
