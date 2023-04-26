<template>
	<view class="power_main">
		<Nav class="power_nav" :title="$t('output_r')">
			<template #left>
				<image src="/static/base/title_left_arrow.png" class="icon" @click="handleClick" />
			</template>
		</Nav>
		<view class="output_record">
			<OrderPowerDetails :item="pageData.details" v-if="'status' in pageData.details" />
			<CustomTitle :title="$t('output_r')" />
			<Cell v-for="item in pageData.records" :key="item.id" style="margin-bottom: 15px;" :item="item" />
			<NoData hideBtn v-show="!pageData.records.length" class="empty" />
		</view>
	</view>
</template>

<script setup>
	import OrderPowerDetails from '@/pages/Order/components/OrderPowerDetails.vue';
	import CustomTitle from '@/pages/component/CustomTitle/index.vue';
	import NoData from '@/pages/component/NoData/index.vue';
	import Cell from '@/pages/component/Cell/index.vue';
	import Nav from '@/pages/component/Nav/index.vue';
	import { reactive } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { getPowerRecord, getPowerOrderDetails } from '@/services/order.js';

	let pageData = reactive({
		records: [],
		details: {}
	})

	function handleClick() {
		history.back();
	}

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
	.power_main {
		height: 100%;
		@include flex(null, null, column);

		.power_nav {
			.icon {
				width: 23px;
				height: 17px;
			}
		}

		.output_record {
			flex: 1;
			overflow-y: auto;
			padding: 6px 15px 15px;

			.empty {
				height: fit-content;
				margin-top: 60px;
			}
		}
	}
</style>