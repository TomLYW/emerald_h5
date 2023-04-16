<template>
	<view class="select_cell">
		<view class="cell_item" @click="handleJump(item)" v-for="(item,i) in options" :key="item.label"
			:style="{marginBottom : i < options.length - 1 ?'26px' :'0px'}">
			<view class="left">
				<image :src="item.icon" class="icon" v-show="item.icon" />
				<text>{{$t(item.label)}}</text>
			</view>
			<view class="right">
				<slot name="right"></slot>
				<image src="/static/base/next_right_arrow.png" class="arrow" />
			</view>
		</view>
		<slot name="bottom"></slot>
	</view>
</template>

<script setup>
	const props = defineProps({
		options: Array
	})


	const urlEnum = {
		'帮助中心': `http://h5.emeral.app/#/helpCenter/${uni.getLocale()}`,
		'联系客服': `http://h5.emeral.app/#/contact/${uni.getLocale()}`,
		'隐私条款': `http://h5.emeral.app/#/privacyPolicy/${uni.getLocale()}`,
		'用户协议': `http://h5.emeral.app/#/userAgreement/${uni.getLocale()}`,
	}

	function handleJump(val) {
		if (val.url) {
			uni.navigateTo({
				url: val.url
			})
		} else {
			uni.navigateTo({
				url: `/pages/Mine/webview/index?url=${urlEnum[val.label]}&title=${val.label}`
			})
		}
	}
</script>

<style lang="scss" scoped>
	.flex {
		display: flex;
		align-items: center;
	}

	.select_cell {
		box-shadow: 0px 0px 10px -6px #000;
		border-radius: 15px;
		padding: 15px;
		background-color: #fff;

		.cell_item {
			@extend .flex;
			justify-content: space-between;

			.left {
				@extend .flex;

				.icon {
					width: 24px;
					height: 24px;
					margin-right: 15px;
				}
			}

			.right {
				@extend .flex;

				.arrow {
					width: 12px;
					height: 16px;
				}
			}
		}
	}
</style>