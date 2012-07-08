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
			$this.title = $this.element.find("span.title");

			// wait for ajax success
			$this.element.find("table tr").live("click", function(event, result) {
				if (!$(this).hasClass("no-focus")) {
					$this._doVoteRequest($(this));
				}
			});
		},


		/**
		 * Try to vote
		 */
		_doVoteRequest : function(row) {
			var $this = this;
			var url = row.data("vote-url");

			$("#modal_dialog").data("modalDialog").show({
				"title" : "Are you sure?",
				"content" : "<p class='text'>Are you sure you want to vote for this song?<br/><br/>After you have, you won't be able to vote for a while!</p>",
				"type" : "normal",
				"buttons" : {

					"no" : function() {
						$("#modal_dialog").data("modalDialog").close();
					},

					"Yes!" : function() {
						$("#modal_dialog").data("modalDialog").close();

						setTimeout(function() {

							$.get(
								url, { tstamp : new Date().getTime() },
								function(result) {
									$this._showResult(result);
								},
								"json"
							);
						}, 250);
						
					},

					"_classes" : { 
						"Yes!" : "ok-button",
						"no" : "cancel-button"
					}

				}
			});

		},

		/**
		 * Show the result
		 */
		_showResult : function(result) {
			var $this = this;
			if (result.status == "done") {
				$this._showDialog("Voted!", "You have voted! Check the playlist to see when your song will play!");
			}
			else if (result.status == "played_recently") {
				$this._showDialog("It's really not that great.", "This song has been played recently, please pick another. Check the history when it was last played. A song can be played once an hour!", true)
			}
			else if (result.status == "already_in_playlist") {
				$this._showDialog("It's really not that great.", "The song is already in the playlist, please pick something else.");
			}
			else if (result.status == "too_soon") {
				$this._showDialog("Greedy!", "Too soon, wait " + $this._toMinutes(result.wait_for) + " seconds!", true);
			}
			else if (result.status == "incomplete") {
				$this._showDialog("Don't tempt me boy.", "Stop yer tampering", true);
			}
			else {
				$this._showDialog("WTfz?!", "R44r.", true);
			}
		},

		/**
		 * Make minute notation out of seconds 
		 */
		_toMinutes : function(secs) {
			if (secs > 60) {
				return "0" + Math.floor(secs / 60) + ":" + ((secs % 60) < 10? '0' : '') + (secs % 60);
			}
			return secs;
		},

		_showDialog : function(title, text, is_error) {
			$("#modal_dialog").data("modalDialog").show({
					"title" : title,
					"text" : text,
					"type" : is_error ? "error" : "normal",
					"buttons" : {
						"done" : function() {
							$("#modal_dialog").data("modalDialog").close();
						}
					}
				});
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
		update : function(results) {

			var list = results.songs;
			var tableBody = this.element.find("tbody");

			tableBody.find("tr").remove();

			this.title.text(results.title);

			$(list).each(function(i, item) {
				var row = $("<tr />");

				if (i % 2 == 0) {
					row.addClass("even");
				}
				else {
					row.addClass("odd");
				} 

				row.attr("data-vote-url", "/vote_for?tstamp=" + new Date().getTime() + "&id=" + item.id);

				$("<td />", { "class" : "title"}).text(item.title).appendTo(row);
				$("<td />").text(item.album).appendTo(row);
				$("<td />").text(item.artist).appendTo(row);
				$("<td />", { "class" : "tracklength"} ).text(item.length).appendTo(row);

				if (typeof(item.id) === "undefined") {
					row.addClass("no-focus");
				}

				tableBody.append(row);

			});
		}
	});

})(jQuery);