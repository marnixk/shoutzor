(function($, undefined) {

	$("#songlist").songList();
	$("#status").playerStatus();

	$("#comingup").comingUp({ 
		container : "#comingUpContainer"
	});

	$("#effect").visualBase();
	
	$("#searchbox").search({
		onSearch : function(item, q) {
			$("#songlist").data("songList").retrieveItems(item, q);
		}
	});
})(jQuery);