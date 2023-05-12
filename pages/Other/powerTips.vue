<template>
	<view class="reminder">
		<ForceNotice :data="force" :callback="handleFinish" v-if="showIndex === 1" />
		<view class="box" v-else-if="showIndex === 2">
			<view class="caption">
				<text v-if="threshold.status === 2">{{I18n.t('账户已欠费')}}</text>
				<text v-else-if="threshold.status === 1">{{I18n.t('电费不足提醒')}}</text>
			</view>
			<view class="msg">
				<view v-if="threshold.status === 1">
					{{I18n.t('根据您昨日消耗估算，您的电费余额可能不足以支持未来')}}
					<text class="day">{{threshold.balance_time}}</text>
					{{I18n.t('天的消耗')}}
				</view>
				<text v-else-if="threshold.status === 2">{{I18n.t('您的电费账户已欠费，为避免造成收益损失，请及时充值电费')}}</text>
			</view>
			<view class="btn">
				<text class="btn_item" @click="close">{{I18n.t('我已知晓')}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import ForceNotice from '@/pages/Other/forceNotice.vue';
	import I18n from '@/hooks/useLocale.js';
	const props = defineProps({
		close: Function,
		force: Array,
		threshold: Object,
		showIndex: Number
	})

	let showIndex = ref(props.showIndex);

	function handleFinish() {
		if (props.threshold.status > 0) {
			showIndex.value = 2;
		} else {
			props.close();
		}
	}
</script>

<style lang="scss" scoped>
	.reminder {
		background-color: rgba(0, 0, 0, 0.6);
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 9999;
		@include flex(center, center);
		word-wrap: break-word;

		.box {
			width: 70%;
			background-color: #fff;
			padding-left: 15px;
			padding-right: 15px;
			border-radius: 6px;
			background-image: url('/static/toast/bullet_frame.png');
			background-repeat: no-repeat;
			background-size: 100% 100%;

			.caption {
				font-weight: bold;
				font-size: 18px;
				text-align: center;
				margin-top: 10px;
			}

			.msg {
				margin-top: 15px;
				margin-bottom: 25px;
				line-height: 24px;

				.day {
					font-style: italic;
					font-weight: bold;
					color: blue;
					font-size: 20px;
				}
			}

			.btn {
				text-align: center;
				margin-bottom: 15px;

				.btn_item {
					display: inline-block;
					color: #fff;
					background-color: #169BD5;
					padding: 9px 20px;
					border-radius: 9px;

					&:active {
						opacity: 0.6;
					}
				}
			}
		}
	}
</style>