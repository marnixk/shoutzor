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
				var $this = this;

				$this.banner = new TextBanner({});
				$this.text = options.text;

				$this.nLines = 1;
				for (var idx = 0; idx < $this.text.length; ++idx) {
					if ($this.text[idx] == "\n") {
						++$this.nLines;
					}
				}

				this.reset();
			},

			/**
			 * Reset the scroller object
			 */
			reset : function(visual, world) {
				this.startFrame = world? world.frame : 0;
			},

			/**
			 * Execute the scroller
			 */
			execute : function(visual, world) {
				var 
					deltaFrame = world.frame - this.startFrame,
					startY = visual.height - Math.floor(deltaFrame * 0.3),
					showY = startY;

				if (startY < 4) {
					showY = 4;
				}

				this.banner.printString(
					visual.matrix, 
					Math.floor((visual.width / 2) - 65),
					showY,
					visual.width, 
					visual.height, 
					this.text
				);


				if (startY < -this.nLines * 16 && this.done) {
					this.done();
				}
			}
		}

	});
})(jQuery);























































					// 'welcome to _\nCLASS \'12\n\n\n' +
					// 'upload files to _\n \\\\shoutzor.com\n\n' +
					// 'now playing _\n' + 'Queen -\nWho wants to\nlive forever'
