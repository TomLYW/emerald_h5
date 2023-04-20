<template>
	<view class="electric">
		<Nav :title="$t('electric')" class="header">
			<template #left>
				<image src="/static/base/title_leftarrow_white.png" class="icon" @click="handleClick" />
			</template>
		</Nav>
		<view class="card">
			<text class="card_1">{{$t('电费余额(USDT)')}}</text>
			<view class="card_2">{{dealNumber(123.455,2)}}</view>
			<text class="card_3" @click="handleRecharge">{{$t('充值')}}</text>
		</view>
		<CustomTitle :title="$t('消费记录')" class="mid_title" />
		<view class="main">
			<CensusCell v-for="item in data.list" :key="item.id" :item="item" type='electric' class="main_item" />
		</view>
	</view>
</template>

<script setup>
	import Nav from '@/pages/component/Nav/index.vue';
	import CustomTitle from '@/pages/component/CustomTitle/index.vue';
	import CensusCell from '@/pages/component/CensusCell/index.vue';
	import { reactive, onMounted } from 'vue';
	import Toast from '@/hooks/useToast.js';
	import I18n from '@/hooks/useLocale.js';
	import { getElectricList } from '@/services/mine.js';
	import { dealNumber } from '@/utils/index.js';
	let data = reactive({
		list: []
	});

	function getData() {
		getElectricList({ page: 1, limit: 100 }).then(res => {
			if (res.code === 0) {
				data.list = res.data;
			}
		})
	}

	function handleClick() {
		uni.switchTab({
			url: '/pages/Mine/index'
		})
	}

	function handleRecharge() {
		uni.navigateTo({
			url: '/pages/Mine/electric/rechargeFees'
		})
	}

	onMounted(() => {
		getData();
	})
</script>

<style lang="scss" scoped>
	.electric {
		height: 100%;
		@include flex(null, null, column);
		background-image: url('/static/mine/header_image.png');
		background-repeat: no-repeat;
		background-size: 100% 136px;

		.header {
			color: #fff;

			.icon {
				width: 23px;
				height: 17px;
			}
		}

		.card {
			box-shadow: 0px 0px 10px -6px #000;
			border-radius: 15px;
			margin-left: 15px;
			margin-right: 15px;
			margin-top: 20px;
			padding: 20px;
			background-image: url('/static/mine/fee_img_banner.png');
			background-repeat: no-repeat;
			background-size: 60% 100%;
			background-position: right;
			background-color: #E3F3F4;

			.card_1 {
				font-size: 14px;
				color: #666;
			}

			.card_2 {
				font-size: 26px;
				font-weight: bold;
				color: #333;
				margin-top: 10px;
				margin-bottom: 16px;
			}

			.card_3 {
				background-color: #05AA84;
				color: #fff;
				padding: 6px 40px;
				border-radius: 6px;
				box-shadow: 0px 0px 10px -6px #000;

				&:active {
					opacity: 0.6;
				}
			}
		}

		.mid_title {
			margin-left: 15px;
			margin-right: 15px;
		}

		.main {
			flex: 1;
			padding: 15px;
			overflow-y: auto;

			.main_item {
				margin-bottom: 15px;
			}
		}
	}
</style>