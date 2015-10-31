/* ==========================================================================
   Avoid `console` errors in browsers that lack a console.
   ========================================================================== */

(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/* ==========================================================================
   Window On Load
   ========================================================================== */

$(window).load(function() {

	// Main variables
	var windowHeight, windowWidth, welcomeTop;
	var $videoHero, $imageHero, $welcome, $scrollDownArrow;

	// Mute video background
	var $videoBackground 	  = document.getElementById('video_background');
	if($videoBackground != undefined) {
		$videoBackground.muted	= "muted";
	}

})

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

/* ==========================================================================
   Window Resize
   ========================================================================== */

$(window).resize(function() {

	// Window size variables update
	windowHeight	= $(window).height();
	windowWidth 	= $(window).width();

	// Video and Image hero height update
	$videoHero.height(windowHeight);
	$imageHero.height(windowHeight);

	// Welcome text for hero section
	repositionWelcome();

	// Scroll down arrow for hero
	repositionScrollDownArrow();

})
/* ==========================================================================
   Widgets Config
   ========================================================================== */

var widgetsConfig = function() {

	// Hide header on scroll
	navbar = $('.navbar');
	navbar.hideNavbarOnScroll({
		'deltaBeforeHide' : 5,
		'hideSpeed'       : 0.4,
	});

	// Skrollr init
	if (matchMedia('(min-width: 1140px)').matches) {
		skrollr.init( {
			forceHeight: false
		});
	}

	// Tooltips
	var $allTooltips = $('[rel=tooltip]');
	$allTooltips.tooltip({placement: 'top'}).css('z-index', 2080);

}

var repositionWelcome = function() {

	// Welcome text for hero
	$welcome 	= $('.welcome');
	welcomeTop  = ((windowHeight/2) - ($welcome.height()/2) - 100) + "px";
	$welcome.css({ position : 'absolute', top : welcomeTop });

}

var repositionScrollDownArrow = function() {

	// Scroll down arrow for hero
	$scrollDownArrow 	= $('.hero-scroll-down-arrow');
	scrollDownArrowTop  = windowHeight - ($scrollDownArrow.height()*2) + "px";
	$scrollDownArrow.css({ position : 'relative', top : scrollDownArrowTop });
}


/* ==========================================================================
   Google Maps API Configuration.
   ========================================================================== */

var latLng;
var domMap;
var marker;

function initialize() {

    latLng = new google.maps.LatLng(contactLatitude, contactLongitude);

    var mapOptions = {
        zoom: 15,
        center: latLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        draggable: true
    };

    domMap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var infoWindowTemplate = '<div style="padding: 30px 30px;"><p style="line-height: 20px;"><strong>' +  markerTitle + '</strong></p><p>' + markerAddress + '</p></div>';

    var infowindow = new google.maps.InfoWindow({
        content: infoWindowTemplate
    });

    marker = new google.maps.Marker({
        position: latLng,
        map: domMap,
        title: 'Dropped Marker'
    });

    infowindow.open(domMap, marker);

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(domMap, marker);
    });
}

google.maps.event.addDomListener(window, 'load', initialize);