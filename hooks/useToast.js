import {
	showToast,
	closeToast
} from 'vant';

function show(message, option = {
	type: 'fail'
}) {
	showToast({
		message,
		icon: option.type === 'fail' ? '/static/base/warn.png' : '',
		wordBreak: 'break-word',
		...option
	});
}


export default {
	show,
	closeToast
};