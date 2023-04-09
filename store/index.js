import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
	unistorage: true,
	
	state: () => {
		return { count: 0 };
	},
	
	actions: {
		increment() {
			this.count++;
		},
	},
});
