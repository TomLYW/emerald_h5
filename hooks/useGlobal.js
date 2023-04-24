import { getUserInfo } from '@/services/other.js';
import { useUserStore } from '@/store/user.js';
const user = useUserStore();

export function loadUserInfo() {
	getUserInfo().then(res => {
		if (res.code === 0) {
			user.setUserInfo(res.data);
		}
	})
}

export function savePath() {
	const pages = getCurrentPages();
	user.setBackPath(pages[pages.length - 2].route);
}

export function linkJump() {
	uni.reLaunch({
		url: `/${user.backPath}`
	})
}