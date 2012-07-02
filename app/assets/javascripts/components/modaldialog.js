(function($, undefined) {

	/**
	 * Modal dialog
	 */
	$.widget("shoutzor.modalDialog", {
		options : {
			s : {
				wrapper : ".wrapper",
				buttonrow : ".buttonrow",
				text : "p.text",
				title : "h2 span"
			}
		},


		/**
		 * Initialize data-members
		 */
		_create : function() {
			this.element = $(this.element);
			this.wrapper = this.element.find(this.options.s.wrapper);
			this.buttonrow = this.element.find(this.options.s.buttonrow);
			this.title = this.element.find(this.options.s.title);
			this.text = this.element.find(this.options.s.text);
		},


		/**
		 * Add buttons to row
		 */
		_setupButtons : function(buttons) {
			this.buttonrow.find("button").remove();
			for (var label in buttons) {
				$("<button />")
					.text(label)
					.click(buttons[label])
					.appendTo(this.buttonrow);
			}
		},	

		/**
		 * Close the modal dialog
		 */
		close : function() {
			var $this = this;
			this.wrapper.animate(
				{
					top : "-=50px",
					opacity : 0
				},
				250, "swing",			
				function() {
					$this.element.hide();
				});

			this.element.fadeOut(500, function() {
				$this.element.hide();
			});
		},

		/**
		 * Show
		 */
		show : function(options) {

			// setup contents
			this._setupButtons(options.buttons);
			this.text.text(options.text);
			this.title.text(options.title);
			this.wrapper.attr("class", "wrapper " + options.type);

			// hide everything
			this.wrapper.css("opacity", 0);
			this.element.show();

			// animate to visibility
			this.wrapper
				.css({ top : "250px" })
				.animate(
					{
						top : "-=50px",
						opacity : 1
					}, 
					500, "swing"
				);

		}
	});

})(jQuery);