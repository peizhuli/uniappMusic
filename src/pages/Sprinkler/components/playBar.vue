<template>
	<view class="playbar-container">
		<view class="current-time">
			<text>{{ currentTimeText }}</text>
		</view>
		<view class="slide-bar">
			<slider class="slider" v-model="currentTime" min="0" :max="duration" @change="sliderChange" activeColor="#ffffff" backgroundColor="#dddddd" block-color="#dfd8d8" block-size="6" />
		</view>
		<view class="total-time">
			<text>{{ totalTime }}</text>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	let audioCtx = uni.getBackgroundAudioManager()
	export default {
		data() {
			return {
				currentTimeText: '00:00',
				totalTime: '00:00',
				percent: 0,
				movableDis: 0,
				duration: 0,
				currentTime: 0,
				currentSec: 1
			}
		},
		computed: {
			...mapState('song', ['playUrl'])
		},
		mounted() {
			this.getBgmTime()
			setTimeout(() => {
				this.getallTiem()
			}, 1000)
		},
		watch: {
			playUrl(val) {
				this.getBgmTime()
				setTimeout(() => {
					this.getallTiem()
				}, 1000)
			}
		},
		methods: {
			getBgmTime(){
				//进度更新事件
				audioCtx.onTimeUpdate(()=>{
					//播放时间进度
					this.currentTime = audioCtx.currentTime
					let sec = this.currentTime.toString().split('.')[0]
					if(sec !== this.currentSec){
						let played = this.dateFormat(this.currentTime)
						this.currentTimeText = played.min+ ':' + played.sec
						this.currentSec = sec;
						this.$emit('timeUpdate', this.currentTime)
					}
				})
			},
			//总时间
			getallTiem(){
				this.duration  = audioCtx.duration;
				let alltime = this.dateFormat(this.duration);
				this.totalTime = alltime.min + ':' + alltime.sec;
			},
			// 格式化时间
			dateFormat(sec) {
			  // 分钟
			  const min = Math.floor(sec / 60)
			  sec = Math.floor(sec % 60)
			  return {
				'min': this.formatTime(min),
				'sec': this.formatTime(sec),
			  }
			},
			// 补零
			formatTime(sec) {
			  return sec < 10 ? '0' + sec : sec
			},
			sliderChange(event) {
				let val = event.detail.value
				this.currentTime = val
				audioCtx.pause()
				audioCtx.seek(val)
				audioCtx.play()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.playbar-container {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		width: 100%;
		// position: absolute;
		bottom: 160rpx;
		left: 0;
		z-index: 5;
		.current-time {
			flex: 2;
			text-align: center;
			color: #fff;
		}
		.total-time {
			flex: 2;
			text-align: center;
			color: #eee;
		}
		.slide-bar {
			flex: 10;
			padding-top: 6rpx;
			.slider {
				margin: 0 10rpx;
			}
		}
		.movable-view {
		  width: 36rpx;
		  height: 36rpx;
		  image{
			   width: 100%;
			   border-radius: 50%;
		  }
		}
	}
</style>
