(function($, undefined) {

	/**
	 * Can read text input from server, and display it on screen in "terminal" style
	 */
	var TextBannerObject = {

		/**
		 * Initialize text-banner
		 */
		_construct : function(options) {
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