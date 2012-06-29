(function($, undefined) {

	$.widget("shoutzor.comingUp", {

		/**
		 * Default options
		 */
		options : {
			container : "#container"
		},

		/**
		 * Create handler
		 */
		_create : function() {

			var $this = this;
			$this.element = $(this.element);
			$this.element.click(function() {
				$.get(
					"/coming_up", { 
						tstamp : new Date().getTime() 
					}, 
					function(result) {
						$this._showDialog(result);
					},
					"json"
				);

				return false;
			});
		},

		/**
		 * Show the dialog
		 */
		_showDialog : function(results) {
			console.log(results);
		}
	});

})(jQuery);