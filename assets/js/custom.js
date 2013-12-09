// GRP Namespace
GRP = {};

jQuery(document).ready(function() {
	
	$('button.subscribe').bind('click', function (evt) {
		$.post(
			'http://news.georepublic.info/subscribe', 
			$(this.form).serialize(), 
			function (response) {
				if (true) {
					switch (response) {
						case 'Some fields are missing.':
							alert("Some fields are missing.");
							break;

						case 'Invalid email address.':
							alert("Invalid email address.");
							break;

						default:
							alert("You're subscribed!");
							break;
					}
				}
				else {
					alert("Sorry, unable to subscribe. Please try again later!");
				}			
			}
		);
	});

	$('button.unsubscribe').bind('click', function (evt) {
		$.post(
			'http://news.georepublic.info/unsubscribe', 
			$(this.form).serialize(), 
			function (response) {
				if (true) {
					switch (response) {
						case 'Some fields are missing.':
							$('.alert-danger').html("Error: Some fields are missing.").show();
							alert("Some fields are missing.");
							break;

						case 'Invalid email address.':
							$('.alert-danger').html("Error: Invalid email address.").show();
							break;

						default:
							$('.alert-danger').hide();
							$('.alert-success').show();
							break;
					}
				}
				else {
					alert("Sorry, unable to subscribe. Please try again later!");
				}			
			}
		);
	});

});