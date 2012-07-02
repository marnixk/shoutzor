(function($, undefined) {

	if ($("body").hasClass("searchpage")) {
		Pages.SearchPage();
	}

	// login page
	if ($("body").hasClass("loginpage")) {
		Pages.LoginPage();
	}

	
})(jQuery);

