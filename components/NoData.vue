<template>
	<view class='content'>
		<image class="icon" src='/static/base/base_bottom_title.png' />
		<text class="title">{{$t('值得信赖的矿机服务平台')}}</text>
   </view>
</template>

<script>
</script>

<style lang="scss" scoped>
   .content{
        flex: 1;
   		flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100px;
    }
   	.icon{
        width: 110px;
        height: 24px;
    }
   	.title{
   		font-size: 12px;
   		text-align: center;
        color: #999999;
   		margin-top: 10px;
    }
</style>