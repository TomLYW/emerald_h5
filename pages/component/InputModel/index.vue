<template>
	<Popup v-model:show="data.isShow" round position="bottom" :close-on-click-overlay="modelShow"
		:style="{padding:'15px'}">
		<view class="content">
			<view class="content_top">
				<text class="top_left">{{data.type === 'password' ? '请输入支付密码' : '请输入谷歌验证码'}}</text>
				<image src="/static/base/login_icon_close.png" class="close_icon" @click="handleClose" />
			</view>
			<view class="content_mid">
				<text class="amount">{{data.amount}}</text>
				<text class="text">{{data.title}}</text>
			</view>
			<view class="boxs" @click="handleClick">
				<view class="box">
					<text>{{input.length > 0  ? '●' : ''}}</text>
				</view>
				<view class="box">
					<text>{{input.length > 1  ? '●' : ''}}</text>
				</view>
				<view class="box">
					<text>{{input.length > 2  ? '●' : ''}}</text>
				</view>
				<view class="box">
					<text>{{input.length > 3  ? '●' : ''}}</text>
				</view>
				<view class="box">
					<text>{{input.length > 4  ? '●' : ''}}</text>
				</view>
				<view class="box">
					<text>{{input.length > 5  ? '●' : ''}}</text>
				</view>
			</view>
			<input type="number" :maxlength='6' @input="handleChange" class="ipt" :focus="focus"
				@blur="focus = false" />
		</view>
	</Popup>
</template>

<script setup>
	import {
		Popup
	} from 'vant';
	import {
		ref,
		watch
	} from 'vue';
	const props = defineProps({
		options: Object,
	})



	let data = ref({});
	let modelShow = ref(false);
	let input = ref('');
	let focus = ref(false);

	function handleClose() {
		data.value.isShow = false;
	}

	watch(props.options, (newVal) => {
		data.value = newVal;
	})

	function handleChange(e) {
		input.value = e.detail.value;
		if (e.detail.value.length === 6 && data.value.callback) {
			data.value.callback(e.detail.value)
		}
	}

	function handleClick() {
		focus.value = true;
	}
</script>

<style lang="scss" scoped>
	.content {
		position: relative;

		.content_top {
			@include flex(center, space-between);

			.top_left {
				font-size: 15px;
				font-weight: bold;
				color: #333;
			}

			.close_icon {
				width: 16px;
				height: 16px;
			}

		}

		.content_mid {
			text-align: center;

			.amount {
				display: block;
				margin-bottom: 8px;
				margin-top: 10px;
				font-size: 28px;
				color: #333;
				font-weight: bold;
			}

			.text {
				font-size: 13px;
				color: #999;
			}
		}

		.boxs {
			@include flex();
			margin-left: 15px;
			margin-right: 15px;
			gap: 10px;
			margin-top: 20px;
			margin-bottom: 15px;

			.box {
				flex: 1;
				width: 45px;
				height: 45px;
				border-radius: 12px;
				background-color: #F0F0F0;
				@include flex(center, center);
			}
		}

		.ipt {
			position: absolute;
			bottom: 0;
			left: 15px;
			color: transparent;
			z-index: -10;
		}
	}
</style>