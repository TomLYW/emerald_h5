<template>
	<view>
		<web-view :src="url" />
	</view>
</template>

<script setup>
	import { onLoad, onNavigationBarButtonTap } from '@dcloudio/uni-app';
	import { ref, onMounted } from 'vue';
	import I18t from '@/hooks/useLocale.js';

	let url = ref('');

	onLoad((option) => {
		url.value = option.url;
		uni.setNavigationBarTitle({
			title: I18t.t(option.title)
		});
	})

	onMounted(() => {
		document.querySelector('.uni-page-head .uni-page-head-hd .uni-page-head-btn').setAttribute("style",
			"display:none;")
	})

	onNavigationBarButtonTap((e) => {
		history.back();
	})
</script>

<style lang="scss" scoped>

</style>