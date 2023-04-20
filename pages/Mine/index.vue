<template>
	<scroll-view scroll-y="true" height="100%">
		<view class="mine">
			<view class="header">
				<view class="left" @click="handleLeft">
					<Avatar size="50" :src="userInfo.avatar" class="left_avatar" />
					<view class="left_text">
						<text class="top">{{!isLogin ? $t('立即登录') : userInfo.nickname}}</text>
						<text class="bottom">{{!isLogin ? $t('欢迎来到Emerald') : emailEncryption(userInfo.email)}}</text>
					</view>
				</view>
				<view class="right">
					<image src="/static/mine/profile_icon_set.png" class="icon" @click="handleClick" />
				</view>
			</view>
			<SelectCell :options="options5" />
			<SelectCell :options="options4" class="invite">
				<template #right1>
					<text class="fee">12331.00</text>
				</template>
			</SelectCell>
			<SelectCell :options="options3" class="invite">
				<template #bottom>
					<view class="map">
						<text class="empty">{{$t('暂无数据')}}</text>
					</view>
				</template>
			</SelectCell>
			<SelectCell :options="options2" class="invite" v-show="isLogin" />
			<SelectCell :options="options1" class="invite" />
		</view>
	</scroll-view>
</template>

<script setup>
	import SelectCell from '@/pages/component/SelectCell/index.vue';
	import Avatar from '@/pages/component/Avatar/index.vue';
	import I18t from '@/hooks/useLocale.js';
	import { useUserStore } from '@/store/user.js';
	import { emailEncryption } from '@/utils/index.js';
	const { isLogin, userInfo } = useUserStore();

	const options1 = [{
			label: '帮助中心',
			icon: '/static/mine/profile_icon_help.png',
		},
		{
			label: '联系客服',
			icon: '/static/mine/profile_icon_service.png'
		},
		{
			label: 'about_us',
			icon: '/static/mine/profile_icon_about.png',
			url: '/pages/Mine/AboutUs/index'
		},
	]

	const options2 = [{
		label: 'invite',
		icon: '/static/mine/profile_icon_referral.png',
		url: '/pages/Mine/invite/index'
	}]

	const options3 = [{
		label: '数据统计',
		icon: '/static/mine/profile_icon_data.png',
		callback: handleJump('census')
		// url: '/pages/Mine/census/index'
	}]

	const options4 = [{
		label: '电费(USDT)',
		icon: '/static/mine/profile_icon_fee.png',
		callback: handleJump('electric')
	}]

	const options5 = [{
		label: '我的钱包',
		icon: '/static/mine/profile_icon_wallet.png',
		url: '/pages/Mine/setting/index'
	}]

	function handleClick() {
		uni.navigateTo({
			url: isLogin ? '/pages/Mine/setting/index' : '/pages/Login/index'
		})
	}

	function handleLeft() {
		if (!isLogin) {
			uni.navigateTo({
				url: '/pages/Login/index'
			})
		}
	}

	function handleJump(path) {
		return () => {
			if (isLogin) {
				uni.navigateTo({
					url: `/pages/Mine/${path}/index`
				})
			} else {
				uni.navigateTo({
					url: '/pages/Login/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mine {
		padding: 0px 15px 15px;
		background-image: url('/static/mine/header_image.png');
		background-repeat: no-repeat;
		background-size: 100% 136px;

		.header {
			padding-bottom: 15px;
			padding-top: 6px;
			@include flex(null, space-between);

			.right {
				.icon {
					width: 23px;
					height: 20px;

					&:active {
						opacity: 0.6;
					}
				}
			}

			.left {
				display: flex;

				.left_text {
					margin-left: 10px;
					color: #fff;

					.top {
						font-size: 20px;
						font-weight: bold;
					}

					.bottom {
						display: block;
						font-size: 15px;
						margin-top: 6px;
						opacity: 0.6;
					}
				}

				.left_avatar {
					border: 1px solid #fff;
					border-radius: 53%;
				}
			}
		}

		.invite {
			margin-top: 15px;
		}

		.fee {
			margin-right: 10px;
			font-size: 19px;
			font-weight: bold;
		}

		.map {
			height: 150px;
			margin-top: 15px;
			text-align: center;
			line-height: 150px;

			.empty {
				color: #6F6F6F;
			}
		}
	}
</style>