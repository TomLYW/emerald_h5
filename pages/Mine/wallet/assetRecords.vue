<template>
	<view class="record_list">
		<Nav :title="$t('asset_r')" class="record_header">
			<template #left>
				<image src="/static/base/title_left_arrow.png" class="icon" @click="handleClick" />
			</template>
		</Nav>
		<view class="main" v-if="list.length">
			<CensusCell v-for="item in list" :key="item.id" :item="item" class="list_item" />
		</view>
		<NoData hideBtn v-else />
	</view>
</template>

<script setup>
	import CensusCell from '@/pages/component/CensusCell/index.vue';
	import NoData from '@/pages/component/NoData/index.vue';
	import Nav from '@/pages/component/Nav/index.vue';
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

	function handleClick() {
		history.back();
	}

	onMounted(() => {
		getData();
	})
</script>

<style lang="scss" scoped>
	.record_list {
		height: 100%;
		@include flex(null, null, column);

		.record_header {

			.icon {
				width: 23px;
				height: 17px;
			}
		}

		.main {
			flex: 1;
			padding: 15px;
			overflow-y: auto;

			.list_item {
				margin-bottom: 15px;
			}
		}
	}
</style>