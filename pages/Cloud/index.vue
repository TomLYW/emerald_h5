<template>
	<view class="cloud">
		<Tabs tab1="BTC" tab2="ETH" @onChange="handleChange" />
		<view class="main">
			<YunCell :item="item" hideBtn v-for="i  in 4" :key="i" style="margin-bottom: 15px;" />
		</view>
	</view>
</template>

<script setup>
	import YunCell from '@/pages/Home/YunList/index.vue';
	import Tabs from '@/pages/component/Tabs/index.vue';


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
		yieldRate: 0.65,
		status: 'activated'
	}

	function handleChange(val) {
		console.log('lookkkks', val)
	}
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