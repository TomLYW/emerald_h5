<template>
	<view class="cell" @click="handleClick">
		<view>
			<view class="tag" :style="{backgroundColor: getMealType(item.type).bgColor}">
				<text class="tag-title">{{getMealType(item.type).text}}</text>
			</view>
		</view>
		<view class="caption">
			<view class="log">
				<image class="icon"
					:src="item.currency === 'BTC' ? '/static/home/home_icon_btc.png':'/static/home/home_icon_eth.png'" />
				<text class="name">{{item.name + item.model}}</text>
			</view>
			<text class="price">{{Number(item.price).toFixed(2)}} U</text>
		</view>
		<view class="line" />
		<view class="bottom">
			<view class="info">
				<view class="desc-cell">
					<text class="up">{{item.duration}}{{$t('天')}}</text>
					<text class="down">{{$t('期限')}}</text>
				</view>
				<view class="desc-cell">
					<text class="up">{{item.power}}{{item.currency === 'BTC' ? 'TH/s' : 'MH/s'}}</text>
					<text class="down">{{$t('规格')}}</text>
				</view>
				<view class="desc-cell">
					<text class="up" style="color: #049977;">{{accMul(item.yieldRate,100).toFixed(2)}}%</text>
					<text class="down">{{$t('历史产出率')}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		getMealType
	} from '@/services/cloud.js';

	import {
		accMul,
	} from '@/utils/index.js';
	const {
		item
	} = defineProps({
		item: Object
	})
	const px = uni.getLocale() === 'cn' ? '12px' : '4px';



	const handleClick = () => {
		uni.navigateTo({
			url: '/pages/Home/description/index'
		})
	}
</script>

<style lang="scss" scoped>
	.cell {
		height: 150px;
		border-radius: 15px;
		background-color: #E5E5E5;
		box-shadow: 0px 0px 10px -6px #000;
		position: relative;
		display: flex;
		flex-direction: column;

		.tag {
			display: inline-block;
			padding: 1px v-bind('px');
			background-color: #05AA84;
			border-top-left-radius: 15px;
			border-bottom-right-radius: 15px;

			.tag-title {
				font-size: 12px;
				color: #fff;
			}
		}

		.caption {
			display: flex;
			justify-content: space-between;
			padding: 12px 15px;

			.log {
				display: flex;
				align-items: center;

				.icon {
					height: 17px;
					width: 17px;
					margin-right: 5px;
				}

				.name {
					font-weight: bold;
					font-size: 18px;
				}
			}

			.price {
				font-size: 22px;
				font-weight: bold;
				color: #FF8519;
			}
		}

		.line {
			height: 1px;
			background-color: #CFCFCF;
			margin-left: 15px;
			margin-right: 15px;
		}

		.bottom {
			flex: 1;
			display: flex;
			align-items: center;

			.info {
				flex: 1;
				display: flex;
				padding-left: 15px;
				padding-right: 15px;

				.desc-cell {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					.up {
						font-weight: bold;
						font-size: 15px;
					}

					.down {
						font-size: 13px;
						color: #999;
						margin-top: 6px;
					}
				}
			}
		}


	}
</style>