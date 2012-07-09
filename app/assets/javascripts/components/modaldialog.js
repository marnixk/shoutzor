(function($, undefined) {

	/**
	 * Modal dialog
	 */
	$.widget("shoutzor.modalDialog", {
		options : {
			s : {
				wrapper : ".wrapper",
				buttonrow : ".buttonrow",
				title : "h2 span",
				content : ".custom-content"
			}
		},


		/**
		 * Initialize data-members
		 */
		_create : function() {
			var $this = this;

			this.element = $(this.element);
			this.wrapper = this.element.find(this.options.s.wrapper);
			this.buttonrow = this.element.find(this.options.s.buttonrow);
			this.title = this.element.find(this.options.s.title);
			this.content = this.element.find(this.options.s.content);
			this.inside = false;

			this.wrapper.hover(
				function() {
					$this.inside = true;
				},
				function() {
					$this.inside = false;
				});

			this.element.click(function() {
				if (!$this.inside) {
					$this.close();
				}
			});
		},


		/**
		 * Add buttons to row
		 */
		_setupButtons : function(buttons) {
			this.buttonrow.find("button").remove();
			for (var label in buttons) {

				if (label.charAt(0) == '_') {
					continue;
				}

				var bClass = null;
				if (buttons._classes) {
					bClass = buttons._classes[label];
				}

				$("<button />")
					.text(label)
					.click(buttons[label])
					.toggleClass(bClass, bClass != null)
					.appendTo(this.buttonrow);
			}
		},	

		/**
		 * Close the modal dialog
		 */
		close : function(callback) {
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

				if (typeof(callback) === "function") {
					callback.apply($this, []);
				}
			});
		},

		/**
		 * Setup plain text
		 */
		_setupPlainText : function(text) {
			this.content.html("");

			// create label and put in container
			var t = $("<p />", { "class" : "text" });
			t.text(text);
			t.appendTo(this.content);
		},

		/**
		 * Show
		 */
		show : function(options) {

			// setup contents
			this._setupButtons(options.buttons);

			if (typeof(options.text) !== "undefined") {
				this._setupPlainText(options.text);
			}
			else if (typeof(options.content) !== "undefined") {

				// is a function? evaluate and put content in box
				if (typeof(options.content) === "function") {
					this.content.html(options.content());
				}
				else {
					this.content.html(options.content);
				}
			}

			this.title.text(options.title);
			this.element.css("visibility", "hidden");
			this.element.show();

			this.wrapper.attr("class", "wrapper " + options.type);

			// hide everything
			this.wrapper.css("opacity", 0);

			// middle
			var middle = 
				50 + 
				($(window).innerHeight() / 2.5) - 
				(this.wrapper.height() / 2);

			this.element.css("visibility", "visible");

			// animate to visibility
			this.wrapper
				.css({ top : middle + "px" })
				.stop(true, true)
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