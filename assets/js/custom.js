// GRP Namespace
GRP = {};

(function($){
	$.getUrlVar = function(key){
		var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search); 
		return result && unescape(result[1]) || ""; 
	};
})(jQuery);

jQuery(document).ready(function() {

	if($.getUrlVar('status') == 'success') {
		$('.alert-success > span').html($.getUrlVar('message'));
		$('.alert-success').show();
	}

	if($.getUrlVar('status') == 'error') {
		$('.alert-danger > span').html($.getUrlVar('message'));
		$('.alert-danger').show();
	}

	if($.getUrlVar('email').length > 0) {
		$("input[name='email']").val($.getUrlVar('email'));
	}

	$('button.subscribe, input.subscribe').bind('click', function (evt) {

		var form = $(this.form);
		$('.subscribe').button('loading');

		$("input[name='name']",form).val(
			$("input[name='First']",form).val() + ' ' + $("input[name='Last']",form).val()
		);

		$.post(
			form[0].action, 
			form.serialize(), 
			function (response) {
				$('.alert').hide();
				$('.subscribe').button('reset');
				if (true) {
					switch (response) {
						case 'Some fields are missing.':
							$('.alert-danger > span').html("Some fields are missing.");
							$('.alert-danger').show();
							break;

						case 'Invalid email address.':
							$('.alert-danger > span').html("Invalid email address.");
							$('.alert-danger').show();
							break;

						case 'Already subscribed.':
							$('.alert-success > span').html("Thank you. Your 知らせて.jp Newsletter profile has been updated.");
							$('.alert-success').show();
							break;

						default:
							$('.alert-success > span').html("You have been unsubscribed from the 知らせて.jp Newsletter.");
							$('.alert-success').show();
							break;
					}
				}
				else {
					$('.alert-danger > span').html("Sorry, unable to subscribe. Please try again later!");
					$('.alert-danger').show();
				}			
			}
		);
	});

	$('button.unsubscribe, input.unsubscribe').bind('click', function (evt) {
		var form = $(this.form);
		$('.subscribe').button('loading');
		$.post(
			form.action, 
			form.serialize(), 
			function (response) {
				$('.alert').hide();
				$('.subscribe').button('reset');
				if (true) {
					switch (response) {
						case 'Some fields are missing.':
							$('.alert-danger > span').html("Some fields are missing.");
							$('.alert-danger').show();
							break;

						case 'Invalid email address.':
							$('.alert-danger > span').html("Invalid email address.");
							$('.alert-danger').show();
							break;

						default:
							$('.alert-success > span').html("You have been unsubscribed from the 知らせて.jp Newsletter.");
							$('.alert-success').show();
							break;
					}
				}
				else {
					$('.alert-danger > span').html("Sorry, unable to subscribe. Please try again later!");
					$('.alert-danger').show();
				}			
			}
		);
	});

});