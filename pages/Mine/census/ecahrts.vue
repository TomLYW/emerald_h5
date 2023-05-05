<template>
	<view class="echarts">
		<qiun-data-charts type="area" :opts="opts" :chartData="tab === 1 ? btcLines : ethLines" tooltipFormat="pieDemo" />
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
	import { ref, reactive, computed, onMounted } from 'vue';
	import { formatDate } from '@/utils/index.js';
	const props = defineProps({
		data: Object
	})

	let tab = ref(1);

	let opts = reactive({
		color: ['#05AA84'],
		padding: [25, 0, 10, 0],
		enableScroll: false,
		dataLabel: false,
		dataPointShapeType: 'hollow',
		legend: {
			show: false
		},
		xAxis: {
			axisLine: false,
			axisLineColor: 'transparent'
		},
		yAxis: {
			gridType: "dash",
			data: [],
			format: "yAxisDemo2"
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
				legendShape: 'circle'
			}
		}
	})

	const btcLines = computed(() => {
		let arr = [];
		let categories = props.data.BTC.map(v => {
			arr.unshift(v.amount);
			return formatDate(v.yieldDate, 'MM-DD');
		});

		return {
			categories: categories.reverse(),
			series: [{
				name: "BTC",
				data: arr
			}]
		}
	})

	const ethLines = computed(() => {
		let arr = [];
		let categories = props.data.ETH.map(v => {
			arr.unshift(v.amount);
			return formatDate(v.yieldDate, 'MM-DD');
		});

		return {
			categories: categories.reverse(),
			series: [{
				name: "ETH",
				data: arr
			}]
		}
	})

	function handleChange(val) {
		tab.value = val;

		// y轴刻度调整
		if (val === 1) {
			let arr = btcLines.value.series[0].data;
			let max = Math.max(...arr);
			if (max > 1) {
				opts.yAxis.data = [{ max: Math.ceil(max), min: 0 }];
			} else {
				opts.yAxis.data = [];
			}
		} else if (val === 2) {
			let arr = ethLines.value.series[0].data;
			let max = Math.max(...arr);
			if (max > 1) {
				opts.yAxis.data = [{ max: Math.ceil(max), min: 0 }];
			} else {
				opts.yAxis.data = [];
			}
		}
	}

	onMounted(() => {
		handleChange(1);
		// console.log('looks', btcLines.value)
	})
</script>

<style lang="scss" scoped>
	.echarts {

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