(function($, undefined) {

	$.widget("shoutzor.history", {

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
					"/history", { 
						tstamp : new Date().getTime() 
					}, 
					function(result) {
						$this._showDialog(result);
					},
					"html"
				);

				return false;
			});
		},

		/**
		 * Show the dialog
		 */
		_showDialog : function(results) {
			$("#modal_dialog").data("modalDialog").show({
				"title" : "What's been played ...",
				"type" : "normal",
				"buttons" : {
					"done" : function() {
						$("#modal_dialog").data("modalDialog").close();
					}
				},
				"content" : results
			});
		}
	});

})(jQuery);