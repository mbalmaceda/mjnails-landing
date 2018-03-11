(function($){

	/* ---------------------------------------------- /*
	 * Preloader
	/* ---------------------------------------------- */

	$(window).load(function() {
		$('#status').fadeOut();
		$('#preloader').delay(350).fadeOut('slow');
	});

	$(document).ready(function() {

		/* ---------------------------------------------- /*
		 * Animated scrolling / Scroll Up
		/* ---------------------------------------------- */

		$('a[href*=#]').bind("click", function(e){
			var anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top
			}, 1000);
			e.preventDefault();
		});

		$(window).scroll(function() {
			if ($(this).scrollTop() > 100) {
				$('.scroll-up').fadeIn();
			} else {
				$('.scroll-up').fadeOut();
			}
		});

		/* ---------------------------------------------- /*
		 * Navbar
		/* ---------------------------------------------- */

		$('.header').sticky({
			topSpacing: 0
		});

		$('body').scrollspy({
			target: '.navbar-custom',
			offset: 70
		})

		/* ---------------------------------------------- /*
		 * Background image.
		/* ---------------------------------------------- */
		$(".js-height-full").height($(window).height());
		$("#preloader-img").css('padding-top', ($(window).height()/3));

		$(window).resize(function(){
			$(".js-height-full").height($(window).height());
			$("#preloader-img").css('padding-top', $(window).height()/2);
		});

		$('#home').backstretch([
			'assets/images/home/home_1.png',
		], {duration: 3000, fade: 750});

		$('#home .intro div').addClass('wow fadeInUp');
		$('#home .intro div').attr('data-wow-delay', '1.5s');


		/* ---------------------------------------------- /*
		 * Initialize shuffle plugin
		/* ---------------------------------------------- */

		var $portfolioContainer = $('.porfolio-masonry');

		$('#filter li').on('click', function (e) {
			e.preventDefault();

			$('#filter li').removeClass('active');
			$(this).addClass('active');

			group = $(this).attr('data-group');
			var groupName = $(this).attr('data-group');

			$portfolioContainer.shuffle('shuffle', groupName );
		});

		$('.simple-ajax-popup').magnificPopup({
			type: 'ajax',
			callbacks: {
				parseAjax: function(mfpResponse) {
					$.getScript('assets/js/jquery.fitvids.js');
					$.getScript('assets/js/custom-portfolio.js');
				},
			}
		});

		/* ---------------------------------------------- /*
		 * WOW Animation When You Scroll
		/* ---------------------------------------------- */

		wow = new WOW({
			mobile: false
		});
		wow.init();

		/* ---------------------------------------------- /*
		 * A jQuery plugin for fluid width video embeds
		/* ---------------------------------------------- */

		$('body').fitVids();

		/* ---------------------------------------------- /*
		 * E-mail validation
		/* ---------------------------------------------- */

		function isValidEmailAddress(emailAddress) {
			var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
			return pattern.test(emailAddress);
		};

		/* ---------------------------------------------- /*
		 * Contact form ajax
		/* ---------------------------------------------- */

		$('#contact-form').submit(function(e) {
			e.preventDefault();

			var responseMessage = $('#ajax-response');

			$.ajax({
				type: 'POST',
				url: $(this).attr('action'),
				dataType: 'json',
				data: $(this).serialize() ,
				beforeSend: function(result) {
					$('#contact-form button').empty();
					$('#contact-form button').append('<i class="fa fa-cog fa-spin"></i> Espere...');
					responseMessage.empty();
					responseMessage.removeAttr('class')
				},
				success: function(data) {
					$('#contact-form button').empty();
					$('#contact-form button').append('Enviar');
					if (data.resultado == 1) {
						$('#contact-form').fadeOut(500);
						ajaxResponse('ajax-response','alert-success',data.mensaje);
					}else {
						ajaxResponse('ajax-response','alert-danger',data.mensaje);
					}
				},
				error: function (data) {
					$('#contact-form button').empty();
					$('#contact-form button').append('Enviar');
					var errors = data.responseJSON;
					var list = $('<ul></ul>');
		            $.each( errors, function( key, value ) {
		                list.append('<li>'+value[0]+'</li>');
		            });
		            ajaxResponse('ajax-response','alert-danger',list);
				}
			});
		});
	});
})(jQuery);
