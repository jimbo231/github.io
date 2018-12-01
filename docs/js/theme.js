/*!
 *
 * Sell theme v1.0.0
 * Copyright 2018 - Bootstrapious.com
 * 
 */

//function being able to drag an image or div

$(document).ready(function() {
    // your code here
 
// Javascript for snipcart here: ##################################

// $('#nt2').change(function() {
//     $('#my-button').data('item-description', $('#current_price_text').val());
//     alert("You entered p1!" + current_price);
// });



//End Snipcart code ###############################################


// What you need to is be able to store what object is 'dragme'
// e.g. if class = two selected then i = dragme_1 etc - you get the idea
// then you can get multiple items to drag and drop

// on mouse down on the object run this function
$('.can_be_dragged').mousedown(function(){


// cannot have it as a varible because I think it makes an arrary which
// means that every .can_be_dragged id is stored in the can_be_dragged place = can_be_dragged location
now_id = $(this).attr('id');



    
function drag_start(event) {
    var style = window.getComputedStyle(event.target, null);
    event.dataTransfer.setData("text/plain",
    (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));

} 
function drag_over(event) { 
    event.preventDefault(); 
    return false; 
} 
function drop(event) {
    var offset = event.dataTransfer.getData("text/plain").split(',');
    var dm = document.getElementById(now_id);
    // checking if it is within the specified boundries - will have to do this for name_tags seperately
    if (event.clientX + parseInt(offset[0],10) < -83) {
        tempAlert("Please keep object inside the passport area",3000);
        return false;
    }
    else if (event.clientX + parseInt(offset[0],10) > 430) {
        tempAlert("Please keep object inside the passport area",3000);
        return false;
    }
    else {   
    dm.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
    dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
    event.preventDefault();
    return false;
    }

    function tempAlert(msg,duration) {
                 var el = document.createElement("div");
                 el.setAttribute("style","position:absolute; top:70%; left:0%; text-align: center; opacity: 0.7;  padding: 1rem; width: 100%; height:auto;margin-bottom: 1.5rem;background: #909fa0;z-index:20;font-size: 3.15rem;font-weight: 700;");
                 el.innerHTML = msg;
                 setTimeout(function(){
                  el.parentNode.removeChild(el);
                 },duration);
                 document.body.appendChild(el);
        }

} 
var dm = document.getElementById(now_id); 
dm.addEventListener('dragstart',drag_start,false); 
document.body.addEventListener('dragover',drag_over,false); 
document.body.addEventListener('drop',drop,false); 


});




        


});





$(function () {



    function tempAlert(msg,duration) {
                 var el = document.createElement("div");
                 el.setAttribute("style","position:absolute;top:40%;left:20%;background-color:white;z-index:20;");
                 el.innerHTML = msg;
                 setTimeout(function(){
                  el.parentNode.removeChild(el);
                 },duration);
                 document.body.appendChild(el);
        }

    // ------------------------------------------------------- //
    //   Multilevel dropdowns
    // ------------------------------------------------------ //

    $(".dropdown-menu [data-toggle='dropdown']").on("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        $(this).siblings().toggleClass("show");


        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }
        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
            $('.dropdown-submenu .show').removeClass("show");
        });

    });

    // ------------------------------------------------------- //
    //   Transparent navbar dropdowns 
    //
    //   = do not make navbar 
    //   transparent if dropdown's still open 
    //   / make transparent again when dropdown's closed
    // ------------------------------------------------------ //

    var navbar = $('.navbar'),
        navbarCollapse = $('.navbar-collapse');

    $('.navbar.bg-transparent .dropdown').on('show.bs.dropdown', function () {
        makeNavbarWhite();
    });

    $('.navbar.bg-transparent .dropdown').on('hide.bs.dropdown', function () {
        // if we're not on mobile, make navbar transparent 
        // after we close the dropdown

        if (!navbarCollapse.hasClass('show')) {
            makeNavbarTransparent();
        }
    });

    $('.navbar.bg-transparent .navbar-collapse').on('show.bs.collapse', function () {
        makeNavbarWhite();
    });


    $('.navbar.bg-transparent .navbar-collapse').on('hide.bs.collapse', function () {
        makeNavbarTransparent();
    });

    function makeNavbarWhite() {
        navbar.addClass('bg-white');
        navbar.addClass('navbar-light');
        navbar.addClass('was-transparent');

        navbar.removeClass('bg-transparent');
        navbar.removeClass('navbar-dark');
    }

    function makeNavbarTransparent() {
        navbar.removeClass('bg-white');
        navbar.removeClass('navbar-light');
        navbar.removeClass('was-transparent');

        navbar.addClass('bg-transparent');
        navbar.addClass('navbar-dark');
    }


    // ------------------------------------------------------- //
    //   Open & Close Search Panel
    // ------------------------------------------------------ //
    $('[data-toggle="search"]').on('click', function () {
        $('.search-area-wrapper').show();
    });

    $('.search-area-wrapper .close-btn').on('click', function () {
        $('.search-area-wrapper').hide();
    });

    // ------------------------------------------------------- //
    //   Ekko Lightbox
    // ------------------------------------------------------ //

    $(document).on('click', '[data-toggle="lightbox"]', function (event) {
        event.preventDefault();
        $(this).ekkoLightbox({
            alwaysShowClose: true,
            leftArrow: '<span><img src="img/prev.svg" class="nav-arrow nav-arrow-left" alt="" width="50"></span>',
            rightArrow: '<span><img src="img/next.svg" class="nav-arrow nav-arrow-right" alt="" width="50"></span>'
        });
    });



    // ------------------------------------------------------- //
    //   Make a sticky navbar on scrolling
    // ------------------------------------------------------ //
    $(window).scroll(function () {

        function makeItFixed(x) {

            var body = $('body'),
                navbar = $('nav.navbar-sticky'),
                header = $('.header');

            if ($(window).scrollTop() >= x) {
                navbar.addClass('fixed-top');
                if (!header.hasClass('header-absolute')) {
                    body.css('padding-top', navbar.outerHeight());
                    body.data('smooth-scroll-offset', navbar.outerHeight());
                }
            } else {
                navbar.removeClass('fixed-top');
                body.css('padding-top', '0');
            }
        }

        // when we scroll past .top-bar, affix the navbar
        makeItFixed($('.top-bar').outerHeight());
    });


    // ------------------------------------------------------- //
    //   Increase/Decrease product amount
    // ------------------------------------------------------ //
    $('.btn-items-decrease').on('click', function () {
        var input = $(this).siblings('.input-items');
        if (parseInt(input.val(), 10) >= 1) {
            input.val(parseInt(input.val(), 10) - 1);
        }
    });

    $('.btn-items-increase').on('click', function () {
        var input = $(this).siblings('.input-items');
        input.val(parseInt(input.val(), 10) + 1);
    });

    // ------------------------------------------------------- //
    //   Scroll to top button
    // ------------------------------------------------------ //

    $(window).on('scroll', function () {
        if ($(window).scrollTop() >= 1500) {
            $('#scrollTop').fadeIn();
        } else {
            $('#scrollTop').fadeOut();
        }
    });


    $('#scrollTop').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

    // ------------------------------------------------------- //
    //    Colour form control 
    // ------------------------------------------------------ //

    // need to change this so the old one comes off when one is clicked
    

    $('.btn-colour').on('click', function (e) {
        var button = $(this);
            
        //finds btn-colour and removes active for all of them     
        button.parents('.colours-wrapper').find('.btn-colour').removeClass('active');
        //then makes active the one that is clicked
        button.toggleClass('active');

    });

    // ------------------------------------------------------- //
    //  Button-style form labels used in detail.html
    // ------------------------------------------------------ //

    $('.detail-option-btn-label').on('click', function () {
        var button = $(this);

        button.parents('.detail-option').find('.detail-option-btn-label').removeClass('active');

        button.toggleClass('active');
    });


    // ------------------------------------------------------- //
    //   Home Slider
    // ------------------------------------------------------ //
    var homeSlider = $('.home-slider');
    homeSlider.owlCarousel({
        loop: true,
        margin: 0,
        smartSpeed: 500,
        responsiveClass: true,
        navText: ['<img src="img/prev.svg" alt="" width="50">', '<img src="img/next.svg" alt="" width="50">'],
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: true
            },
            600: {
                items: 1,
                nav: false,
                dots: true
            },
            1120: {
                items: 1,
                dots: false,
                nav: true
            }
        },
        onRefresh: function () {
            homeSlider.find('.item').height('');
        },
        onRefreshed: function () {
            var maxHeight = 0;
            var items = homeSlider.find('.item');
            items.each(function () {
                var itemHeight = $(this).height();
                if (itemHeight > maxHeight) {
                    maxHeight = itemHeight;
                }
            });
            items.height(maxHeight);
        }
    });

    // ------------------------------------------------------- //
    //   Home Full Slider
    // ------------------------------------------------------ //

    var homeFullSlider = $('.home-full-slider');
    homeFullSlider.owlCarousel({
        loop: true,
        margin: 0,
        smartSpeed: 500,
        responsiveClass: true,
        navText: ['<img src="img/prev.svg" alt="" width="50">', '<img src="img/next.svg" alt="" width="50">'],
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: true
            },
            600: {
                items: 1,
                nav: false,
                dots: true
            },
            1120: {
                items: 1,
                dots: false,
                nav: true
            }
        },
        onRefresh: function () {
            homeFullSlider.find('.item').height('');
        },
        onRefreshed: function () {
            var maxHeight = 0;
            var items = homeFullSlider.find('.item');
            items.each(function () {
                var itemHeight = $(this).height();
                if (itemHeight > maxHeight) {
                    maxHeight = itemHeight;
                }
            });
            items.height(maxHeight);
        }
    });

    // ------------------------------------------------------- //
    //   Home Slider
    // ------------------------------------------------------- //

    var homeSlider = $('.home-slider');
    homeSlider.owlCarousel({
        loop: true,
        margin: 0,
        smartSpeed: 500,
        responsiveClass: true,
        navText: ['<img src="img/prev.svg" alt="" width="50">', '<img src="img/next.svg" alt="" width="50">'],
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: true
            },
            600: {
                items: 1,
                nav: false,
                dots: true
            },
            1120: {
                items: 1,
                dots: false,
                nav: true
            }
        }
    });


    // ------------------------------------------------------- //
    //   Product Slider
    // ------------------------------------------------------ //
    $('.product-slider').owlCarousel({
        loop: false,
        margin: 0,
        nav: false,
        dots: true,
        navText: ['<img src="img/prev.svg" alt="" width="50">', '<img src="img/next.svg" alt="" width="50">'],
        smartSpeed: 400,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 5
            }
        }
    });

    // ------------------------------------------------------- //
    // Detail Carousel with thumbs
    // ------------------------------------------------------ //
    $('.detail-slider').owlCarousel({
        loop: true,
        items: 1,
        thumbs: true,
        thumbsPrerendered: true,
        dots: false,
        responsiveClass: false
    });


    // ------------------------------------------------------- //
    // Detail Full Carousel
    // ------------------------------------------------------ //
    $('.detail-full').owlCarousel({
        loop: true,
        items: 1,
        dots: true,
        responsiveClass: false
    });

    // ------------------------------------------------------- //
    // Brands Slider
    // ------------------------------------------------------ -//

    var brandsSlider = $('.brands-slider');
    brandsSlider.owlCarousel({
        loop: true,
        margin: 20,
        dots: true,
        nav: false,
        smartSpeed: 400,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 6,
                loop: false
            }
        },
        onRefresh: function () {
            brandsSlider.find('.item').height('');
        },
        onRefreshed: function () {
            var maxHeight = 0;
            var items = brandsSlider.find('.item');
            items.each(function () {
                var itemHeight = $(this).height();
                if (itemHeight > maxHeight) {
                    maxHeight = itemHeight;
                }
            });
            items.height(maxHeight);
        }
    });

    // ------------------------------------------------------- //
    //   Bootstrap tooltips
    // ------------------------------------------------------- //

    $('[data-toggle="tooltip"]').tooltip();

    // ------------------------------------------------------- //
    //   Smooth Scroll
    // ------------------------------------------------------- //

    var smoothScroll = new SmoothScroll('a[data-smooth-scroll]', {
        offset: 80
    });


    // ------------------------------------------------------- //
    // Google Maps
    // ------------------------------------------------------ //
    if ($('#map').length > 0) {


        function initMap() {

            var location = new google.maps.LatLng(50.0875726, 14.4189987);

            var mapCanvas = document.getElementById('map');
            var mapOptions = {
                center: location,
                zoom: 16,
                panControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var map = new google.maps.Map(mapCanvas, mapOptions);

            var markerImage = 'img/marker.png';

            var marker = new google.maps.Marker({
                position: location,
                map: map,
                icon: markerImage
            });

            var contentString = '<div class="info-window">' +
                '<h3>Info Window Content</h3>' +
                '<div class="info-content">' +
                '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>' +
                '</div>' +
                '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 400
            });

            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });

            var styles = [{
                "featureType": "landscape",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 0
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 51
                }, {
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.highway",
                "stylers": [{
                    "saturation": -100
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.arterial",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 10
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "road.local",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 40
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "transit",
                "stylers": [{
                    "saturation": -100
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "administrative.province",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "lightness": -25
                }, {
                    "saturation": -100
                }]
            }, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#ffff00"
                }, {
                    "lightness": -15
                }, {
                    "saturation": -97
                }]
            }];

            map.set('styles', styles);


        }

        google.maps.event.addDomListener(window, 'load', initMap);


    }

});

// ------------------------------------------------------ //
// For demo purposes, can be deleted
// ------------------------------------------------------ //

var stylesheet = $('link#theme-stylesheet');
$("<link id='new-stylesheet' rel='stylesheet'>").insertAfter(stylesheet);
var alternateColour = $('link#new-stylesheet');

if ($.cookie("theme_csspath")) {
    alternateColour.attr("href", $.cookie("theme_csspath"));
}

$("#colour").change(function () {

    if ($(this).val() !== '') {

        var theme_csspath = 'css/style.' + $(this).val() + '.css';

        alternateColour.attr("href", theme_csspath);

        $.cookie("theme_csspath", theme_csspath, {
            expires: 365,
            path: document.URL.substr(0, document.URL.lastIndexOf('/'))
        });

    }

    return false;
});