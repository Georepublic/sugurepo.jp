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
		$('.alert-success > span').html(message[$.getUrlVar('msg')]);
		$('.alert-success').show();
	}

	if($.getUrlVar('status') == 'error') {
		$('.alert-danger > span').html(message[$.getUrlVar('msg')]);
		$('.alert-danger').show();
	}

	if($.getUrlVar('email').length > 0) {
		$("input[name='email']").val($.getUrlVar('email'));
	}

	$('button.sendy').bind('click', function (evt) {

		var form = $(this.form);
		var btn = $(this);
		btn.button('loading');

		var name = [];
		name.push($("input[name='Last']",form).val());
		name.push($("input[name='First']",form).val());
		$("input[name='name']",form).val(name.join(' '));

		$.post(
			form[0].action, 
			form.serialize(), 
			function (response) {
				$('.alert').hide();
				btn.button('reset');

				if (true) {
					switch (response) {
						case 'Some fields are missing.':
							$('.alert-danger > span').html(message.a);
							$('.alert-danger').show();
							break;

						case 'Invalid email address.':
							$('.alert-danger > span').html(message.b);
							$('.alert-danger').show();
							break;

						case 'Already subscribed.':
							$('.alert-success > span').html(message.e);
							$('.alert-success').show();
							form[0].reset();
							break;

						default:
							if (form[0].action.split('/').pop() == 'subscribe') {
								$('.alert-success > span').html(message.d);
							}
							else {
								$('.alert-success > span').html(message.f);
							}

							$('.alert-success').show();
							form[0].reset();
							break;
					}
				}
				else {
					$('.alert-danger > span').html(message.c);
					$('.alert-danger').show();
				}

				window.scrollTo(0,0);
			}
		);
	});

});
