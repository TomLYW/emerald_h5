<template>
	<view class="set_language">
		<view class="nav">
			<image src="/static/base/title_left_arrow.png" class="left_arrow" @click="handleBack" />
			<text class="title">{{$t('语言')}}</text>
			<text class="finish" @click="handleFinish">{{$t('完成')}}</text>
		</view>
		<view class="cate" @click="language = 'zh'">
			<text class="text">{{$t('繁體中文')}}</text>
			<image src="/static/setting/language_icon_sel.png" class="img" v-show="language === 'zh'" />
		</view>
		<view class="cate" @click="language = 'en'">
			<text class="text">English</text>
			<image src="/static/setting/language_icon_sel.png" class="img" v-show="language === 'en'" />
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import Toast from '@/hooks/useToast.js';
	import I18n from '@/hooks/useLocale.js';
	let language = ref(uni.getLocale());

	function handleFinish() {
		if (language.value !== uni.getLocale()) {
			uni.setLocale(language.value);
			uni.switchTab({
				url: '/pages/Mine/index',
				success: function(e) {
					var page = getCurrentPages().pop();
					console.log('page', page.$forceUpdate)
					// if (page == undefined || page == null) return;
					page.$forceUpdate()
				}
			});

			Toast.show(I18n.t('设置成功'), {
				type: 'success'
			})
		}
	}

	function handleBack() {
		history.back();
	}
</script>

<style lang="scss" scoped>
	.set_language {
		height: 100%;
		padding-left: 15px;
		padding-right: 15px;

		.nav {
			height: 50px;
			@include flex(center, space-between);

			.left_arrow {
				width: 22px;
				height: 17px;
			}

			.title {
				font-weight: bold;
				font-size: 19px;
			}

			.finish {
				color: #666;
				font-weight: 400;

				&:active {
					opacity: 0.7;
				}
			}
		}

		.cate {
			height: 50px;
			background-color: #fff;
			padding-left: 15px;
			padding-right: 15px;
			border-radius: 12px;
			box-shadow: 0px 0px 10px -6px #000;
			@include flex(center, space-between);
			margin-top: 22px;

			.img {
				width: 20px;
				height: 20px;
			}
		}
	}
</style>