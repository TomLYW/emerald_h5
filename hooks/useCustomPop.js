import { createApp } from 'vue';
import WarnPop from '@/pages/Other/warnPop.vue';
import PowerTips from '@/pages/Other/powerTips.vue';


const showPop = (message, option = {}) => {
	const mountNode = document.createElement('div');
	const Instance = createApp(WarnPop, {
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

const showTips = (option = {}) => {
	const mountNode = document.createElement('div');
	const Instance = createApp(PowerTips, {
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
	showPop,
	showTips
};