(function($, undefined) {

	/**
	 * Widget for player status
	 */
	$.widget("shoutzor.playerStatus", {

		/**
		 * Default options
		 */
		options : {

		},

		/**
		 * Initialize
		 */
		_create : function() {
			console.log($(this.element).data("status"));
		}
	});

})(jQuery);