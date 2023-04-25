import { createApp } from 'vue';
import WarnPop from '@/pages/Other/warnPop.vue';

const showPop = (message, option = {}) => {
	const mountNode = document.createElement('div');
	const Instance = createApp(WarnPop, {
		show: true,
		message,
		...option,
		close: () => {
			Instance.unmount(mountNode);
			document.body.removeChild(mountNode);
		}
	})

	document.body.appendChild(mountNode);
	Instance.mount(mountNode);
}
export default {
	showPop
};