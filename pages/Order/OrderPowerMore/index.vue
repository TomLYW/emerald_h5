<template>
	<scroll-view scroll-y="true" height="100%">
		<view class="output_record">
			<OrderPowerDetails :item="pageData.details" v-if="'status' in pageData.details" />
			<CustomTitle :title="$t('output_r')" />
			<view v-if="pageData.records.length">
				<Cell v-for="item in pageData.records" :key="item.id" style="margin-bottom: 15px;" :item="item" />
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
	import {
		reactive
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		getPowerRecord,
		getPowerOrderDetails
	} from '@/services/order.js';

	let pageData = reactive({
		records: [],
		details: {}
	})

	function getOrderDetails(id) {
		getPowerOrderDetails({
			id
		}).then(res => {
			if (res.code === 0) {
				pageData.details = res.data;
			}
		})
	}

	function getRecords(id) {
		getPowerRecord({
			orderId: id,
			page: '1',
			limit: 100
		}).then(res => {
			if (res.code === 0) {
				pageData.records = res.data;
			}
		})
	}

	onLoad((option) => {
		getOrderDetails(option.id);
		getRecords(option.id);
	})
</script>

<style lang="scss" scoped>
	.output_record {
		padding: 15px;
	}
</style>