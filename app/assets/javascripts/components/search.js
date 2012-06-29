(function($, undefined) {

	/**
	 * Search widget
	 */
	$.widget("shoutzor.search", {

		/**
		 * Default options
		 */
		options : {
			onSearch : function(item, q) { console.log("Search for: " + q); }
		},

		/**
		 * Initialize data-members
		 */
		_create : function() {
			var $this = this;
			$this.element = $(this.element);
			$this.form = $this.element.closest("form");

			$this.element.autocomplete({
				source : "/search",
				minLength : 2,
				select : function(widget, item) {
					$this.searchFor(item.item);
				}
			})
			.data("autocomplete")._renderItem = function(ul, item) {
				$this._renderItem.apply($this, [ul, item]);
			};

			$this.form.submit(function() {
				$this.searchFor({ by : "manual", term : $this.element.val() });
				return false;
			});
		},

		/**
		 * Execute search query
		 */
		searchFor : function(item) {
			this.options.onSearch(item, item.term);
			return false;
		},

		/**
		 * Render the item
		 */
		_renderItem : function(ul, item) {
			if (item.type == "label") {
				ul.append(this._renderLabel(item));
			}
			else if (item.type == "term") {
				ul.append(this._renderTerm(item));
			}
		},

		/**
		 * Render the label
		 */
		_renderLabel : function(item) {
			var sep = $("<span />", { "class" : "separator"}).text(item.label);
			var li = $("<li />");
			li.append(sep);
			li.data( "item.autocomplete", item);
			return li;
		},

		/**
		 * Render the term
		 */
		_renderTerm : function(item) {
			var term = $("<a />", { "class" : "term", "href" : "#"}).text(item.term);
			var li = $("<li />");
			li.append(term);
			li.data( "item.autocomplete", item);
			return li;
		}
	});

})(jQuery);