<template>
	<view class="cloud">
		<Tabs tab1="BTC" tab2="ETH" v-model="tab" />
		<view class="main" v-if="(cloudList.ethData.length && tab === 2) || (cloudList.btcData.length && tab === 1)">
			<YunCell :item="item" v-for="item  in  (tab === 1 ? cloudList.btcData : cloudList.ethData)" :key="item.id" style="margin-bottom: 15px;" />
		</view>
		<NoData v-else hideBtn />
	</view>
</template>

<script setup>
	import { onShow } from "@dcloudio/uni-app";
	import YunCell from '@/pages/Home/YunList/index.vue';
	import Tabs from '@/pages/component/Tabs/index.vue';
	import NoData from '@/pages/component/NoData/index.vue';
	import { getMinerList } from '@/services/cloud.js';
	import { ref, reactive } from 'vue';

	let tab = ref(1);
	let cloudList = reactive({
		ethData: [],
		btcData: []
	})

	function getEthList() {
		getMinerList({
			currency: "ETH"
		}).then(res => {
			if (res.code === 0) {
				cloudList.ethData = res.data;
			}
		})
	}

	function getBtcList() {
		getMinerList({
			currency: "BTC"
		}).then(res => {
			if (res.code === 0) {
				cloudList.btcData = res.data;
			}
		})
	}

	onShow(() => {
		getBtcList();
		getEthList();
	})
</script>

<style lang="scss" scoped>
	.cloud {
		height: 100%;
		display: flex;
		flex-direction: column;

		.main {
			padding: 15px 15px 0px;
			flex: 1;
			overflow-y: auto;
		}
	}
</style>