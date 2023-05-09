<template>
	<view class="force_notice">
		<view class="force_content">
			<view class="section_1">
				<image :src="current.list[0]?.annex[0]" class="img" />
			</view>
			<view class="section_2">
				<view class="check">
					<radio :checked="current.isChecked" color="#05AA84" class="radio" @click="handleClick" />
					<label class="label" @click="handleClick" :style="{color:current.isChecked ? '#111' : '#ccc'}">
						{{current.list[0]?.content}}
					</label>
				</view>
				<view class="btn" @click="handleConfirm"
					:style="{backgroundColor: current.isChecked ? '#05AA84' : '#ccc',color:current.isChecked ? '#fff' : 'gray'}">{{I18n.t('我已知晓')}}
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { reactive, onMounted, watch } from 'vue';
	import { getForceList, confirmForce, getThreshold } from '@/services/other.js';
	import I18n from '@/hooks/useLocale.js';
	import Popup from '@/hooks/useCustomPop.js';
	const props = defineProps({
		close: Function,
	})

	let current = reactive({
		isChecked: false,
		list: [],
	})

	function handleClick() {
		current.isChecked = !current.isChecked;
	}

	function handleConfirm() {
		if (!current.isChecked) return;

		if (current.list.length) {
			confirmForce({ nid: current.list[0].id }).then(res => {
				if (res.code === 0) {
					current.isChecked = false;

					let arr = JSON.parse(JSON.stringify(current.list));
					arr.splice(0, 1);
					current.list = arr;
				}
			})
		}
	}

	function showArrears() {
		getThreshold().then(res => {
			if (res.code === 0) {
				if (res.data.status > 0) {
					Popup.showTips(res.data);
				}
			}
		})
	}


	function getData() {
		getForceList().then(res => {
			if (res.code === 0) {
				if (!current.list.length) {
					props.close();
					showArrears();
					return;
				}
				current.list = res.data;
			}
		})
	}

	watch(() => current.list, (newVal) => {
		// if (!newVal.length) {
		// 	props.close();
		// 	// Popup.showTips({ status: 1, balance_time: "4" });
		// 	showArrears();
		// }
	})

	onMounted(() => {
		getData();
	})
</script>

<style lang="scss" scoped>
	.force_notice {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 9999;
		@include flex(center, center);
		word-wrap: break-word;
		text-align: justify;

		.force_content {
			width: 70%;
			background-color: #fff;
			border-radius: 5px;

			.section_1 {
				height: 300px;
				background-color: #ccc;
				padding: 10px;
				border-radius: 5px;

				.img {
					width: 100%;
					height: 100%;
				}
			}

			.section_2 {
				padding-left: 10px;
				padding-right: 10px;

				.check {
					@include flex(baseline);
					margin-top: 10px;

					.label {
						font-size: 14px;
					}

					.radio {
						transform: scale(0.7);
					}
				}

				.btn {
					text-align: center;
					padding-top: 10px;
					padding-bottom: 10px;
					border-radius: 30px;
					margin-top: 15px;
					margin-bottom: 15px;
				}

			}
		}
	}
</style>