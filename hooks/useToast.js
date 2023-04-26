import { showToast, closeToast } from 'vant';


function getImg(type) {
	switch (type) {
		case 'success':
			return '/static/toast/toast_success.png';
		case 'fail':
			return '/static/toast/toast_error.png';
		case 'loading':
			return '';
		default:
			return '/static/toast/toast_alert.png';
	}
}

function show(message, option = {}) {
	showToast({
		message,
		className: 'custom-vant-toast',
		icon: getImg(option.type),
		wordBreak: 'break-word',
		...option
	});
}


export default {
	show,
	closeToast
};