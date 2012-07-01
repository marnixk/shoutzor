(function($, undefined) {

	window.Plugins = {};

	/**
	 * Base implementation for visual
	 */
	$.widget("shoutzor.visualBase", {

		/**
		 * Options
		 */
		options : {

			plugins : [],

			containerId : "effect",
			width : $("#visual").innerWidth(),
			height : $("#visual").innerHeight(),

			// scene properties
			fire: true,
			iterate: true,
			transparent : false,

			// grid properties
			blockSize : 8,
			blockMargin : 0,
			roundness : 0,

			// maximum dimensions in blocks
			maxWidth: 200,
			maxHeight: -1,

			// frame duration
			frameEveryMs : 25,
			drawEveryMs : 100,

			// random size
			randomSize : 1024,


			tint : function(x) {
				return {
					r : 0.1,
					g : 0.9,
					b : 0.4
				};
			}
		},

		/**
		 * Create the visual base
		 */
		_create : function() {
			var $this = this;
			$this.element = $(this.element);

			$this.element.attr({ 
					"width" : $this.options.width,
					"height" : $this.options.height
				});

			$this.canvas = document.getElementById($this.options.containerId).getContext("2d");

			$this.width = 2 + Math.ceil($this.element.width() / $this.options.blockSize);
			$this.height = 1 +  Math.ceil($this.element.height() / $this.options.blockSize);

			if ($this.options.maxHeight != -1 && $this.height > $this.options.maxHeight) {
				$this.height = $this.options.maxHeight;
			}

			$this.random = new Array($this.options.randomSize);
			for (var idx = 0; idx < $this.random.length; ++idx) {
				$this.random[idx] = Math.random();
			}

			// colors
			$this.colors = new Array(255);
			for (var idx = 0; idx < $this.colors.length; ++idx) {
				$this.colors[idx] = 
						Raphael.rgb(
							$this.options.tint(idx).r * 255 * (idx / 255), 
							$this.options.tint(idx).g * 255 * (idx / 255), 
							$this.options.tint(idx).b * 255 * (idx / 255)
						);
			}

			// matrix
			$this.matrix = new Array($this.width * $this.height);
			for (var idx = 0; idx < $this.matrix.length; ++idx) {
				$this.matrix[idx] = 0;
			}

			$this._generateBlocks();

			if (!$this.options.transparent) {
				$this.canvas.fillStyle = "black";
				$this.canvas.fillRect(0, 0, $this.options.width, $this.options.height);
			}


			// make sure animation stops when window loses focus
			$this.animating = true;
			$(window).blur(function() {
				$this.animating = false;
			});
			$(window).focus(function() {
				$this.animating = true;
			});

			$this.frameNumber = 0;

			// 60fps = 16msec
			setInterval(function() { $this.draw(); }, $this.options.drawEveryMs);
			setInterval(function() { if ($this.animating) { ++$this.frameNumber}  }, $this.options.frameEveryMs);
		},


		/**
		 * Generate blocks
		 */
		_generateBlocks : function() {

			var 
				$this = this,
				m = $this.options.blockMargin,
				s = $this.options.blockSize;

			// blocks
			$this.blocks = new Array($this.width * $this.height);
			for (var x = 0; x < $this.width; ++x) {
				for (var y = 0; y < $this.height; ++y) {

					var block = 
						{
							x: (-1 + x) * s + m, 
							y: y * s + m,
							w: s - (m * 2), 
							h: s - (m * 2)
						};

					$this.blocks[x + (y * $this.width)] = block;
				}
			}

		},

		/**	
		 * random orange color
		 */
		_color : function() {
			var factor = Math.random();
			return Raphael.rgb(255 * factor, 100 * factor, 0);
		},

		/**
		 * Draw the matrix
		 */
		draw : function() {
			var $this = this;

			if (!$this.animating) {
				return;
			}


			var diff = $this.width - $this.options.maxWidth;

			var baton = {
					rSize : $this.options.randomSize,
					seed : Math.floor(Math.random() * $this.options.randomSize),
					skipMargin : diff > 0 ? diff / 2 : 0
				};

			$this._iterateMatrix(baton);

			for (var idx in $this.options.plugins) {
				$this.options.plugins[idx].execute(
							$this, {
								baton : baton,
								frame : $this.frameNumber
							}
						);
			}


		},

		/**
		 * Do the next step in the matrix calculations
		 */
		_iterateMatrix : function(baton) {
			var $this = this;

			// process matrix
			var offset = 0, 
				nextRow = 0;

			for (var y = 0; y < $this.height - 1; ++y) {
				
				nextRow = (y + 1) * $this.width;
				for (var x = 0; x < $this.width - 1; ++x) {

					if (x >= baton.skipMargin && x <= $this.width - baton.skipMargin) {

						var avg = 
							Math.floor(
								(0.8 + 0.2 * $this.random[baton.seed % baton.rSize]) * 
								0.33 * (
										$this.matrix[nextRow - 1] + 
										$this.matrix[nextRow] + 
										$this.matrix[nextRow + 1]
									)
							);


						$this.matrix[offset] = avg;

						var b = $this.blocks[offset];
						$this.canvas.fillStyle = $this.colors[$this.matrix[offset]];
						$this.canvas.fillRect(b.x, b.y, b.w, b.h);
					}


					++nextRow;
					++offset;
					++baton.seed;
				}
				++offset;
			}
		},

	});

})(jQuery);