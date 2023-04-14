<template>
	<scroll-view scroll-y="true" height="100%">
		<view class="output_record">
			<OrderPowerDetails :item="item" />
			<CustomTitle :title="$t('output_r')" />
			<view v-if="true">
				<Cell v-for="i in 8" :key="i" style="margin-bottom: 15px;" @click="handleClick" />
			</view>
			<NoData hideBtn v-else />
		</view>
	</scroll-view>
</template>

<script setup>
	import OrderPowerDetails from '@/pages/Order/components/OrderPowerDetails.vue';
	import CustomTitle from '@/pages/component/CustomTitle/index.vue';
	import NoData from '@/pages/component/NoData/index.vue';
	import Cell from '@/pages/component/Cell/index.vue';
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

	function handleClick() {
		uni.navigateTo({
			url: '/pages/Order/components/OutputDetails'
		})
	}
</script>

<style lang="scss" scoped>
	.output_record {
		padding: 15px;
	}
</style>