<template>
	<view class="census">
		<Tabs v-model="tab" tab1="BTC" tab2="ETH" showBack :callback="onBack" />
		<view class="main" v-if="(list.tab1.length && tab === 1) || (list.tab2.length && tab === 2)">
			<CensusCell v-for="item  in (tab === 1 ? list.tab1 : list.tab2)" :key="item.id" :item="item" class="census_cell_item" />
		</view>
		<NoData hideBtn v-else />
	</view>
</template>

<script setup>
	import Tabs from '@/pages/component/Tabs/index.vue';
	import CensusCell from '@/pages/component/CensusCell/index.vue';
	import NoData from '@/pages/component/NoData/index.vue';
	import { getYields } from '@/services/mine.js';
	import { ref, reactive, onMounted } from 'vue';
	let tab = ref(1);
	let list = reactive({ tab1: [], tab2: [] });

	function getData1() {
		getYields({ currency: "BTC", page: 1, limit: 100 }).then(res => {
			if (res.code === 0) {
				list.tab1 = res.data;
			}
		})
	}

	function getData2() {
		getYields({ currency: "ETH", page: 1, limit: 100 }).then(res => {
			if (res.code === 0) {
				list.tab2 = res.data;
			}
		})
	}

	function onBack() {
		uni.switchTab({
			url: '/pages/Mine/index'
		})
	}

	onMounted(() => {
		getData1();
		getData2();
	})
</script>

<style lang="scss" scoped>
	.census {
		height: 100%;
		@include flex(null, null, column);

		.main {
			flex: 1;
			overflow-y: auto;
			padding: 15px;

			.census_cell_item {
				margin-bottom: 15px;
			}
		}
	}
</style>