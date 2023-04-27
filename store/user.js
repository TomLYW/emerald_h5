import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
	unistorage: true,

	state: () => {
		return {
			isLogin: false,
			userInfo: {},
			backPath: '',
			mark: null
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
			this.backPath = '';
			this.mark = null;
		},

		setUserInfo(payload) {
			this.userInfo = payload;
		},

		setBackPath(payload) {
			this.backPath = payload;
		},

		setMark(payload) {
			this.mark = payload;
		},

	},
});