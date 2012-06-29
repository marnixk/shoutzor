(function($, undefined) {

	/**
	 * Base implementation for visual
	 */
	$.widget("shoutzor.visualBase", {

		/**
		 * Options
		 */
		options : {

			plugins : [],

			// grid properties
			blockSize : 24,
			blockMargin : 0,
			roundness : 0,

			maxWidth: 80,

			// random size
			randomSize : 1024,

			tint : function(x) {
				return {
					r : 0.1,
					g : 0.4,
					b : 0.6
				};

			}
		},

		/**
		 * Create the visual base
		 */
		_create : function() {
			var $this = this;
			$this.element = $(this.element);
			$this.r = 
				Raphael(
					$this.element.offset().left, $this.element.offset().top,
					$this.element.width(), $this.element.height()
				);

			$this.width = 2 + Math.ceil($this.element.width() / $this.options.blockSize);
			$this.height = 1 +  Math.ceil($this.element.height() / $this.options.blockSize);


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


			// 60fps = 16msec
			setInterval(function() { $this.draw(); }, 16);
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
						$this.r.rect(
							(-1 + x) * s + m, y * s + m,
							s - (m * 2), s - (m * 2),
							$this.options.roundness
						);

					block.attr("stroke", "none");
					block.attr("fill", "#222");

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

			var $this = this, 
				rSize = $this.options.randomSize,
				seed = Math.floor(Math.random() * rSize),
				diff = $this.width - $this.options.maxWidth,
				skipMargin = diff > 0 ? diff / 2 : 0;



			// process matrix
			var offset = 0, nextRow = 0;
			for (var y = 0; y < $this.height - 1; ++y) {
				
				nextRow = (y + 1) * $this.width;
				for (var x = 0; x < $this.width - 1; ++x) {

					if (x >= skipMargin && x <= $this.width - skipMargin) {

						var avg = 
							Math.floor(
								(0.6 + 0.2 * $this.random[seed % rSize]) * 
								0.33 * (
										$this.matrix[nextRow - 1] + 
										$this.matrix[nextRow] + 
										$this.matrix[nextRow + 1]
									)
							);


						$this.matrix[offset] = avg;
						$this.blocks[offset].attr("fill", $this.colors[avg]);
					}
					else {
						$this.blocks[offset].attr("fill", "#000");
					}

					++nextRow;
					++offset;
					++seed;
				}
				++offset;

			}

			// set new values for the bottom
			offset = ($this.height - 1) * $this.width;
			for (var x = 0; x < $this.width; ++x) {
				if (x >= skipMargin && x <= $this.width - skipMargin) {
					$this.matrix[offset] = 127 + Math.ceil($this.random[seed % rSize] * 128);
					$this.blocks[offset].attr("fill", $this.colors[$this.matrix[offset]]);
				}
				else {
					$this.blocks[offset].attr("fill", "#000");

				}
				++offset;
				++seed;
			}

		}

	});

})(jQuery);