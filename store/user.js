import {
	defineStore
} from 'pinia';

export const useUserStore = defineStore('user', {
	unistorage: true,

	state: () => {
		return {
			isLogin: false,
			userInfo: {}
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
		},
	},
});