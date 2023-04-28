<template>
	<Popup v-model:show="isShow" round position="bottom" :close-on-click-overlay="modelShow" :style="{padding:'15px'}">
		<view class="section">
			<view class="part_head">
				<text class="title">{{$t('请输入验证码')}}</text>
				<image src="/static/base/login_icon_close.png" class="close_icon" @click="handleClose" />
			</view>
			<view class="second_tip">{{$t('验证码将发送到：')}}{{emailEncryption(user.userInfo.email)}}</view>
			<Field :placeholder="$t('请输入验证码')" class="ipt" @update:model-value="handleChange" maxlength='6' v-model="code">
				<template #button>
					<text class="code" @click="handleSend">{{count=== 61 ? $t('获取验证码') : count + $t('s后获取')}}</text>
				</template>
			</Field>
			<Button native-type="submit" block class="btn" :disabled="btnState" @click="options.callback(code)">{{$t('确认')}}</Button>
		</view>
	</Popup>
</template>

<script setup>
	import { Popup, Field, Button } from 'vant';
	import { ref, computed } from 'vue';
	import { emailEncryption } from '@/utils/index.js';
	import { useUserStore } from '@/store/user.js';
	import { sendCode } from '@/services/user.js';
	import Toast from '@/hooks/useToast.js';
	const user = useUserStore();

	const props = defineProps({
		show: Boolean,
		options: Object,
	})

	const emit = defineEmits(['update:show']);

	let count = ref(61);
	let modelShow = ref(false);
	let btnState = ref(true);
	let code = ref('');

	function handleClose() {
		emit('update:show', false);
	}

	function handleChange(val) {
		if (val.length > 5) {
			btnState.value = false;
		} else {
			btnState.value = true;
		}
	}

	// 定时器
	const startTimer = () => {
		let timer = setInterval(() => {
			count.value -= 1;

			if (count.value === 0) {
				count.value = 61;
				if (timer !== null) {
					clearInterval(timer);
				}
			}
		}, 1000);
	}

	//获取验证码
	const handleSend = () => {
		const parmas = {
			accountType: 'email',
			authType: props.options.authType,
			account: user.userInfo.email
		}
		if (count.value !== 61) return;

		sendCode(parmas).then(res => {
			if (res.code === 0) {
				Toast.show(t('发送成功'), {
					type: 'success'
				})
				startTimer();
			} else {
				Toast.show(res.message);
			}
		})
	}

	const isShow = computed(() => {
		return props.show;
	})
</script>

<style lang="scss" scoped>
	.section {
		.part_head {
			@include flex(center, space-between);
			margin-bottom: 15px;

			.title {
				font-size: 18px;
				font-weight: bold;
			}

			.close_icon {
				width: 16px;
				height: 16px;
			}
		}

		.second_tip {
			color: #666;
			font-weight: bold;
			margin-bottom: 20px;
		}

		.ipt {
			margin-bottom: 24px;
			border: 1px solid #ccc;
			padding: 10px;
			border-radius: 10px;
		}

		.code {
			color: #05AA84
		}

		.btn {
			background-color: #05AA84;
			color: #fff;
			border-radius: 10px;
			font-size: 18px;
		}
	}
</style>