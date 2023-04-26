<template>
	<view class="increase">
		<Nav class="increase_nav">
			<template #left>
				<image src="/static/base/title_left_arrow.png" class="icon" @click="handleClick" />
			</template>
		</Nav>
		<view class="add_usdt">
			<view class="title">{{$t('充值')}} {{type}}</view>
			<view class="box">
				<uqrcode ref="qr" canvas-id="qrcode" :value="copyText" :options="{ margin: 25 }" :hide="!copyText"
					@complete="(e) =>success = e.success ">
				</uqrcode>
				<text>{{$t('此地址只可接收') + type}}</text>
				<view class="subtitle">{{type + $t('充值地址')}}</view>
				<text class="text" v-show="copyText">{{copyText}}</text>
				<view class="btns">
					<text class="save" @click="handleSave">{{$t('保存图片')}}</text>
					<text class="copy" @click="handleCopy">{{$t('复制地址')}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { ref, getCurrentInstance } from 'vue';
	import Nav from '@/pages/component/Nav/index.vue';
	import { getRechargePath } from '@/services/mine.js';
	import I18n from '@/hooks/useLocale.js';
	import Toast from '@/hooks/useToast.js';
	const { proxy } = getCurrentInstance();
	let type = ref('');
	let copyText = ref('');
	let success = ref(false);

	function getData(val) {
		getRechargePath({ currency: val }).then(res => {
			if (res.code === 0) {
				copyText.value = res.data.address;
			} else {
				Toast.show(res.message)
			}
		})
	}

	function handleCopy() {
		if (copyText.value) {
			uni.setClipboardData({
				data: copyText.value,
				showToast: false,
				success: function() {
					Toast.show(I18n.t('复制成功'), {
						type: 'success'
					});
				}
			});
		}
	}

	function handleSave() {
		if (success.value) {
			proxy.$refs.qr.save();
		}
	}

	function handleClick() {
		history.back();
	}

	onLoad((option) => {
		type.value = option.type;
		getData(option.type);
	})
</script>

<style lang="scss" scoped>
	.increase {
		height: 100%;
		@include flex(null, null, column);

		.increase_nav {
			.icon {
				width: 23px;
				height: 17px;
			}
		}

		.add_usdt {
			flex: 1;
			padding: 15px;
			overflow-y: auto;

			.title {
				font-weight: bold;
				font-size: 24px;
				color: #333;
			}

			.box {
				@include flex(center, null, column);
				background-color: #fff;
				border-radius: 15px;
				box-shadow: 0px 0px 10px -6px #000;
				margin-top: 20px;
				padding: 8px 20px 20px;
				word-break: break-all;

				.subtitle {
					color: #999;
					font-size: 15px;
					margin-top: 10px;
					margin-bottom: 10px;
				}

				.text {
					color: #666;
					font-size: 13px;
					text-align: center;
					margin-bottom: 15px;
				}

				.btns {
					.common_btn {
						display: inline-block;
						color: #fff;
						padding: 6px 20px;
						border-radius: 10px;
						box-shadow: 0px 0px 10px -6px #000;

						&:active {
							opacity: 0.7;
						}
					}

					.save {
						@extend .common_btn;
						background-color: #05AA84;
						margin-right: 20px;
					}

					.copy {
						@extend .common_btn;
						background-color: #00BDFF;
					}
				}

			}
		}
	}
</style>