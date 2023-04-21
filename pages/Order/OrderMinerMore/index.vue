<template>
	<scroll-view scroll-y="true" style="height: 100%;">
		<view class="output_record">
			<OrderMinerList :item="pageData.details" v-if="'status' in pageData.details" />
			<CustomTitle :title="$t('output_r')" />
			<view v-if="pageData.records.length">
				<Cell v-for="item in pageData.records" :key="item.id" style="margin-bottom: 15px;" :item="item" @click="handleClick(item)" />
			</view>
			<NoData hideBtn v-else />
		</view>
	</scroll-view>
</template>

<script setup>
	import OrderMinerList from '@/pages/Order/components/OrderMinerList.vue';
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
		getMinerOrderDetails,
		getMinerRecord
	} from '@/services/order.js';
	let pageData = reactive({
		records: [],
		details: {}
	})


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
	.output_record {
		padding: 15px;
	}
</style>