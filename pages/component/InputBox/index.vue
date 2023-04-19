<template>
	<view class="input_box">
		<view class="boxs" @click="handleClick">
			<view class="box" v-for="i in number" :key="i">
				<text>{{input.length > i - 1  ? '●' : ''}}</text>
			</view>
		</view>
		<input type="number" :maxlength='number' @input="handleChange" class="ipt" :focus="focus" @blur="focus = false" />
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	const props = defineProps({
		number: {
			type: Number,
			default: 6
		},
		modelValue: String
	})

	const emit = defineEmits(['update:modelValue']);

	let input = ref('');
	let focus = ref(false);

	function handleChange(e) {
		input.value = e.detail.value;
		emit('update:modelValue', e.detail.value);
	}

	function handleClick() {
		focus.value = true;
	}
</script>

<style lang="scss" scoped>
	.input_box {
		background-color: #fff;
		padding-top: 15px;
		padding-bottom: 15px;
		position: relative;

		.boxs {
			@include flex();
			margin-left: 15px;
			margin-right: 15px;
			gap: 10px;

			.box {
				flex: 1;
				width: 45px;
				height: 45px;
				border-radius: 12px;
				background-color: #F0F0F0;
				@include flex(center, center);
			}
		}

		.ipt {
			position: absolute;
			bottom: 0;
			color: transparent;
			z-index: -10;
		}
	}
</style>