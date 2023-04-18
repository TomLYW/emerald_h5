<template>
	<scroll-view scroll-y="true" height="100%">
		<view class="mine">
			<SelectCell :options="options5" />
			<SelectCell :options="options4" class="invite">
				<template #right>
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
	import I18t from '@/hooks/useLocale.js';
	import { useUserStore } from '@/store/user.js';
	const { isLogin } = useUserStore();

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
		url: '/pages/Mine/invite/index'
	}]

	const options4 = [{
		label: '电费(USDT)',
		icon: '/static/mine/profile_icon_fee.png',
		url: '/pages/Mine/invite/index'
	}]

	const options5 = [{
		label: '我的钱包',
		icon: '/static/mine/profile_icon_wallet.png',
		url: '/pages/Login/index'
	}]
</script>

<style lang="scss" scoped>
	.mine {
		padding: 15px;

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