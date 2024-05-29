;(function () {
	
	'use strict';

	// $(function() {
	// 	console.log('lazy');
    //     $('.lazy').Lazy();
    // });

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax  
	var parallax = function() {
		$(window).stellar(); 
	}; 

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {
			
			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				i++;
				// console.log($(this.element));
				// $(this.element).hide();
				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}
			// if( direction === 'up'){
			// 	$(this).removeClass('animated-fast')
			// }

		} , { offset: '85%' } );
	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			// console.log($win.scrollTop());
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#FF9000',
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0 ) {
			$('#fh5co-skills').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}

	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	
	$(function(){
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		skillsWayPoint();
	});
}());

$('.content-holder .thumbnail').each(function (i) {
	var item = $('<div class="item"></div>');
	var itemDiv = $(this).parents('div');
	var title = $(this).parent('a').attr("title");

	item.attr("title", title);
	$(itemDiv.html()).appendTo(item);
	item.appendTo('.carousel-inner');
	if (i === 0) { // set first item active
		item.addClass('active');
	}
});

/* activate the carousel */
$('#modalCarousel').carousel({ interval: false });

/* change modal title when slide changes */
$('#modalCarousel').on('slid.bs.carousel', function () {
	$('.modal-title').html($(this).find('.active').attr("title"));
});

/* when clicking a thumbnail */
$('.row .img-item').click(function () {

	$('.modal-title').text($(this).find('h3').text());
	// console.log($(this).find('h3').text());
	let data = $(this).attr('data');
	data = data ? data.split('||') : [];
	console.log(data);
	let ele = '';
	let indicators = '';
	// <ol class="carousel-indicators">
	// 				<li data-target="#modalCarousel" data-slide-to="0" class="active"></li>
	// 				<li data-target="#modalCarousel" data-slide-to="1"></li>
	// 			</ol>
	$('.carousel-inner').html('');
	$('.carousel-indicators').html('');
	for (let i in data) {
		if (i == 0) {
			// set first item active
			ele += `<div class="item active">
			<img class="img-carousel" src="${data[i]}" alt="Image">
			</div>`;
			indicators += `<li data-target="#modalCarousel" data-slide-to="${i}" class="active"> 
			<img class="indi-img" src="${data[i]}">
			</li>`;
			// item.addClass('active');
		} else {
			ele += `<div class="item">
			<img class="img-carousel" src="${data[i]}" alt="Image">
			</div>`;
			indicators += `<li data-target="#modalCarousel" data-slide-to="${i}"><img class="indi-img" src="${data[i]}"></li>`;
		}

		$('.carousel-inner').html(ele);
		$('.carousel-indicators').html(indicators);

	}

	// console.log();
	// var idx = $(this).parents('div').index();
	// var id = parseInt(idx);
	$('#myModal').modal('show'); // show the modal
	// $('#modalCarousel').carousel(id); // slide carousel to selected
});