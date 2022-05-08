<template>
	<view>
		<view class="action-container">
			<view class="icon">
				<image src="../../../static/playing/cm2_play_icn_love@2x.png" mode="widthFix" />
			</view>
			<view class="icon">
				<image src="../../../static/playing/cm2_play_icn_cmt@2x.png" mode="widthFix" 
				@tap="tocomment"  />
			</view>
			<view class="icon">
				<image :src="isPlaying ? '../../../static/playing/ajd.png' : '../../../static/playing/ajf.png'"
				 @tap="handlePlay" class="temp" mode="widthFix" />
			</view>
			<view class="icon">
				<image src="../../../static/playing/ajb.png" mode="widthFix"
				@tap="hanlenext"  />
			</view>
			<view class="icon">
				<image src="../../../static/playing/cm2_icn_list@2x.png" mode="widthFix" 
				@tap="playRelevantOpen"
				/>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	let audioCtx=uni.getBackgroundAudioManager();
	let app=getApp();
	export default {
		computed: {
			...mapState('song', ['isPlaying', 'playId']),
		},
		data() {
			return {
				playing: false
			}
		},
		created() {
			//注册操作事件
			this.getCompoents();
		},
		methods: {
			//非自然结束播放下一首
			watchBackend(value){
				uni.showToast({
					title: '为您播放下一首',
					icon: 'success',
				});
				this.$emit('nextSong')
			},
			//注册操作事件
			getCompoents(){
				audioCtx.onPlay(() => {
					/* console.log("开始播放"); */
					this.$store.commit('isPlay', true)
					this.$emit('play')
				})
				//监听暂停事件
				audioCtx.onPause(()=>{
					/* console.log("暂停播放"); */
					this.$store.commit('isPlay', false)
				})
				//注册结束事件
				audioCtx.onEnded(()=>{
				   this.handleIsshuffle()
				})
			},
			//暂停事件
			handlePlay(){
				if(this.isPlaying){	
					audioCtx.pause();
				}
				else{
					audioCtx.play();
				}
				this.$store.commit('song/SET_PLAYING', !this.isPlaying)
			},
			//播放结束事件
			handleIsshuffle(){
				this.$emit('nextSong')
			},
			tocomment(){
				uni.navigateTo({
					url:'/pages/comment/comment?playId=' + this.playId
				})
			},
			playRelevantOpen(){
				this.$emit('openSongInfo')
			},
			hanlenext() {
				this.$emit('nextSong')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.action-container{
		width: 100%;
		padding: 0 60rpx;
		position: absolute;
		z-index: 6;
		bottom: 10rpx;
		left: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.icon{
			image {
				width: 60rpx;
				&.temp{
					width: 140rpx;
				}
			}
		}
	}
</style>
