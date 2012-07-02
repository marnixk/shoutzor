(function($, undefined) {

	/**
	 * Extension for the default fuel plugin
	 */
	$.extend(window.Plugins, {

		/**
		 * Create a composite plugin object
		 */
		Composite : function(options) {
			for (var idx in Plugins.CompositeObject) {
				this[idx] = Plugins.CompositeObject[idx];
			}
			this._construct($.extend(this.defaults, options));
			return this;
		},

		/**
		 * Text scroller object implementation
		 */
		CompositeObject : { 

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

				$this.options = options;
				$this.mode = $this.options.mode || "sequential";
				$this.parts = $this.options.parts;
				this.activeIdx = 0;

				for (var idx in $this.parts) {
					var part = $this.parts[idx];
					part.done = function() {
						$this._next(this.current_visual, this.current_world);
					};
				}
			},

			/**
			 * Go to the next scene element
			 */
			_next : function() {
				this.activeIdx = (this.activeIdx + 1) % this.parts.length;

				if (this.parts[this.activeIdx].reset) {
					this.parts[this.activeIdx].reset(this.current_visual, this.current_world);
				}
			},

			/**
			 * Execute the scroller
			 */
			execute : function(visual, world) {

				// save state
				this.current_visual = visual;
				this.current_world = world;

				// run current plugin
				var activePart = this.parts[this.activeIdx];
				activePart.execute(visual, world);				
			}
		}

	});
})(jQuery);

