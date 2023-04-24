import {
	defineStore
} from 'pinia';

export const useUserStore = defineStore('user', {
	unistorage: true,

	state: () => {
		return {
			isLogin: false,
			userInfo: {},
			assets: [],
			threshold: {},
			balance: {}
		};
	},

	actions: {
		login(payload) {
			this.isLogin = true;
			this.userInfo = payload;
		},
		loginOut() {
			this.isLogin = false;
			this.userInfo = {};
			this.assets = [];
			this.threshold = {};
			this.balance = {};
		},
		setUserInfo(payload) {
			this.userInfo = payload;
		},
		setAssets(payload) {
			this.assets = payload;
		},
		setThreshold(payload) {
			this.threshold = payload;
		},
		setBalance(payload) {
			this.balance = payload;
		},
	},
});