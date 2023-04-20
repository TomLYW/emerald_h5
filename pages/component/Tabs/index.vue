<template>
	<view class="tabs">
		<image src="../../../static/base/title_leftarrow_white.png" class="left_back" @click="callback" v-show="showBack" />
		<view class="tab_content">
			<view class="tab" @click="handleChange(1)">
				<text :class="tabIndex === 1 ? 'cf' : ''"> {{tab1}} </text>
				<view class=" line" v-show="tabIndex === 1" />
			</view>
			<view class="tab" @click="handleChange(2)">
				<text :class="tabIndex === 2 ? 'cf' : ''">{{tab2}}</text>
				<view class="line" v-show="tabIndex === 2" />
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	defineProps({
		tab1: String,
		tab2: String,
		showBack: Boolean,
		callback: Function
	})

	const emit = defineEmits(['onChange']);

	let tabIndex = ref(1);

	function handleChange(val) {
		tabIndex.value = val;
		emit('onChange', val);
	}
</script>

<style lang="scss" scoped>
	.tabs {
		background-color: #05AA84;
		padding: 10px 15px;
		display: flex;
		align-items: center;

		.left_back {
			width: 22px;
			height: 18px;
		}

		.tab_content {
			flex: 1;
			display: flex;
			justify-content: space-evenly;
			align-items: center;

			.tab {
				color: #A4E7D7;
				font-size: 18px;
				font-weight: bold;

				.line {
					height: 2px;
					background-color: #fff;
					border-radius: 2px;
					margin-top: 6px;
				}
			}
		}

		.cf {
			color: #fff;
		}
	}
</style>