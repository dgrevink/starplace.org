/* ==========================================================================
   Document Ready
   ========================================================================== */

$(document).ready(function() {

	// Main variables
	windowHeight 		      = $(window).height();
    windowWidth 		      = $(window).width();

    // Video hero height
	$videoHero = $('#video-hero');
   	$videoHero.height(windowHeight);

    // Image hero height
	$imageHero = $('#image-hero');
   	$imageHero.height(windowHeight);

	// Welcome text for hero section
	repositionWelcome();

	// Scroll down arrow for hero
	repositionScrollDownArrow();

	// Widgets config
	widgetsConfig();

	var language = 'en'; // default
    if (!Cookies.get('language')) {
		var userLanguage = navigator.language || navigator.userLanguage;
		if ( (userLanguage != 'en') && (userLanguage != 'fr')) {
			userLanguage = language;
		}
		Cookies.set('language', userLanguage);
		window.location.href = '/' + language;
    }
    else {
    	language = Cookies.get('language');
    }

    $('a.work').click(function(){
    	$('#myModal .description').html($(this).data('content'));
    	$('#myModal .image').attr('src', $(this).data('image'));
		$("#myModal").mikesModal();
    });

});
