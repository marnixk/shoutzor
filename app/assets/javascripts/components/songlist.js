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
		 * Retrieve items for a specific search
		 */
		retrieveItems : function(item, q) {
			var $this = this;

			// get parameters for request
			params = { query : q };
			if (item.by != "manual") {
				params.by = item.by;
			}

			// find search
			$.get("/list", params, function(result) {
				$this.update(result);
			}, "json");
		},

		/**
		 * Update the list
		 */
		update : function(list) {
			var tableBody = this.element.find("tbody");

			tableBody.find("tr").remove();

			$(list).each(function(i, item) {
				var row = $("<tr />");

				if (i % 2 == 0) {
					row.addClass("even");
				}
				else {
					row.addClass("odd");
				} 

				$("<td />").text(item.title).appendTo(row);
				$("<td />").text(item.album).appendTo(row);
				$("<td />").text(item.artist).appendTo(row);
				$("<td />").text(item.length).appendTo(row);

				var options = $("<td/>");
				var vote = $("<a />", { href : "/vote_for?tstamp=" + new Date().getTime() + "&id=" + item.id, "data-remote" : "true"}).text("vote");
				options.append(vote);

				row.append(options);

				tableBody.append(row);

			});
		}
	});

})(jQuery);