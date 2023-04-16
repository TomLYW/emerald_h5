<template>
	<web-view :src="url" />
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		ref
	} from 'vue';
	import I18t from '@/hooks/useLocale.js';

	let url = ref('');

	onLoad((option) => {
		url.value = option.url;
		uni.setNavigationBarTitle({
			title: I18t.t(option.title)
		});
	})
</script>

<style lang="scss" scoped>
</style>