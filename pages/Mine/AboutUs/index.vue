<template>
	<view class="about_main">
		<Nav class="about_nav" :title="$t('about_us')">
			<template #left>
				<image src="/static/base/title_left_arrow.png" class="icon" @click="handleClick" />
			</template>
		</Nav>
		<view class="about_us">
			<view class="about_header">
				<image class="logo" src="/static//base/icon_android.png" />
				<text class="name">Emerald</text>
				<text class="version">v{{version}}</text>
			</view>
			<SelectCell :options="options" />
		</view>
	</view>
</template>

<script setup>
	import SelectCell from '@/pages/component/SelectCell/index.vue';
	import Nav from '@/pages/component/Nav/index.vue';
	import { ref, onMounted } from 'vue';
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

	function handleClick() {
		history.back();
	}

	onMounted(() => {
		uni.getSystemInfo({
			success: (e) => {
				version.value = e.appVersion;
			}
		})
	})
</script>

<style lang="scss" scoped>
	.about_main {
		height: 100%;
		@include flex(null, null, column);

		.about_nav {
			.icon {
				width: 23px;
				height: 17px;
			}
		}

		.about_us {
			flex: 1;
			overflow-y: auto;
			padding: 15px;

			.about_header {
				@include flex(center, null, column);
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
	}
</style>