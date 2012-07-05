(function($, undefined) {

	var Effects = {

		/**
		 * Wait for a number of seconds
		 */
		wait : function(context) {
			var eStart = context.effectStartFrame;

			// save to next frame
			context.x = context.previous.x;
			context.y = context.previous.y;

			if ((context.world.frame - context.plugin.effectStartFrame) > context.effect.delay) {
				return true;
			}
			return false;
		},

		/**
		 * Scroll all the way through the fire, from bottom to top until it's no longer visbiel
		 */
		top : function(context) {
			var 
				deltaFrame = context.world.frame - context.plugin.effectStartFrame,
				startY = context.visual.height - Math.floor(deltaFrame * 0.5),
				showY = startY;

			if (startY < 4) {
				showY = 4;
			}

			context.x = Math.floor((context.visual.width / 2) - 65);
			context.y = showY;

			if (startY < 0) {
				return true;
			}

			return false;
		}

	};


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
				effects : [ ['up'] ]
			},

			/**
			 * Construct the scroller
			 */
			_construct : function(options) {
				var $this = this;

				$this.banner = new TextBanner({});
				$this.text = options.text;
				$this.effects = options.effects;
				$this.effectIdx = 0;
				$this.effectStartFrame = 0;

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
			 * Move to the next effect, or call done when it was the last one
			 */
			_nextEffect : function() {
				++this.effectIdx;
				this.effectStartFrame = this.startFrame;
				
				if (this.effectIdx >= this.effects.length && this.done) {
					this.done();
				}
			},

			/**
			 * Execute the scroller
			 */
			execute : function(visual, world) {

				var 
					currentEffect = this.effects[this.effectIdx],
					effectInstance = Effects[currentEffect[0]],
					context = { 
						"effect" : currentEffect[1], 
						"visual" : visual, 
						"world" : world, 
						"plugin" : this,
						"previous" : this.oldContext
					};

				this.oldContext = context;

				var result = effectInstance.apply(this, [context]);
				if (result) { 
					this._nextEffect();
				}

				this.banner.printString(
					visual.matrix,
					context.x,
					context.y,
					visual.width,
					visual.height,
					typeof(context.text) === "undefined" ? this.text : context.text
				)

				// var 
				// 	deltaFrame = world.frame - this.startFrame,
				// 	startY = visual.height - Math.floor(deltaFrame * 0.5),
				// 	showY = startY;

				// if (startY < 4) {
				// 	showY = 4;
				// }

				// this.banner.printString(
				// 	visual.matrix, 
				// 	Math.floor((visual.width / 2) - 65),
				// 	showY,
				// 	visual.width, 
				// 	visual.height, 
				// 	this.text
				// );


				// if (startY < -this.nLines * 16 && this.done) {
				// 	this.done();
				// }
			}
		}

	});
})(jQuery);

