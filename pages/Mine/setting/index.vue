<template>
	<scroll-view scroll-y="true" style="height: 100%;">
		<view class="setting">
			<view class="caption">{{$t('基本信息')}}</view>
			<SelectCell :options="options1" class="mb15">
				<template #right1>
					<Avatar size='36' :src="user.userInfo.avatar" class="mr10" />
				</template>
				<template #right2>
					<text class="rcs mr10">{{user.userInfo.nickname}}</text>
				</template>
			</SelectCell>
			<view class="caption">{{$t('支付设置')}}</view>
			<SelectCell :options="options2" class="mb15">
				<template #right1>
					<text class="rcs mr10">{{$t('去设置')}}</text>
				</template>
				<template #right2>
					<text class="rcs mr10">{{user.userInfo.isSet2fa ?$t('已绑定'):$t('未绑定')}}</text>
				</template>
			</SelectCell>
			<view class="caption">{{$t('账号设置')}}</view>
			<SelectCell :options="options3" class="mb15">
				<template #right1>
					<text class="rcs mr10">{{$t('去修改')}}</text>
				</template>
				<template #right2>
					<text class="rcs mr10">{{user.userInfo.email ? user.userInfo.email :$t('去绑定')}}</text>
				</template>
			</SelectCell>
			<view class="caption">{{$t('语言')}}</view>
			<SelectCell :options="options4" class="mb15" />
			<view class="login_out" @click="handleOut">
				{{$t('退出登录')}}
			</view>
		</view>
	</scroll-view>
</template>

<script setup>
	import SelectCell from '@/pages/component/SelectCell/index.vue';
	import { useUserStore } from '@/store/user.js';
	import Avatar from '@/pages/component/Avatar/index.vue';
	import config from '@/http/config.js';
	import { updateAvatar } from '@/services/user.js';
	import Toast from '@/hooks/useToast.js';
	import I18n from '@/hooks/useLocale.js';
	const user = useUserStore();


	const options1 = [{
			label: '头像',
			callback: updataAvatar
		},
		{
			label: '昵称',
			url: '/pages/Mine/setting/setNickname'
		}
	]
	const options2 = [{
			label: '支付密码',
			url: '/pages/Mine/setting/changePayPassword'
		},
		{
			label: '谷歌验证',
			url: '/pages/Mine/setting/bindGoogle',
			hideArrow: user.userInfo.isSet2fa ? true : false
		}
	]
	const options3 = [{
			label: '登录密码',
			url: '/pages/Mine/setting/modifyPassword'
		},
		{
			label: '邮箱',
			hideArrow: user.userInfo.email ? true : false,
			url: '/pages/Mine/setting/bindEmail'
		}
	]
	const options4 = [{
		label: uni.getLocale() === 'zh' ? '繁體中文' : 'English',
		url: '/pages/Mine/setting/setLanguage'
	}, ]

	function handleOut() {
		user.loginOut();
		uni.reLaunch({
			url: '/pages/Home/index'
		});

	}

	function updataAvatar() {
		uni.chooseImage({
			success: function(res) {
				Toast.show(I18n.t('上传图片'), { type: 'loading' })
				uni.uploadFile({
					url: config.baseUrl + '/v1/user/upload',
					// url: 'http://192.168.0.42:5173/v1/user/upload',
					filePath: res.tempFilePaths[0],
					name: 'file',
					header: {
						'X-Access-Token': uni.getStorageSync('token'),
						'X-Lang': uni.getLocale() === 'zh' ? 'zh_CN' : 'en_US',
					},
					success: (res) => {
						const obj = JSON.parse(res.data);
						if (obj.code === 0) {
							updateAvatar({ avatar: obj.data }).then(res => {
								if (res.code === 0) {
									Toast.show(I18n.t("修改成功"), {
										type: 'success'
									});
								} else {
									Toast.show(res.message);
								}
							})
						} else {
							Toast.show(obj.message);
						}
					}
				});
			}
		});
	}
</script>

<style lang="scss" scoped>
	.setting {
		padding: 15px;

		.mb15 {
			margin-bottom: 15px;
		}

		.caption {
			margin-bottom: 12px;
			font-size: 13px;
			color: #666;
		}

		.mr10 {
			margin-right: 10px;
		}

		.rcs {
			color: #666;
			font-size: 15px;
		}

		.login_out {
			background-color: red;
			color: #fff;
			font-size: 18px;
			font-weight: bold;
			text-align: center;
			padding-top: 12px;
			padding-bottom: 12px;
			border-radius: 12px;
			box-shadow: 0px 0px 10px -6px #000;
			margin-top: 35px;

			&:active {
				opacity: 0.7;
			}
		}
	}
</style>