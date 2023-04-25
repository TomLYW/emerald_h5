<script>
	import 'vant/lib/button/style';
	import 'vant/lib/field/style';
	import 'vant/lib/form/style';
	import 'vant/lib/toast/style';
	import 'vant/lib/text-ellipsis/style';
	import 'vant/lib/circle/style';
	import 'vant/lib/dialog/style';
	import 'vant/lib/progress/style';
	import 'vant/lib/popup/style';
	import '@/styles/index.scss';


	import Toast from '@/hooks/useCustomPop.js';
	import { useUserStore } from '@/store/user.js';
	// const user = useUserStore();

	export default {
		setup() {
			// Toast.showPop('你身边的你的爸爸你', { title: '提示'},(e)=>{
			// 	console.log('急急急',e)
			// })

		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	uni-page-body,
	html,
	body {
		height: 100%;
		background-color: #F2F2F2;
	}
</style>