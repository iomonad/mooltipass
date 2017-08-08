/*
 * Icon for toggling password dialog.
 * 
 * Emits following actions:
 * - password_dialog_toggle_click
 *
 * @param type (small | big) {String}
 * @param target {jQuery object} iFrame element
 */

$(function() {
	var data = JSON.parse(decodeURIComponent(window.location.search.slice(1)))
	
	$('.icon').addClass('icon__' + data.type)
	$('.icon').on('click', function() {
		console.log('sending create_action')
		messaging({
			action: 'create_action',
			args: [{
				action: 'password_dialog_toggle_click',
				args: {
					iconId: data.iconId
				}
			}]
		});
	});
});


// Unify messaging method - And eliminate callbacks (a message is replied with another message instead)
function messaging( message ) {
	if (content_debug_msg > 4) cipDebug.log('%c Sending message to background:','background-color: #0000FF; color: #FFF; padding: 5px; ', message);
	if ( isSafari ) safari.self.tab.dispatchMessage("messageFromContent", message);
	else chrome.runtime.sendMessage( message );
};

var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
var isSafari = typeof(safari) == 'object'?true:false;
var content_debug_msg = ((window.chrome || isFirefox) && chrome.runtime && !('update_url' in chrome.runtime.getManifest()))? 55 : false;;

var cipDebug = {};
if (content_debug_msg) {
	cipDebug.log = function( message ) {
		this.log( message );
	}
	cipDebug.log = console.log.bind(window.console);
	cipDebug.warn = console.warn.bind(window.console);
	cipDebug.trace = console.trace.bind(window.console);
	cipDebug.error = console.error.bind(window.console);
} else {
	cipDebug.log = function() {}
	cipDebug.log = function() {}
	cipDebug.warn = function() {}
	cipDebug.trace = function() {}
	cipDebug.error = function() {}
}
