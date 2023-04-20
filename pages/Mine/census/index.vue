<template>
	<view class="census">
		<Tabs v-model="tab" tab1="BTC" tab2="ETH" showBack :callback="onBack" />
		<!-- <view class="main">

		</view> -->
		<NoData hideBtn />
	</view>
</template>

<script setup>
	import { onBackPress } from '@dcloudio/uni-app';
	import Tabs from '@/pages/component/Tabs/index.vue';
	import CensusCell from '@/pages/component/CensusCell/index.vue';
	import NoData from '@/pages/component/NoData/index.vue';
	import { ref, onMounted } from 'vue';
	let tab = ref(1);

	onBackPress((e) => {
		// console.log('xx', e)
		// if (e.from === 'backbutton') {
		// 	history.back();
		// 	return true;
		// }
	})


	function getDta() {

	}

	function onBack() {
		uni.switchTab({
			url: '/pages/Mine/index'
		})
	}

	onMounted(() => {
		getDta();
	})
</script>

<style lang="scss" scoped>
	.census {
		height: 100%;
		@include flex(null, null, column);

		.main {
			flex: 1;
			overflow-y: auto;
			background-color: blue;
		}
	}
</style>