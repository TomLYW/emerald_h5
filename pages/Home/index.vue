<template>
	<view class="home">
		<view class='header'>
			<image class='left-img' src='/static/home/home_logo.png' />
			<image class='right-img' src='/static/home/home_icon_news.png' @click="handleNotice" />
		</view>
		<swiper class="banner" circular indicator-dots autoplay :interval="3500">
			<swiper-item v-for="v in current.bannerList" :key="v.id">
				<image :src="v.image" class="img" />
			</swiper-item>
		</swiper>

		<view class="middle" @click="handleMiddle">
			<image  class="midl-img" src='/static/home/home_icon_notice.png' />
			<view class="mid-content">
				<text class="title">尽快艰苦奋斗</text>
				<text class="date">2022-01-27 12:43:34</text>
			</View>
			<image class="midr-img" src='/static/home/home_icon_rightarrow.png' />
		</view>
	</view>
</template>


<script setup>
	import {
		onShow,
	} from "@dcloudio/uni-app"
	import {
		useI18n
	} from 'vue-i18n';

	const {
		t
	} = useI18n();
	import {
		reactive,
		onMounted
	} from 'vue';
	import {
		Field,
		Button,
		Form
	} from 'vant';
	import {
		getBannerImgs
	} from '@/services/home.js';

	const current = reactive({
		bannerList: [],
		cloudList: [],
	})

	const handleNotice = () => {
		console.log(uni.getLocale())
	}
	const handleMiddle = () => {
		console.log(uni.getLocale())
	}

	const getData = () => {
		getBannerImgs().then(res => {
			if (res.code === 0) {
				current.bannerList = res.data;
			}
		})
	}
	onMounted(() => {
		getData();
	})
	onShow(() => {})
</script>

<style lang="scss" scoped>
	.home {
		padding: 15px;

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 12px;

			.left-img {
				width: 118px;
				height: 22px;
			}

			.right-img {
				width: 22px;
				height: 24px;
			}
		}

		.banner {
			margin-bottom: 14px;
			.img {
				width: 100%;
				height: 100%;
				border-radius: 6px;
			}
		}
		.middle{
			display: flex;
			align-items: center;
			padding: 10px 15px;
			border: 1px solid #ccc;
			border-radius: 8px;
			background-color: #fff;
			// box-shadow: ;
			.midl-img{
				width: 40px;
				height: 40px;
			}
			.midr-img{
				width: 26px;
				height: 26px;
			}
			.mid-content{
				flex: 1;
				padding: 0 15px;
				.title{
					font-weight: bold;
				}
				.date{
					display: block;
					font-size: 13px;
					color: #ccc;
					margin-top: 6px;
				}
			}
		}

	}
</style>