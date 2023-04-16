<template>
	<view class="order">
		<Tabs :tab1="$t('云算力')" :tab2="$t('矿机')" @onChange="handleChange" />
		<view class="main" v-if="tab === 1">
			<OrderPowerList :item="item" v-for="i  in 4" :key="i" style="margin-bottom: 15px;" />
		</view>
		<view class="main" v-else>
			<OrderMinerList :item="item" hideBtn v-for="i  in 4" :key="i" style="margin-bottom: 15px;" />
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import OrderMinerList from '@/pages/Order/components/OrderMinerList.vue';
	import OrderPowerList from '@/pages/Order/components/OrderPowerList.vue';
	import Tabs from '@/pages/component/Tabs/index.vue';
	let tab = ref(1);

	let item = {
		id: 1,
		createdAt: '2022-09-21T05:31:48.263Z',
		updatedAt: '2022-10-18T03:38:42.804Z',
		type: 'classic',
		currency: 'BTC',
		payCurrency: 'USDT',
		saleTime: '2022-09-14T05:31:26.115Z',
		deployTime: '2022-10-18T03:45:40.38Z',
		effectTime: '2022-10-18T03:59:44.313Z',
		name: '超级算力',
		image: 'https://s3.us-east-1.amazonaws.com/flashpics/a/1/264/1663738191070907388.jpg',
		model: 'S19',
		power: 95,
		powerWaste: 3250,
		electricFees: 0.29,
		electricLoss: 0.05,
		parkingFees: 5,
		initElectricFees: 100,
		serviceFees: 0,
		stock: 0,
		sold: 10,
		price: '300',
		duration: 365,
		isRecommend: true,
		images: null,
		yieldRate: 0.65
	}

	function handleChange(val) {
		tab.value = val;
	}
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