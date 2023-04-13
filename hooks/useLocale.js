import {
	createI18n
} from 'vue-i18n';
import messages from '@/locale/index.js';

const i18nConfig = {
	fallbackLocale: "en",
	silentTranslationWarn: true,
	locale: uni.getLocale(),
	messages
}

const i18n = createI18n(i18nConfig);


export default i18n.global;