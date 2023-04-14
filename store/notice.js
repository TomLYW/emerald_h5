import {
	defineStore
} from 'pinia';

export const useNoticeStore = defineStore('notice', {
	unistorage: true,

	state: () => {
		return {
			noticeList: []
		};
	},

	actions: {
		setNoticeList(payload) {
			this.noticeList = payload;
		},
	},
});