<template>
	<view class="invite_main">
		<Nav :title="$t('invite')" class="invite_nav">
			<template #left>
				<image src="/static/base/title_left_arrow.png" class="icon" @click="handleClick" />
			</template>
		</Nav>
		<view class="invite">
			<view class="invite_header">
				<text class="title">{{$t('邀请码')}}</text>
				<text class="copy_num">{{copy.number}}</text>
				<text class="copy_btn" @click="handleCopy">{{$t('复制')}}</text>
			</view>
			<CustomTitle :title="$t('invite')" />
			<RecordCell v-for="item in copy.list" :key="item.id" :item="item" />
			<NoData hideBtn class="empty" v-show="!copy.list.length" />
		</view>
	</view>
</template>

<script setup>
	import Nav from '@/pages/component/Nav/index.vue';
	import CustomTitle from '@/pages/component/CustomTitle/index.vue';
	import NoData from '@/pages/component/NoData/index.vue';
	import RecordCell from '@/pages/Mine/invite/RecordCell.vue';
	import Toast from '@/hooks/useToast.js';
	import I18n from '@/hooks/useLocale.js';
	import {
		getInvitationCode,
		getInvitationList
	} from '@/services/mine.js';
	import {
		reactive,
		onMounted
	} from 'vue';

	let copy = reactive({
		number: '',
		list: []
	})

	function handleClick() {
		history.back();
	}

	function handleCopy() {
		if (copy.number) {
			uni.setClipboardData({
				data: I18n.t('欢迎使用Emerald，邀请用户注册得奖励！您得邀请码是：') + copy.number,
				showToast: false,
				success: () => {
					Toast.show(I18n.t('复制成功'), {
						type: 'success'
					});
				}
			});
		}
	}

	function getData() {
		getInvitationCode().then(res => {
			if (res.code === 0) {
				copy.number = res.data.code;
			}
		})

		getInvitationList().then(res => {
			if (res.code === 0) {
				copy.list = res.data;
			}
		})
	}

	onMounted(() => {
		getData();
	})
</script>

<style lang="scss" scoped>
	.invite_main {
		height: 100%;
		@include flex(null, null, column);

		.invite_nav {
			.icon {
				width: 23px;
				height: 17px;
			}
		}

		.invite {
			flex: 1;
			padding: 15px;
			overflow-y: auto;

			.empty {
				margin-top: 100px;
				height: fit-content;
			}

			.invite_header {
				height: 140px;
				box-shadow: 0px 0px 10px -8px;
				border-radius: 15px;
				background-color: #05AA84;
				background-image: url('/static/mine/refferal_icon_bg.png');
				background-repeat: no-repeat;
				background-size: cover;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.title {
					color: #E3F9F4;
					font-size: 14px;
				}

				.copy_num {
					margin-top: 10px;
					margin-bottom: 10px;
					color: #fff;
					font-size: 30px;
					font-weight: bold;
					letter-spacing: 9px;
				}

				.copy_btn {
					background-color: #fff;
					color: #05AA84;
					border-radius: 3px;
					padding: 3px 30px;
					box-shadow: 0px 0px 10px -6px #000;

					&:active {
						opacity: 0;
					}
				}
			}
		}
	}
</style>