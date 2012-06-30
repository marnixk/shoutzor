(function($, undefined) {

	/**
	 * Extension for the text scroller
	 */
	$.extend(window.Plugins, {

		/**
		 * Create a new Notice
		 */
		Notice : function(options) {
			for (var idx in Plugins.NoticeObject) {
				this[idx] = Plugins.NoticeObject[idx];
			}
			this._construct($.extend(this.defaults, options));
			return this;
		},

		/**
		 * Text scroller object implementation
		 */
		NoticeObject : { 

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
					55,
					10,
					visual.width, 
					visual.height, 
					"login"
				);

			}
		}

	});
})(jQuery);