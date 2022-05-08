<template>
	<view class="playing-container">
		<view class="background-content">
			<view v-if="songInfo.al.picUrl" class="background_one">
				<image :src="songInfo.al.picUrl+'?param=300y500'" mode="scaleToFill" />
			</view>
			<image v-else class="background_two" src="../../../static/playing/playground.jpg" mode="scaleToFill"/> 
		</view>
		<view v-show="!isShowLyr">
			<view class="pic" > 
				<image :src="songInfo.al.picUrl" class="play_min" mode="scaleToFill" 
				:style="{'animation-play-state': playState}" @tap="showLyr" />
				<view class="song-name">{{ songInfo.name }}</view>
				<view class="artist-name">{{ songInfo.ar[0].name }}</view>
			</view>	
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		props: {
			isShowLyr: {
				type: Boolean,
				default: () => false
			}
		},
		computed: {
			...mapState('song', ['isPlaying', 'songInfo']),
			playState() {
				return this.isPlaying ? 'running' : 'paused'
			}
		},
		methods: {
			//歌词是否显示
			showLyr(){
				this.$emit('showLyr');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.playing-container{
		height: 100vh;
		position: relative;
		overflow: hidden;
			.background-content {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 750upx;
				height: 1800upx;
				overflow: hidden;
				z-index: 1;
				.background_one {
					position: relative;
					width: 750upx;
					height: 1800upx;
					overflow: hidden;
					background-color:#3c3c3c;
					image{
						position: absolute;
						display: block;
						width: 115%;
						height: 115%;
						filter: blur(60upx);
						opacity: 0.7;
					}
				}
				.background_two {
					width: 750upx;
					height: 1800upx;       
				}
			}
			.playing-content {
				position: absolute;
				z-index: 8;
				top:-70upx;
				left: 40%;
				transform-origin: 70upx 70upx;
				transform: rotate(-30deg);
				transition: all 0.9s;
				image{
					width: 250upx;
				}
				&.playing {
					transform: rotate(0deg);
				}
			}
			.pic {
			    position: absolute;
			    width: 100%;
			    height: calc(100% - 200rpx);
				padding-top: 25%;
			    z-index: 7;
				.play_min {
					position: relative;
				    // top: 15%;
				    left: 5%;
				    width: 90%;
				    height: 60%;
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
	}
</style>
