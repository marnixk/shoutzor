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
					"/playlist", { 
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
				"title" : "Coming up shortly!",
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