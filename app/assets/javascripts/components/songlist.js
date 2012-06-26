(function($, undefined) {

	$.widget("shoutzor.songList", {

		/**
		 * Default options
		 */
		options : {

		},

		/**
		 * Song list
		 */
		_create : function() {
			var $this = this;

			$this.element = $(this.element);

			// wait for ajax success
			$("table a").live("ajax:success", function(event, result) {
				$this._showResult(result);				
			});
		},


		_showResult : function(result) {
			if (result.status == "done") {
				alert("You have voted");
			}
			else if (result.status == "too_soon") {
				alert("Too soon, wait " + result.wait_for + " seconds");
			}
			else if (result.status == "incomplete") {
				alert("Stop yer tampering");
			}
			else {
				alert("R44r.");
			}
		},

		/**
		 * Update the list
		 */
		update : function(list) {
		}
	});

})(jQuery);