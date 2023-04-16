<template>
	<view class="about_us">
		<view class="about_header">
			<image class="logo" src="/static//base/icon_android.png" />
			<text class="name">Emerald</text>
			<text class="version">{{version}}</text>
		</view>
		<SelectCell :options="options" />
	</view>
</template>

<script setup>
	import SelectCell from '@/pages/component/SelectCell/index.vue';
	import {
		getVersion
	} from '@/services/mine.js';
	import {
		ref,
		onMounted
	} from 'vue';
	let version = ref('');
	const options = [{
			label: '隐私条款',
			icon: '/static/mine/profile_about_icon_privacy.png',
		},
		{
			label: '用户协议',
			icon: '/static/mine/profile_about_icon_protocol.png'
		},
	]

	onMounted(() => {
		getVersion().then(res => {
			if (res.code === 0) {
				version.value = res.data.vNum;
			}
		})
	})
</script>

<style lang="scss" scoped>
	.about_us {
		padding: 15px;

		.about_header {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 26px;
			margin-top: 8px;

			.logo {
				width: 70px;
				height: 70px;
			}

			.name {
				font-weight: bold;
				font-size: 26px;
				margin-top: 12px;
				margin-bottom: 12px;
			}

			.version {
				color: #6F6F6F;
				font-size: 18px;
			}
		}
	}
</style>