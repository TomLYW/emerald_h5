<template>
	<view class="webview">
		<Nav class="webview_nav">
			<template #left>
				<image src="/static/base/title_left_arrow.png" class="icon" @click="handleClick" />
			</template>
		</Nav>
		<view class="content">
			<web-view :src="url" />
		</view>
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { ref, reactive } from 'vue';
	import I18t from '@/hooks/useLocale.js';
	import Nav from '@/pages/component/Nav/index.vue';

	let url = ref('');
	let styles = reactive({
		width: '100%',
		height: '100%'
	})

	function handleClick() {
		history.back();
	}

	onLoad((option) => {
		url.value = option.url;
		uni.setNavigationBarTitle({
			title: I18t.t(option.title)
		});
	})
</script>

<style lang="scss" scoped>
	.webview {
		height: 100%;
		padding-top: 50px;
		// @include flex(null, null, column);


		.webview_nav {
			position: relative;
			z-index: 9999;

			.icon {
				width: 23px;
				height: 17px;
			}
		}

		.content {
			flex: 1;
			overflow-y: auto;
			margin: 15px;
			// background-color: #f60;
		}
	}
</style>