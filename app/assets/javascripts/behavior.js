(function($, undefined) {

	$("#songlist").songList();
	$("#status").playerStatus();

	$("#comingup").comingUp({ 
		container : "#comingUpContainer"
	});

	$("#effect").visualBase({
		plugins : [
			new Plugins.TextScroller({
				instructions : [
					// introduction text
					{
						text : "welcome to _\nCLASS '12!",
						effects : [ 
							['up'], ['wait', {delay: 3000}], ['hide']
						]
					},

					// where to upload to
					{
						text : "upload files to _\n\\\\shoutzor.com",
						effects : [ 
							['up'], ['wait', {delay: 1500}], ['hide']
						]
					},

					{
						type : 'pattern',
						pattern : [],
						effects : [ ['pulsate'] ]
					},

					// when: at end of song
					// show: coming up next
					{
						when : function() { return false; /* at end of current song */ },
						text : function() { return 'coming up next: NextSong'; },
						effects : [ ['left'] ]
					}
				]
			})
		]
	});
	
	$("#searchbox").search({
		onSearch : function(item, q) {
			$("#songlist").data("songList").retrieveItems(item, q);
		}
	});
})(jQuery);