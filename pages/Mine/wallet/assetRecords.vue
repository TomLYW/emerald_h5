<template>
	<view class="record_list">
		<view class="main" v-if="list.length">
			<CensusCell v-for="item in list" :key="item.id" :item="item" class="list_item" />
		</view>
		<NoData hideBtn v-else />
	</view>
</template>

<script setup>
	import CensusCell from '@/pages/component/CensusCell/index.vue';
	import NoData from '@/pages/component/NoData/index.vue';
	import { getAssetLogs } from '@/services/mine.js';
	import { ref, onMounted } from 'vue';
	let list = ref([]);


	function getData() {
		getAssetLogs({ page: 1, limit: 100 }).then(res => {
			if (res.code === 0) {
				list.value = res.data;
			}
		})
	}

	onMounted(() => {
		getData();
	})
</script>

<style lang="scss" scoped>
	.record_list {
		height: 100%;
		overflow-y: auto;

		.main {
			padding: 15px;

			.list_item {
				margin-bottom: 15px;
			}
		}
	}
</style>