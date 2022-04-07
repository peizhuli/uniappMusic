<template>
	<view class="playing-container">
		<view class="background-content">
			<view v-if="songInfo.al.picUrl" class="background_one">
				<image :src="songInfo.al.picUrl+'?param=300y500'" mode="scaleToFill" />
			</view>
			<image v-else class="background_two" src="../../../static/playing/playground.jpg" mode="scaleToFill"/> 
		</view>
		<view v-show="!isShowLyr">
			<view class="playing-content" :class="{ playing: isPlaying }">
				<image class="playing-img" src="../../../static/playing/aag.png" mode="widthFix" />
			</view>
			<view class="pic" > 
				<image src="../../../static/playing/play.png" class="paly_max" mode="widthFix"
				 @tap="isShow" :style="{'animation-play-state': playState}" />
				<image :src="songInfo.al.picUrl" class="play_min stop" mode="scaleToFill" 
				:style="{'animation-play-state': playState}" @tap="showLyr" />
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
				width: 750upx;
				height: 750upx;
				top: 15vh;
				left: 60%;
				transform: translateX(-50%);
				z-index: 7;
				.paly_max {
					width: 80%;
					animation: disc 20s linear infinite;
					animation-play-state:paused;
					border-radius: 50%; 
					box-shadow:4upx 4upx 15upx #666
				}
				.play_min {
					position: absolute;
					top: 23%;
					left: 23%;
					width: 35%;
					height: 35%;
					border-radius: 50%;
					transform: translateX(50%);
					animation: disc 20s linear infinite;  
				}
				@keyframes disc {
					from {
						-webkit-transform: rotate(0deg);
					}
					to {
						-webkit-transform: rotate(360deg);
					}
				}
			}
	}
</style>
