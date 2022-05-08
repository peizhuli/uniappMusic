<template>
	<view class="play-widget-container">
		<view class="play-widget-content">
			<view class="song-info" @click="gotoPlaying">
				<image class="song-img" :src="songInfo.al.picUrl"></image>
				<text>{{ songInfo.name }}</text>
			</view>
			<view class="play-action-content">
				<image :src="isPlaying ? '../../static/icon/play-icon.png' : '../../static/icon/stop-icon.png'"
				 @tap="handlePlay" class="action-icon" mode="widthFix" />
				 <image src="../../static/icon/playlist-icon.png"  class="action-icon" mode="widthFix"
				 @tap="playlistOpen"
				 />
			</view>
		</view>
		<!-- 播放列表 -->
		<playlist v-if="showPlayList" @changeSong="changeSong"></playlist>
		<!-- 遮罩层 -->
		<view v-show="showMask" class="mask-container" @tap="closeMask"></view>
	</view>
</template>

<script>
	import playlist from './componnets/playlist.vue'
	let audioCtx = uni.getBackgroundAudioManager()
	export default {
		components: {
			playlist
		},
		data() {
			return {
				showPlayList: false,
				showMask: false
			}
		},
		computed: {
			songInfo() {
				return this.$store.state.song.songInfo
			},
			isPlaying() {
				return this.$store.state.song.isPlaying
			}
		},
		methods: {
			openPlayList() {
				this.showPlayList = true
				this.showMask = true
			},
			closeMask() {
				this.showMask = false
				this.showPlayList = false
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
			// 获取歌曲信息
			async getSongDetail(ids) {
				let res = await getSongDetail(ids)
				if (res.code !== 200 || !res.songs.length) {
					return
				}
				this.$store.commit('song/SET_SONG_INFO', this.songInfo)
				// 设置标题
				let title = this.songInfo.name
				if (this.songInfo.alia.length) {
					title += '(' + this.songInfo.alia[0] + ')'
				}
				uni.setNavigationBarTitle({
					title 
				})
			},
			// 获取歌曲音频
			async getSongUrl(id) {
				let res = await getSongUrl(id).catch(() => {})
				if (res.code !== 200 || !res.data || !res.data.length) {
					return
				}
				let song = res.data[0].url
				// 保存歌曲信息
				this.$store.commit('song/SET_PLAY_URL', song)
				audioCtx.src = song
				this.$store.commit('song/SET_PLAYING', true)
			},
			changeSong(item) {
				this.getSongDetail(item.id)
				this.getSongUrl(item.id)
				this.$store.commit('song/SET_PLAY_ID', item.id)
			},
			playlistOpen() {
				this.showPlayList = true
				this.showMask = true
			},
			gotoPlaying() {
				uni.navigateTo({
					url: '/pages/play/play?playId=' + this.songInfo.id + '&isFromWidget = true'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.play-widget-container {
		.play-widget-content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 100rpx;
			padding: 0 30rpx;
			background-color: #fff;
			box-shadow: inset 0px 0px 3px 1px #d2d2d287;
			.song-info {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.song-img {
					width: 80rpx;
					height: 80rpx;
					margin-right: 16rpx;
					border-radius: 50%;
				}
			}
			.play-action-content {
				.action-icon {
					width: 80rpx;
					height: 80rpx;
					margin-left: 20rpx;
				}
			}
		}
	}
	.mask-container {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 9;
		background-color: #0000007a;
	}
</style>
