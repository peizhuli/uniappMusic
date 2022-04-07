<template>
	<view>
		<view class="action-container">
			<view class="icon">
				<image :src="PlayWay" mode="widthFix" 
				@tap="hanlePlayWay"  />
			</view>
			<view class="icon">
				<image src="../../../static/playing/ajh.png" mode="widthFix"
				@tap="hanlelast"  />
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
				@tap="playlistOpen"
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
			...mapState('song', ['isPlaying', 'playlist', 'playId']),
		},
		data() {
			return {
				isRadom: false, // 随机播放
				isloop: true, // 循环播放
				PlayWay: '../../../static/playing/cm2_icn_loop@2x.png',
				playing: false
			}
		},
		created() {
			//注册操作事件
			this.getCompoents();
			//判断是播放顺序
 			switch(this.playwaynum) {
				case 1:
					this.PlayWay='../../../static/playing/cm2_icn_loop@2x.png'
					this.isshuffle=false,
					this.isloop=false
				break;
				case 2:
					this.PlayWay='../../../static/playing/cm2_icn_shuffle@2x.png';
					this.isshuffle=true;
					this.isloop=false;
				break;
				case 3:
					this.PlayWay='../../../static/playing/cm2_icn_one@2x.png';
					this.isshuffle=false,
					this.isloop=true
				break;
			}
			//非自然结束播放下一首
			// app.watchend(this.watchBackend);
		},
		methods: {
			//非自然结束播放下一首
			watchBackend(value){
				uni.showToast({
					title: '为您播放下一首',
					icon: 'success',
				});
				this.hanlenext();
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
			//设置新的音乐src 
			getMusicSrc(id,Single){
				this.$emit('setId',id,Single)
			},
			//处理播放顺序
			hanlePlayWay(){
				let {PlayWay}=this;
				let {playwaynum}=this;
				if(playwaynum==1){
				  playwaynum+=1;
				  PlayWay='../../../static/playing/cm2_icn_shuffle@2x.png'; 
				  uni.showToast({
				    title: '随机播放',
				    icon: 'success',
				  });
				  this.isshuffle=true;
				  this.isloop=false;	
				}
				else if (playwaynum==2){
				    playwaynum+=1;
				    PlayWay='../../../static/playing/cm2_icn_one@2x.png';
				    wx.showToast({
						title: '单曲循环',
						icon: 'success',
				    });
				    this.isshuffle=false,
				    this.isloop=true
				}
				else{
				    playwaynum=1
				    PlayWay='../../../static/playing/cm2_icn_loop@2x.png';
				    uni.showToast({
						title: '列表循环',
						icon: 'success',
				    });
				    this.isshuffle=false,
				    this.isloop=false
				}
				this.PlayWay=PlayWay;
				this.$store.commit('setPlaywaynum', playwaynum)
			},
			//上一曲
			hanlelast(){
				if(this.playlist.length < 2){
					uni.showToast({
						title: '此曲为单曲',
						icon: 'none',
					});					
				}
				// 随机播放
				else if(this.isRadom){
					this.playRandom()
				}
				else{
					let length = this.playlist.length;
					let index = 0
					for (let i = 0; i < this.playlist.length; i++) {
						if (this.playlist[i].id === this.playId) {
							index = i
						}
					}
					let song = index === 0 ? this.playlist[length - 1] : this.playlist[index - 1];
					this.$emit('changeSong', song)
				}
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
			//下一曲
			hanlenext() {			
				if(this.playlist.length < 2){
					uni.showToast({
						title: '此曲为单曲',
						icon: 'none',
					})
				}
				else if(this.isRadom){
				    this.playRandom()
				}
				else{
					let length = this.playlist.length;
					let index = 0
					for (let i = 0; i < this.playlist.length; i++) {
						if (this.playlist[i].id === this.playId) {
							index = i
						}
					}
					let song = index === length - 1 ? this.playlist[0] : this.playlist[index + 1]
					this.$emit('changeSong', song)
				}
			},
			//打开播放列表
			playlistOpen(){
				this.$emit('openPlayList')
			},
			//随机播放事件
			playRandom(){
			    let length = this.playlist.length;
				if(length < 2){
					let song = this.playlist.filter(item => item.id === this.playId)
					this.$emit('changeSong', song[0])
					return;
				}
				let index = this.GetRandomNum(0, length);
				this.$emit('changeSong', this.playlist[index])
			  },
			//随机函数
			GetRandomNum(Min, Max) {
			    let Range = Max - Min;
			    let Rand = Math.random();
			    return(Min + Math.round(Rand * Range));
			},
			//播放结束事件
			handleIsshuffle(){
				if(this.isloop) {
					let song = this.playlist.filter(item => item.id === this.playId)
					this.$emit('changeSong', song[0])
				} else {
				  if(this.isRadom){
				    this.playRandom();
				  }
				  else{
				    this.hanlenext();
				  }
				}
			},
			
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
