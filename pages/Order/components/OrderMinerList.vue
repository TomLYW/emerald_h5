<template>
	<view class="cell" @click="handleClick">
		<view class="tag" :style="{backgroundColor: getDeviceType(item.type).bgColor}">
			<text class="tag-title">{{getDeviceType(item.type).text}}</text>
		</view>
		<view class="caption">
			<view class="log">
				<image class="icon"
					:src="item.currency === 'BTC' ? '/static/home/home_icon_btc.png':'/static/home/home_icon_eth.png'" />
				<text class="name">{{item.name + item.model}}</text>
				<view class="tagCount">X2</view>
			</view>
			<view class="second">
				<text class="item_1">{{$t('总产量：')}}</text>
				<text class="item_2">{{item.price}}</text>
			</view>
		</view>
		<view class="line" />
		<view class="bottom">
			<view class="bottom_item">
				<text class="up_tip">{{formatDate('2034-12-29','YY-MM-DD')}}</text>
				<text class="sub_tip">{{$t('到期')}}</text>
			</view>
			<view class="bottom_item">
				<text class="up_tip">12 {{item.currency === 'BTC' ? 'TH/s' : 'MH/s'}}</text>
				<text class="sub_tip">{{$t('算力')}}</text>
			</view>
			<view class="bottom_item">
				<text class="up_tip">87 W/h</text>
				<text class="sub_tip">{{$t('功率')}}</text>
			</view>
			<view class="bottom_item">
				<text class="up_tip">已生效</text>
				<text class="sub_tip">{{$t('状态')}}</text>
			</view>
		</view>
		<image src="/static/order/mining_img.png" class="pop_img" />
	</view>
</template>

<script setup>
	import {
		getDeviceType
	} from '@/services/cloud.js';

	import {
		accMul,
		formatDate,
		unroundNumber
	} from '@/utils/index.js';
	import I18n from '@/hooks/useLocale.js';
	const {
		item
	} = defineProps({
		item: Object
	})
	const px = uni.getLocale() === 'cn' ? '12px' : '4px';

	function getStateStr() {
		switch (item.status) {
			case 'pending':
				return I18n.t('未生效');
			case 'activated':
				return I18n.t('已激活');
			case 'standby':
				return I18n.t('已挂起');
			case 'destroyed':
				return I18n.t('已过期');
			case 'arrears':
				return I18n.t('欠费停机');
			case 'recovery':
				return I18n.t('恢复中');
			default:
				return '-';
		}
	}

	function getStateColor() {
		switch (item.status) {
			case 'pending':
				return '#999999';
			case 'activated':
				return '#05AA84';
			case 'standby':
				return '#FF4040';
			case 'destroyed':
				return '#999999';
			case 'arrears':
				return '#FF8519';
			case 'recovery':
				return '#4169E1';
			default:
				return '#999999';
		}
	}

	// 激活矿机
	function gotoActiveMiner() {
		BToast.showLoading(I18n.t('正在处理'));
		activeMiner({
				orderId: item.id
			})
			.then(response => {
				if (response.data.code === 0) {
					BToast.showSuccess(I18n.t('激活成功'));
					item.status = 'activated';
					setShowType(1);
				} else {
					BToast.showAlert(response.data.message);
				}
			})
			.catch(error => {
				console.log(error);
			});
	}

	//挂起矿机
	function gotoStopMiner() {
		Alert.alert(
			I18n.t('提示'),
			I18n.t('挂起后需间隔7天才能再次激活，是否挂起？'),
			[{
					text: I18n.t('取消'),
					color: 'red'
				},
				{
					text: I18n.t('确认'),
					onPress: () => {
						BToast.showLoading(I18n.t('正在处理'));
						stopMiner({
								orderId: item.id
							})
							.then(response => {
								if (response.data.code === 0) {
									BToast.showSuccess(I18n.t('挂起成功'));
									item.status = 'standby';
									setShowType(2);
								} else {
									BToast.showAlert(response.data.message);
								}
							})
							.catch(error => {
								console.log(error);
							});
					},
				},
			],
		);
	}

	function handleClick() {
		uni.navigateTo({
			url: '/pages/Order/OrderMinerMore/index'
		})
	}
</script>

<style lang="scss" scoped>
	.cell {
		border-radius: 15px;
		background-color: #fff;
		box-shadow: 0px 0px 10px -6px #000;
		position: relative;

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
			padding: 15px 15px 0px;

			.log {
				display: flex;
				align-items: center;

				.icon {
					height: 17px;
					width: 17px;
				}

				.name {
					font-weight: bold;
					font-size: 18px;
					margin-left: 6px;
					margin-right: 6px;
				}

				.tagCount {
					background-color: #FF8519;
					border-top-left-radius: 6px;
					border-bottom-right-radius: 6px;
					font-size: 10px;
					color: #fff;
					padding: 0px 4px;
				}
			}

			.second {
				padding: 12px 0px 12px 27px;
				display: flex;
				align-items: center;

				.item_1 {
					font-size: 13px;
					color: #999;
				}

				.item_2 {
					font-size: 20px;
					font-weight: bold;
					color: #05AA84;
				}
			}
		}

		.line {
			height: 0.5px;
			background-color: #CFCFCF;
			margin-left: 15px;
			margin-right: 15px;
		}

		.bottom {
			display: flex;
			padding: 15px;

			.bottom_item {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;

				.up_tip {
					font-size: 15px;
					font-weight: bold;
				}

				.sub_tip {
					color: #999;
					font-size: 13px;
					margin-top: 5px;
				}
			}
		}

		.pop_img {
			width: 69px;
			height: 69px;
			position: absolute;
			top: -8px;
			right: 10px;
		}
	}
</style>