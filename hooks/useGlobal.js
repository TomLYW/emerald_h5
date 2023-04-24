import { getAssets, getElectricBalance, getThreshold, getUserInfo } from '@/services/other.js';
import { useUserStore } from '@/store/user.js';
const user = useUserStore();

function loadAssets() {
	getAssets().then(res => {
		if (res.code === 0) {
			user.setAssets(res.data);
		}
	})
}

function loadBalance() {
	getElectricBalance().then(res => {
		if (res.code === 0) {
			user.setBalance(res.data);
		}
	})
}

function loadThreshold() {
	getThreshold().then(res => {
		if (res.code === 0) {
			user.setThreshold(res.data);
		}
	})
}

function loadUserInfo() {
	getUserInfo().then(res => {
		if (res.code === 0) {
			user.setThreshold(res.data);
		}
	})
}

export default { loadAssets, loadBalance, loadThreshold, loadUserInfo };