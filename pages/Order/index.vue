<template>
	<view class="order">
		<Tabs :tab1="$t('云算力')" :tab2="$t('矿机')" v-model="tab" />
		<NoData v-if="!user.isLogin" />
		<view class="main" v-else-if="user.isLogin && tab === 1">
			<OrderPowerList :item="item" v-for="item  in  listData.power" :key="item.id" style="margin-bottom: 15px;" v-if="listData.power.length" />
			<NoData hideBtn v-else />
		</view>
		<view class="main" v-else-if="user.isLogin && tab === 2">
			<OrderMinerList :item="item" hideBtn v-for="item  in listData.miner" :key="item.id" style="margin-bottom: 15px;" v-if="listData.miner.length" />
			<NoData hideBtn v-else />
		</view>
	</view>
</template>

<script setup>
	import { onShow } from "@dcloudio/uni-app";
	import { ref, reactive } from 'vue';
	import OrderMinerList from '@/pages/Order/components/OrderMinerList.vue';
	import OrderPowerList from '@/pages/Order/components/OrderPowerList.vue';
	import Tabs from '@/pages/component/Tabs/index.vue';
	import NoData from '@/pages/component/NoData/index.vue';
	import { useUserStore } from '@/store/user.js';
	import { getMinerOrder, getPowerOrder } from '@/services/order.js';
	const user = useUserStore();

	let tab = ref(1);
	let listData = reactive({
		miner: [],
		power: []
	})

	function getPowerData() {
		getPowerOrder().then(res => {
			if (res.code === 0) {
				listData.power = res.data;
			}
		})
	}

	function getMinerData() {
		getMinerOrder().then(res => {
			if (res.code === 0) {
				listData.miner = res.data;
			}
		})
	}

	onShow(() => {
		if (user.isLogin) {
			getPowerData();
			getMinerData();
		}
	})
</script>

<style lang="scss" scoped>
	.order {
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