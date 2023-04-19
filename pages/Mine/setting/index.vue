<template>
	<scroll-view scroll-y="true" height="100%">
		<view class="setting">
			<view class="caption">{{$t('基本信息')}}</view>
			<SelectCell :options="options1" class="mb15">
				<template #right1>
					<text>健身房</text>
				</template>
				<template #right2>
					<text>开始JFK就</text>
				</template>
			</SelectCell>
			<view class="caption">{{$t('支付设置')}}</view>
			<SelectCell :options="options2" class="mb15">
				<template #right1>
					<text class="right_text">{{$t('去设置')}}</text>
				</template>
				<template #right2>
					<text>开始JFK就</text>
				</template>
			</SelectCell>
			<view class="caption">{{$t('账号设置')}}</view>
			<SelectCell :options="options3" class="mb15">
				<template #right1>
					<text class="right_text">{{$t('去修改')}}</text>
				</template>
				<template #right2>
					<text class="right_text">开始JFK就</text>
				</template>
			</SelectCell>
			<view class="caption">{{$t('语言')}}</view>
			<SelectCell :options="options4" class="mb15" />
			<view class="login_out" @click="handleOut">
				{{$t('退出登录')}}
			</view>
		</view>
	</scroll-view>
</template>

<script setup>
	import SelectCell from '@/pages/component/SelectCell/index.vue';


	const options1 = [{
			label: '头像',
		},
		{
			label: '昵称',
		}
	]
	const options2 = [{
			label: '支付密码',
		},
		{
			label: '谷歌验证',
		}
	]
	const options3 = [{
			label: '登录密码',
		},
		{
			label: '邮箱',
			hideArrow: true,
		}
	]
	const options4 = [{
		label: uni.getLocale() === 'zh' ? '繁體中文' : 'English',
		url: '/pages/Mine/setting/setLanguage'
	}, ]

	function handleOut() {

	}
</script>

<style lang="scss" scoped>
	.setting {
		padding: 15px;

		.mb15 {
			margin-bottom: 15px;
		}

		.caption {
			margin-bottom: 12px;
			font-size: 13px;
			color: #666;
		}

		.login_out {
			background-color: red;
			color: #fff;
			font-size: 18px;
			font-weight: bold;
			text-align: center;
			padding-top: 12px;
			padding-bottom: 12px;
			border-radius: 12px;
			box-shadow: 0px 0px 10px -6px #000;
			margin-top: 35px;

			&:active {
				opacity: 0.7;
			}
		}
	}
</style>