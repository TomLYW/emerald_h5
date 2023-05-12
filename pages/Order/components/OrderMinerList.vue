<template>
	<view class="cell" @click="handleClick">
		<view class="tag" :style="{backgroundColor: getDeviceType(item.type).bgColor}">
			<text class="tag-title">{{getDeviceType(item.type).text}}</text>
		</view>
		<view class="caption">
			<view class="log">
				<image class="icon" :src="item.currency === 'BTC' ? '/static/home/home_icon_btc.png':'/static/home/home_icon_eth.png'" />
				<text class="name">{{item.model + item.name}}</text>
				<view class="tagCount">X{{item.numbers}}</view>
			</view>
			<view class="second">
				<text class="item_1">{{$t('总产量：')}}</text>
				<text class="item_2">{{dealNumber(item.totalYield, 8)}}</text>
			</view>
		</view>
		<view class="line" />
		<view class="bottom">
			<view class="bottom_item">
				<text class="up_tip">{{formatDate(item.expiredAt,'YY-MM-DD')}}</text>
				<text class="sub_tip">{{$t('到期')}}</text>
			</view>
			<view class="bottom_item">
				<text class="up_tip">{{item.power}} {{item.currency === 'BTC' ? 'TH/s' : 'MH/s'}}</text>
				<text class="sub_tip">{{$t('算力')}}</text>
			</view>
			<view class="bottom_item">
				<text class="up_tip">{{item.powerWaste}} W/h</text>
				<text class="sub_tip">{{$t('功率')}}</text>
			</view>
			<view class="bottom_item">
				<text class="up_tip" :style="{color: getStateColor()}">{{getStateStr()}}</text>
				<text class="sub_tip">{{$t('状态')}}</text>
			</view>
		</view>
		<image src="/static/order/mining_img.png" class="pop_img" />
		<view class="some_btns" v-show="showNum !== 0">
			<view class="btn" @click.stop="gotoStopMiner" v-if="showNum === 1">
				{{$t('挂起')}}
			</view>
			<view class="btn bgc" @click.stop="gotoActiveMiner" v-else-if="showNum === 2">
				{{$t('激活')}}
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { getDeviceType } from '@/services/cloud.js';
	import { formatDate, dealNumber } from '@/utils/index.js';
	import { activeMiner, stopMiner } from '@/services/order.js';
	import I18n from '@/hooks/useLocale.js';
	import Toast from '@/hooks/useToast.js';
	import { showConfirmDialog } from 'vant';
	const props = defineProps({
		item: Object,
		hideBtn: Boolean
	})

	const px = uni.getLocale() === 'zh' ? '12px' : '4px';

	let showNum = ref(0);
	let status = ref(props.item.status);

	function showActionNum() {
		if (!status.value) return;

		if (props.hideBtn) {
			showNum.value = 0;
			return;
		}

		if (
			status.value === 'pending' ||
			status.value === 'destroyed' ||
			status.value === 'recovery' ||
			status.value === 'arrears'
		) {
			showNum.value = 0;
			return;
		}

		if (status.value === 'activated') {
			//激活
			showNum.value = 1;
			return;
		}

		//挂起
		showNum.value = 2;
	}

	showActionNum();

	function getStateStr() {
		switch (status.value) {
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
		switch (status.value) {
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
		Toast.show(I18n.t('正在处理'), {
			type: 'loading'
		});
		activeMiner({
				orderId: props.item.id
			})
			.then(res => {
				if (res.code === 0) {
					Toast.show(I18n.t('激活成功'), {
						type: 'success'
					});
					status.value = 'activated';
					showNum.value = 1;
				} else {
					Toast.show(res.message);
				}
			})
	}

	//挂起矿机
	function gotoStopMiner() {
		showConfirmDialog({
				title: I18n.t('提示'),
				message: I18n.t('挂起后需间隔7天才能再次激活，是否挂起？'),
				confirmButtonText: I18n.t('确认'),
				cancelButtonText: I18n.t('取消'),
				cancelButtonColor: 'red',
				confirmButtonColor: '#05AA84',
			})
			.then(() => {
				Toast.show(I18n.t('正在处理'), {
					type: 'loading'
				});
				stopMiner({
						orderId: props.item.id
					})
					.then(res => {
						if (res.code === 0) {
							Toast.show(I18n.t('挂起成功'), {
								type: 'success'
							});
							status.value = 'standby';
							showNum.value = 2;
						} else {
							Toast.show(res.message);
						}
					})
			})
			.catch(() => {
				// on cancel
			});
	}

	function handleClick() {
		if (!props.hideBtn) return;
		uni.navigateTo({
			url: `/pages/Order/OrderMinerMore/index?id=${props.item.id}`
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

		.some_btns {
			padding-top: 10px;
			padding-bottom: 15px;

			.btn {
				margin: 0 30px;
				border-radius: 10px;
				background-color: #FF4040;
				text-align: center;
				color: #fff;
				padding-top: 10px;
				padding-bottom: 10px;

				&:active {
					opacity: 0.6;
				}
			}

			.bgc {
				background-color: #05AA84;
			}
		}
	}
</style>