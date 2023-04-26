<template>
	<view class="detail_main">
		<Nav class="detail_nav" :title="$t('output_d')">
			<template #left>
				<image src="/static/base/title_left_arrow.png" class="icon" @click="handleClick" />
			</template>
		</Nav>
		<view class="output_details">
			<view class="top">
				<image src="/static/order/mining_img.png" class="img" />
			</view>
			<view class="item">
				<text>{{$t('计划产出')}}</text>
				<text class="gray">{{pageData.yield}} {{currency}}</text>
			</view>
			<view class="item">
				<text>{{$t('电费消耗')}}</text>
				<text class="gray">{{pageData.electricFees}} USDT</text>
			</view>
			<view class="item">
				<text>{{$t('抵扣价格')}}</text>
				<text class="gray">{{pageData.currenciesPrice}} USDT</text>
			</view>
			<view class="item">
				<text>{{$t('抵扣数量')}}</text>
				<text class="gray">{{Number(pageData.electricStruck).toFixed(8)}} {{currency}}</text>
			</view>
			<view class="item">
				<text>{{$t('实际产出')}}</text>
				<text class="fw">{{Number(pageData.realYield).toFixed(8)}} {{currency}}</text>
			</view>
			<view class="item">
				<text>{{$t('产出时间')}}</text>
				<text class="gray">{{formatDate(pageData.createdAt)}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { formatDate } from '@/utils/index.js';
	import { getOutputDetails } from '@/services/order.js';
	import { ref } from 'vue';
	import Nav from '@/pages/component/Nav/index.vue';

	let pageData = ref({});
	let currency = ref('');

	function handleClick() {
		history.back();
	}

	onLoad((option) => {
		currency.value = option.type;
		getOutputDetails({
			id: option.id
		}).then(res => {
			if (res.code === 0) {
				pageData.value = res.data;
			}
		})
	})
</script>

<style lang="scss" scoped>
	.detail_main {
		height: 100%;
		@include flex(null, null, column);

		.detail_nav {
			.icon {
				width: 23px;
				height: 17px;
			}
		}

		.output_details {
			flex: 1;
			overflow-y: auto;
			padding: 6px 15px 15px;

			.top {
				text-align: center;
				margin-bottom: 30px;

				.img {
					width: 137px;
					height: 138px;
				}
			}

			.item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 15px;

				.gray {
					color: #999;
					font-size: 14px;
				}

				.fw {
					font-weight: bold;
				}
			}
		}
	}
</style>