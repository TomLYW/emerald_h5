<template>
	<view>
		<image :src="url" :style="{width : size + 'px',height: size + 'px',borderRadius: size + 'px'}" />
	</view>
</template>

<script setup>
	import { ref, onMounted, watch } from 'vue';
	const props = defineProps({
		src: String,
		size: [Number, String]
	})

	let url = ref('/static/mine/profile_icon_default.png');

	watch(() => props.src, (newVal) => {
		url.value = newVal ? newVal : '/static/mine/profile_icon_default.png';
	})

	onMounted(() => {
		if (props.src) {
			url.value = props.src;
		}
	})
</script>

<style lang="scss" scoped>
</style>