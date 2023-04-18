<template>
	<view class="bottom_tips">
		<view class="header">
			<image src="/static/detail/detail_icon_line_left.png" class="img" />
			<text class="words">{{$t('购买须知')}}</text>
			<image src="/static/detail/detail_icon_line_right.png" class="img" />
		</view>
		<view class="tips_content">
			<text>{{$t('提供的服务不适用于以下（下称“受限人士“）:')}}</text>
		</view>
		<view class="tips_content">
			<text>1）{{$t('美国、中国大陆、克里米亚、古巴、伊朗、朝鲜和叙利亚的居民；')}}</text>
		</view>
		<view class="tips_content">
			<text>2）{{$t('根据适用的贸易制裁和出口合规法律，受到限制的任何实体或个人。在使用Bitdeer提供的服务前，请确认您不属于受限人士。')}}</text>
		</view>
		<view class="tips_content">
			<text>{{$t('如您属于受限人士且您使用我们提供的服务，由此导致的所有法律风险和责任将完全由您独立承担，同时我们有权拒绝向您提供服务，您无权要求我们退还任何款项。')}}</text>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.bottom_tips {
		margin-top: 15px;
		margin-bottom: 75px;

		.header {
			height: 60px;
			@include flex(center, center);

			.img {
				width: 50px;
				height: 2px;
			}

			.words {
				margin-left: 10px;
				margin-right: 10px;
			}
		}

		.tips_content {
			color: #999;
			font-size: 13px;
			line-height: 24px;
		}
	}
</style>