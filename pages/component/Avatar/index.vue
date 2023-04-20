<template>
	<view>
		<image :src="url" :style="{width : size + 'px',height: size + 'px',borderRadius: size + 'px'}" />
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';
	const url = ref('/static/mine/profile_icon_default.png');
	const {
		src,
		size
	} = defineProps({
		src: String,
		size: [Number, String]
	})

	onMounted(() => {
		if (src) {
			url.value = src;
		}
	})
</script>

<style lang="scss" scoped>
</style>