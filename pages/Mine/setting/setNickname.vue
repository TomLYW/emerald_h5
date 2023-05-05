<template>
	<view class="set_nickname">
		<Nav :title="$t('昵称')" :callback="callback">
			<template #right>
				<text class="right_btn" @click="handleClick">{{$t('确定')}}</text>
			</template>
		</Nav>
		<view class="main">
			<Field class="ipt" v-model="name" :placeholder="$t('修改昵称')" maxlength="20">
				<template #right-icon>
					<view>
						<text class="num">{{name.length}}</text>/20
					</view>
				</template>
			</Field>
		</view>

	</view>
</template>

<script setup>
	import Nav from '@/pages/component/Nav/index.vue';
	import { Field } from 'vant';
	import { modifyNickname } from '@/services/user.js';
	import { useUserStore } from '@/store/user.js';
	import Toast from '@/hooks/useToast.js';
	import I18n from '@/hooks/useLocale.js';
	import { loadUserInfo } from '@/hooks/useGlobal.js';
	import { ref } from 'vue';
	const user = useUserStore();
	let name = ref(user.userInfo.nickname);

	function handleClick() {
		if (name.value && name.value !== user.userInfo.nickname) {
			Toast.show(I18n.t('正在保存'));
			modifyNickname({ nickname: name.value }).then(res => {
				if (res.code === 0) {
					loadUserInfo();
					Toast.show(I18n.t('保存成功'), { type: 'success' });
					history.back();
				} else {
					Toast.show(res.message)
				}
			})
		}
	}

	function callback() {
		history.back();
	}
</script>

<style lang="scss" scoped>
	.set_nickname {

		.right_btn {
			color: #666;

			&:active {
				opacity: 0.7;
			}
		}

		.main {
			padding: 15px;
			border-top: 0.5px solid #BEBEBE;

			.ipt {
				border-radius: 12px;
				box-shadow: 0px 0px 10px -4px #000;
				padding-top: 12px;
				padding-bottom: 12px;
				margin-top: 8px;
			}

			.num {
				color: #05AA84;
			}
		}
	}
</style>