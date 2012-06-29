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
			blockSize : 32,
			blockMargin : 1,

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

			$this.width = Math.ceil($this.element.width() / $this.options.blockSize);
			$this.height = Math.ceil($this.element.height() / $this.options.blockSize);

			// colors
			$this.colors = new Array(255);
			for (var idx = 0; idx < $this.colors.length; ++idx) {
				$this.colors[idx] = Raphael.rgb(255 * (idx / 255), 100 * (idx / 255), 0);
			}

			// matrix
			$this.matrix = new Array($this.width * $this.height);
			for (var idx = 0; idx < $this.matrix.length; ++idx) {
				$this.matrix[idx] = 0;
			}

			$this._generateBlocks();
			$this.draw();
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
							x * s + m, y * s + m,
							s - (m * 2), s - (m * 2),
							2
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
			var $this = this;

			// // process matrix
			var offset = 0;
			for (var y = 0; y < $this.height - 1; ++y) {
				var nextRow = (y + 1) * $this.width + 1;
				for (var x = 0; x < $this.width; ++x) {


					var avg = 
						Math.floor(
							0.7 * 
							0.33 * (
									$this.matrix[nextRow - 1] + 
									$this.matrix[nextRow] + 
									$this.matrix[nextRow + 1]
								)
						);

					$this.matrix[offset] = avg;
					$this.blocks[offset].attr("fill", $this.colors[avg]);

					++nextRow;
					++offset;
				}

			}

			// set new values for the bottom
			offset = ($this.height - 1) * $this.width;
			for (var x = 0; x < $this.width; ++x) {
				$this.matrix[offset] = 127 + Math.ceil(Math.random() * 128);
				$this.blocks[offset].attr("fill", $this.colors[$this.matrix[offset]]);
				++offset;
			}

			setTimeout(function() { $this.draw(); }, 10);
		}

	});

})(jQuery);