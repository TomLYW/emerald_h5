<template>
	<view class="record_main">
		<Nav class="record_nav" :title="$t('output_r')">
			<template #left>
				<image src="/static/base/title_left_arrow.png" class="icon" @click="handleBack" />
			</template>
		</Nav>
		<view class="output_record">
			<OrderMinerList :item="pageData.details" v-if="'status' in pageData.details" />
			<CustomTitle :title="$t('output_r')" />
			<Cell v-for="item in pageData.records" :key="item.id" style="margin-bottom: 15px;" :item="item" @click="handleClick(item)" />
			<NoData hideBtn v-show="!pageData.records.length" class="empty" />
		</view>
	</view>
</template>

<script setup>
	import OrderMinerList from '@/pages/Order/components/OrderMinerList.vue';
	import CustomTitle from '@/pages/component/CustomTitle/index.vue';
	import NoData from '@/pages/component/NoData/index.vue';
	import Cell from '@/pages/component/Cell/index.vue';
	import Nav from '@/pages/component/Nav/index.vue';
	import { reactive } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { getMinerOrderDetails, getMinerRecord } from '@/services/order.js';
	let pageData = reactive({
		records: [],
		details: {}
	})

	function handleBack() {
		history.back();
	}

	function handleClick(val) {
		uni.navigateTo({
			url: `/pages/Order/components/OutputDetails?id=${val.id}&type=${val.currency}`
		})
	}

	function getRecords(id) {
		getMinerRecord({
			orderId: id,
			page: '1',
			limit: 100
		}).then(res => {
			if (res.code === 0) {
				pageData.records = res.data;
			}
		})
	}

	function getMinerDetails(id) {
		getMinerOrderDetails({
			id
		}).then(res => {
			if (res.code === 0) {
				pageData.details = res.data;
			}
		})
	}

	onLoad((option) => {
		getMinerDetails(option.id);
		getRecords(option.id);
	})
</script>

<style lang="scss" scoped>
	.record_main {
		height: 100%;
		@include flex(null, null, column);

		.record_nav {
			.icon {
				width: 23px;
				height: 17px;
			}
		}

		.output_record {
			flex: 1;
			overflow-y: auto;
			padding: 10px 15px 15px;

			.empty {
				height: fit-content;
				margin-top: 60px;
			}
		}
	}
</style>