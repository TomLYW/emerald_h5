<template>
	<view class="select_amount">
		<text class="title">{{$t('选择数量')}}</text>
		<view class="box">
			<image class="img" src="/static/detail/detail_icon_reduce.png" @click="reduce" />
			<text class="middle">{{count}}</text>
			<image class="img" src="/static/detail/detail_icon_add.png" @click="add" />
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		watch
	} from 'vue';
	const {
		stock
	} = defineProps({
		stock: Number,
		modelValue: Number
	})

	const emit = defineEmits(['update:modelValue']);

	let count = ref(0);

	function reduce() {
		if (count.value > 1) {
			count.value--;
		}
	}

	function add() {
		if (count.value < stock) {
			count.value++;
		}
	}

	watch(count, (newVal, oldVal) => {
		emit('update:modelValue', newVal)
	})

	onMounted(() => {
		if (stock > 0) {
			count.value = 1;
		}
	})
</script>

<style lang="scss" scoped>
	.select_amount {
		border-radius: 15px;
		box-shadow: 0px 0px 10px -8px;
		padding: 15px;
		background-color: #fff;

		.title {
			color: #999;
			font-size: 12px;
		}

		.box {
			@include flex(center);
			border: 1px solid #DFDFDF;
			padding: 12px 15px;
			border-radius: 12px;
			margin-top: 12px;

			.img {
				width: 39px;
				height: 28px;

				&:active {
					opacity: 0.5;
				}
			}

			.middle {
				flex: 1;
				text-align: center;
				font-size: 18px;
				color: #333;
				font-weight: bold;
			}
		}
	}
</style>