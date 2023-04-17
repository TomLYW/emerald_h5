<template>
	<scroll-view scroll-y="true" style="height: 100%;" @scroll="handleScroll">
		<view class="container">
			<text class="topic">{{$t('goods_d')}}</text>
			<view class="first-card">
				<text class="title">
					{{pageData.name + pageData.model}}
				</text>
				<view class="side_1">
					<text class="item_1">{{$t('已售')}}</text>
					<text
						class="item_2">{{((pageData.sold / (pageData.sold + pageData.stock)) * 100).toFixed(0)}}%</text>
				</view>
				<view class="progress">
					<Progress :percentage="(pageData.sold / (pageData.sold + pageData.stock)) * 100" stroke-width="7"
						track-color="#ECEFFF" color="#05AA84" :show-pivot='false' />
				</view>
			</view>
			<view class="second-card">

			</view>

			<CustomTitle :title="$t('算力详情')" />
			<view class="last-card" v-for="i  in 3" :key="i">

			</view>

			<view class="buy">
				<view class="left">
					<text class="price">0.00 U</text>
					<text class="text">{{$t('价格')}}</text>
				</view>
				<text class="right_btn" @click="handleBuy">{{$t('立即购买')}}</text>
			</view>
		</view>
	</scroll-view>

</template>

<script setup>
	import CustomTitle from '@/pages/component/CustomTitle/index.vue';
	import I18n from '@/hooks/useLocale.js';
	import {
		getMinerDetails
	} from '@/services/cloud.js';
	import {
		accMul
	} from '@/utils/index.js';
	import {
		ref
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		Progress
	} from 'vant';

	let flag = ref(false);
	let pageData = ref({});
	const percent = (pageData.sold / (pageData.sold + pageData.stock)) * 100;

	function handleBuy() {
		console.log('look')
	}

	function handleScroll(e) {
		if (e.detail.scrollTop === 0) {
			uni.setNavigationBarTitle({
				title: ''
			});

			flag.value = false;
		} else {
			if (!flag.value) {
				uni.setNavigationBarTitle({
					title: I18n.t('goods_d')
				});

				flag.value = true;
			}
		}
	}

	function getData(id) {
		getMinerDetails({
			id
		}).then(res => {
			if (res.code === 0) {
				pageData.value = res.data;
			}
		})
	}

	onLoad((option) => {
		getData(option.id);
	})
</script>

<style lang="scss" scoped>
	.container {
		padding: 15px;

		.topic {
			font-weight: bold;
			font-size: 24px;
		}


		.first-card {
			border-radius: 15px;
			box-shadow: 0px 0px 10px -8px;
			margin-top: 15px;
			margin-bottom: 15px;
			background-color: #fff;
			padding: 12px;

			.title {
				color: #333;
				font-weight: bold;
				font-size: 20px;
			}

			.side_1 {
				text-align: right;
				@include flex(center, flex-end);

				.item_1 {
					color: #999;
					font-size: 11px;
				}

				.item_2 {
					color: #05AA84;
					font-size: 15px;
					font-weight: bold;
				}
			}

			.progress {
				margin-top: 10px;
				margin-bottom: 10px;
			}
		}

		.second-card {
			height: 170px;
			border-radius: 15px;
			box-shadow: 0px 0px 10px -8px;
		}

		.last-card {
			height: 170px;
			border-radius: 15px;
			box-shadow: 0px 0px 10px -8px;
		}

		.buy {
			height: 60px;
			width: 100%;
			background-color: #fff;
			position: fixed;
			bottom: 0;
			left: 0;
			@include flex(center, space-between);

			.left {
				margin-left: 15px;
				@include flex(null, null, column);

				.price {
					color: #FF8519;
					font-weight: bold;
					font-size: 20px;
				}

				.text {
					font-size: 13px;
					color: #999;
				}
			}

			.right_btn {
				margin-right: 15px;
				background-color: #ADDAD0;
				padding: 9px 42px;
				color: #fff;
				border-radius: 12px;
			}
		}
	}
</style>