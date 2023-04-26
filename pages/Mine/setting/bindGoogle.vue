<template>
	<view class="google_main">
		<Nav class="google_nav">
			<template #left>
				<image src="/static/base/title_left_arrow.png" class="icon" @click="handleClick" />
			</template>
		</Nav>
		<view class="bind_google">
			<view class="title">{{$t('绑定谷歌身份认证器')}}</view>
			<view class="qr_box">
				<text class="tip">{{$t('请妥善备份密钥以防遗失')}}</text>
				<uqrcode ref="uqrcode" canvas-id="qrcode" :value="data.uri" :options="{ margin: 25 }" :hide="!data.uri"></uqrcode>
				<view class="secret" v-show="data.secret">{{data.secret}}</view>
				<view class="copy" @click="copy">{{$t('复制')}}</view>
				<view class="next" @click="handleSet">{{$t('下一步')}}</view>
				<view class="tip">{{$t('保存二维码到手机或复制密钥到剪贴板可能会有安全风险，请妥善保存')}}</view>
			</view>
			<InputModel :options="options" />
		</view>
	</view>
</template>

<script setup>
	import { getGoogleSecret, setGoogleSecret } from '@/services/user.js';
	import { ref, reactive, onMounted } from 'vue';
	import Toast from '@/hooks/useToast.js';
	import I18n from '@/hooks/useLocale.js';
	import InputModel from '@/pages/component/InputModel/index.vue';
	import Nav from '@/pages/component/Nav/index.vue';

	let data = ref({ secret: '', uri: '' });

	let options = reactive({
		isShow: false,
		type: 'google',
		callback: callback
	})

	function callback(val) {
		Toast.show(I18n.t('正在绑定'), {
			type: 'loading'
		})
		setGoogleSecret({ secret: data.value.secret, code: val }).then(res => {
			if (res.code === 0) {
				Toast.show(I18n.t('正在绑定'), {
					type: 'success'
				});
				uni.redirectTo({
					url: '/pages/Mine/setting/index'
				})
			} else {
				Toast.show(res.message)
			}
		})
	}

	function handleSet() {
		options.isShow = true;
	}

	function copy() {
		if (data.value.secret) {
			uni.setClipboardData({
				data: data.value.secret,
				showToast: false,
				success: function() {
					Toast.show(I18n.t('复制成功'), {
						type: 'success'
					});
				}
			});
		}
	}

	function handleClick() {
		history.back();
	}

	onMounted(() => {
		getGoogleSecret().then(res => {
			if (res.code === 0) {
				data.value = res.data
			}
		})
	})
</script>

<style lang="scss" scoped>
	.google_main {
		height: 100%;
		@include flex(null, null, column);

		.google_nav {
			.icon {
				width: 23px;
				height: 17px;
			}
		}

		.bind_google {
			flex: 1;
			padding: 15px;
			overflow-y: auto;
			word-break: break-all;
			word-wrap: break-word;

			.title {
				font-size: 22px;
				font-weight: bold;
				margin-bottom: 22px;
			}

			.qr_box {
				box-shadow: 0px 0px 10px -6px #000;
				border-radius: 15px;
				background-color: #fff;
				padding: 15px 20px;
				@include flex(center, null, column);

				.tip {
					font-size: 13px;
					color: #666;
					text-align: center;
				}

				.next {
					color: #fff;
					box-shadow: 0px 0px 10px -6px #000;
					border-radius: 12px;
					background-color: #05AA84;
					padding: 10px 70px;
					margin-top: 15px;
					margin-bottom: 15px;

					&:active {
						opacity: 0.7;
					}
				}

				.copy {
					color: #05AA84;
					margin-top: 15px;
					letter-spacing: 2px;

					&:active {
						opacity: 0.5;
					}
				}

				.secret {
					color: #333;
					text-align: center;
				}
			}
		}
	}
</style>