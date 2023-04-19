<template>
	<view class="electric">
		<!-- <Nav title="会发生" :callback="onClick" :titleStyle="{color:'#f60',fontSize:'30px'}"/> -->
		<!-- <InputBox v-model="xx" /> -->
	</view>
</template>

<script setup>
	import InputBox from '@/pages/component/InputBox/index.vue';
	import Nav from '@/pages/component/Nav/index.vue';
	import { ref } from 'vue';
	let xx = ref('');

	function onClick() {
		console.log('撒旦撒')
	}
</script>

<style lang="scss" scoped>
</style>