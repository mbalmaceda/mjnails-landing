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

		var d = new Date();
		d.setDate(d.getDate() - 1);

		$('#dia').datepicker({
		    format: 'dd-mm-yyyy',
		    language : 'es',
		    weekStart : 1,
		    autoclose : true,
		    todayBtn : true,
		    daysOfWeekDisabled : [0,6],
		    startDate : d,
		    keyboardNavigation : false
		});

		$('#calendarForm').on('click', function() {
			$('#dia').datepicker('show');
		});

		//$('#dia').datepicker('setStartDate', formatedDate);



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


		/* ---------------------------------------------- /*
		 * WOW Animation When You Scroll
		/* ---------------------------------------------- */

		wow = new WOW({
			mobile: false
		});
		wow.init();

		$("#contact-form").validate({
		    rules: {
		      nombre: "required",		
		      email: {
		        required: true,
		        email: true
		      },
		      telefono: {
		      	required : true,
		      	minlength: 9,
		      	number: true
		      },
		      servicio: "required",
		      fecha: "required",
		      hora: "required",
		      mensaje: "required"
		    },
		    // Specify validation error messages
		    messages: {
		      //asunto: "¿En qué te podemos ayudar hoy?",
		      nombre: "Nos interesa saber tu nombre!",
		      email: {
		      	required : "Nos interesa tu email",
		      	email : "El formato del email no es correcto"
		      },
		      telefono: {
		        required: "Debes ingresar los 9 digitos de tu numero telefónico. Ej: 912345678",
		        minlength: "Necesitamos al menos {0} digitos para poder contactarnos!. Ej: 912345678",
		        number : "Debes ingresar un numero válido"
		      },
		      servicio: "Queremos saber lo que tus uñas necesitan!",
		      fecha: "",
		      hora: "",
		      mensaje: "Nos interesa tu opinión, escríbenos algo!"
		    },
		    // Make sure the form is submitted to the destination defined
		    // in the "action" attribute of the form when valid
		    submitHandler: function(form) {
		      	var responseMessage = $('#ajax-response');

				$.ajax({
					type: 'POST',
					url: $(form).attr('action'),
					dataType: 'json',
					data: $(form).serialize() ,
					beforeSend: function(result) {
						$.LoadingOverlay("show");
						responseMessage.empty();
						responseMessage.removeAttr('class');
					},
					success: function(data) {
						$.LoadingOverlay("hide");
						if (data == 1) {
							$('#contact-form').fadeOut(500);
							ajaxResponse('ajax-response','¡Gracias por contactarnos!, Por favor espera nuestro correo de confirmación de la hora');
							swal({
							  title: '¡Gracias por contactarnos!',
							  text: 'Por favor espera nuestro correo de confirmación de la hora',
							  type: 'success',
							  confirmButtonText: 'Aceptar'
							})
						}else {
							ajaxResponse('ajax-response','alert-danger','Ha ocurrido un error al enviar el mensaje, favor intentar nuevamente.');
							swal({
							  title: 'Ha ocurrido un error',
							  text: 'Por favor intentalo nuevamente',
							  type: 'error',
							  confirmButtonText: 'Aceptar'
							})
						}
					},
					error: function (data) {
						$('#contact-form button').empty();
						$('#contact-form button').append('Enviar');
						ajaxResponse('ajax-response','alert-danger','<p>'+data.responseText+'</p>');
			           	swal({
							  title: 'Ha ocurrido un error',
							  text: 'Por favor intentalo nuevamente',
							  type: 'error',
							  confirmButtonText: 'Aceptar'
							})
					}
				});
		    },
	    	errorElement: "em",
			errorPlacement: function ( error, element ) {
				// Add the `help-block` class to the error element
				error.addClass( "help-block" );

				// Add `has-feedback` class to the parent div.form-group
				// in order to add icons to inputs
				element.parents( ".form-group" ).addClass( "has-feedback" );

				if ( element.prop( "type" ) === "radio" ) {	
					//esto no funca				
					//error.insertAfter(document.getElementById("radioAsunto"));
				} else {
					error.insertAfter( element );
				}

				// Add the span element, if doesn't exists, and apply the icon classes to it.
				if ( !element.next( "span" )[ 0 ] && element.prop( "type" ) != "radio") {
					$( "<span class='glyphicon glyphicon-remove form-control-feedback'></span>" ).insertAfter( element );
				}
			},
			success: function ( label, element ) {
				// Add the span element, if doesn't exists, and apply the icon classes to it.
				if ( !$( element ).next( "span" )[ 0 ] && element.prop( "type" ) != "radio") {
					$( "<span class='glyphicon glyphicon-ok form-control-feedback'></span>" ).insertAfter( $( element ) );
				}
			},
			highlight: function ( element, errorClass, validClass ) {
				$( element ).parents( ".form-group" ).addClass( "has-error" ).removeClass( "has-success" );
				$( element ).next( "span" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
			},
			unhighlight: function ( element, errorClass, validClass ) {
				$( element ).parents( ".form-group" ).addClass( "has-success" ).removeClass( "has-error" );
				$( element ).next( "span" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
			}
		  });

		/* ---------------------------------------------- /*
		 * A jQuery plugin for fluid width video embeds
		/* ---------------------------------------------- */

		/*$('body').fitVids();*/

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

		/*$('#contact-form').submit(function(e) {
			e.preventDefault();
		});
		*/

	});
})(jQuery);
