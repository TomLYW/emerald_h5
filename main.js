import App from './App';
import messages from './locale/index';

let i18nConfig = {
	legacy: false,
	globalInjection: true,
	locale: uni.getLocale(),
	messages
}
console.log('mainjs文件', uni.getLocale())
uni.onLocaleChange((val) => {
	i18nConfig.locale = val.locale;
	console.log('xx行行行')
})

// #ifndef VUE3
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);
const i18n = new VueI18n(i18nConfig);
Vue.config.productionTip = false;
App.mpType = 'app';
const app = new Vue({
	i18n,
	...App
})
app.$mount();
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue';
import {
	createI18n
} from 'vue-i18n';
import * as Pinia from 'pinia';
import {
	createUnistorage
} from './uni_modules/pinia-plugin-unistorage';

const I18n = createI18n(i18nConfig);

export function createApp() {
	const app = createSSRApp(App);
	// 状态管理
	const store = Pinia.createPinia();
	// 状态持久化
	store.use(createUnistorage());
	app.use(store);
	app.use(I18n);

	return {
		app,
		Pinia
	}
}
// #endif