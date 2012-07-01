/**
 * Handler
 */
(function($, undefined) {

	// for each remote form, make sure to reload them
	$("form[data-remote='true']").each(function() {
		var f = $(this);
		f.bind("ajax:success", function(evt, result) {
			var newForm = $(result).find("#" + f.attr("id"));
			f.replaceWith(newForm);
		});
	});

})(jQuery);