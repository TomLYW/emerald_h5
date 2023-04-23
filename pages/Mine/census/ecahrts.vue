<template>
	<view class="echarts">
		<view class="main">
			<qiun-data-charts type="area" :opts="opts" :chartData="renderData" />
		</view>
		<view class="btns">
			<view :class="['btn',tab === 1 ? 'selectBtn' : '']" @click="handleChange(1)">
				<image src="/static/home/home_icon_btc.png" class="img" />
				<text class="">BTC</text>
			</view>
			<view :class="['btn',tab === 2 ? 'selectBtn' : '']" @click="handleChange(2)">
				<image src="/static//home/home_icon_eth.png" class="img" />
				<text class="">ETH</text>
			</view>
		</view>

	</view>
</template>

<script setup>
	import { ref, reactive, computed, watch } from 'vue';
	import { formatDate } from '@/utils/index.js';
	const props = defineProps({
		data: Object
	})

	let tab = ref(1);

	let opts = {
		// height: '200',
		color: ['#05AA84'],
		padding: [35, 0, 0, 0],
		enableScroll: false,
		dataLabel: false,
		dataPointShapeType: 'hollow',
		legend: {
			show: false
		},
		xAxis: {
			axisLine: false,
			// axisLineColor:'transparent'
		},
		yAxis: {
			gridType: "dash",
			dashLength: 2
		},
		extra: {
			area: {
				type: "curve",
				opacity: 1,
				width: 2,
				gradient: true,
			},
			tooltip: {
				showCategory: true,
				legendShape: 'circle',
			},
			// markLine.data[i]:{
			// 	value:10
			// }
		}
	}

	let renderData = reactive({
		categories: [],
		series: [{
			name: "",
			data: []
		}, ]
	})

	const xx = computed(() => {
		let categories;
		if (tab.value === 1) {
			categories = props.data.BTC.filter(v => v.yieldDate);
		}
		console.log('loooks', categories)
		return categories;
		// return props.data;
	})

	// watch(props.data, (newVal, old) => {
	// 	console.log('xx', newVal, old)
	// })

	function handleChange(val) {
		tab.value = val;

		let categories;
		let series;
		if (val === 1) {
			categories = props.data.BTC.map(v => formatDate(v.yieldDate, 'MM-DD')).reverse();
			let arr = props.data.BTC.map(v => v.amount).reverse();
			renderData.series = [{
				name: 'BTC',
				data: arr
			}]
		} else if (val === 2) {
			categories = props.data.ETH.map(v => formatDate(v.yieldDate, 'MM-DD')).reverse();
			let arr = props.data.ETH.map(v => v.amount).reverse();
			renderData.series = [{
				name: 'ETH',
				data: arr
			}]
		}
		renderData.categories = categories
		// console.log('xx', categories)
	}
</script>

<style lang="scss" scoped>
	.echarts {
		.main {
			// height: 200px;
		}

		.btns {
			margin-top: 12px;
			@include flex(center, center);
			gap: 20px;

			.btn {
				@include flex(center);
				color: #666;
				font-size: 15px;
				padding: 2px 10px;
				border-radius: 12px;
				// border: 1px solid transparent;

				.img {
					width: 13px;
					height: 13px;
					margin-right: 4px;
				}
			}

			.selectBtn {
				background-color: #F3FFFC;
				border: 1px solid #04AA84;
			}
		}
	}
</style>