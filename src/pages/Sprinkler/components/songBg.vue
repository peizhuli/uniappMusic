<template>
	<view class="pic" > 
		<image :src="program.coverUrl" class="play_min" mode="scaleToFill" />
	</view>	
</template>

<script>
	export default {
		props: ['program']
	}
</script>

<style lang="scss" scoped>
	.pic {
	    width: 100%;
	    height: 30%;
	    margin: 60rpx 0 30rpx 0;
	    z-index: 7;
	    display: flex;
	    justify-content: center;
	    align-items: center;
		.play_min {
		    width: 400rpx;
		    height: 400rpx;
		}
		.song-name {
			position: relative;
			margin-top: 30rpx;
			font-size: 30rpx;
			color: #fff;
			font-weight: 600;
			text-align: center;
		}
		.artist-name {
			position: relative;
			color: #c5c5c5;
			font-size: 24rpx;
			text-align: center;
		}
	}
</style>
