<template>
	<view class="sprink-container">
		<view class="background-content">
			<view v-if="program.coverUrl" class="background_one">
				<image :src="program.coverUrl+'?param=300y500'" mode="scaleToFill" />
			</view>
			<image v-else class="background_two" src="../../../static/playing/playground.jpg" mode="scaleToFill"/> 
		</view>
		<song-bg v-if="hasLoad" :program="program"></song-bg>
		<!-- 歌曲操作栏 -->
		<!-- <song-action v-show="!isShowLyric" @openSongInfo="openSongInfo"></song-action> -->
		<!-- 播放进度 -->
		<play-bar v-if="hasLoad" @timeUpdate="timeUpdate"></play-bar>
		<!-- 操作栏 -->
		<!-- <play-action @openSongInfo="openSongInfo" @nextSong="getPersonalFM"></play-action> -->
		<!-- 歌曲信息 -->
		<!-- <song-infos v-if="showSongInfoBox"></song-infos> -->
		<playlist v-if="hasLoad" :catSongs="catSongs"></playlist>
		<!-- 遮罩层 -->
		<view v-show="showMask" class="mask-container" @tap="closeMask"></view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import playBar from './playBar.vue'
	import songBg from './songBg.vue'
	import playAction from './playAction.vue'
	import songInfos from './songInfo.vue'
	import playlist from './playlist.vue'
	import { getDJProgramDetail } from '../../../api/dj.js'
	import { getSongDetail, getSongUrl, checkSongUrl } from '../../../api/songs.js'
	let audioCtx = uni.getBackgroundAudioManager()
	export default {
		components: {
			playBar,
			songBg,
			playAction,
			songInfos,
			playlist
		},
		data() {
			return {
				playId: '',
				playListId: '',
				lyric: '',
				songInfo: {},
				isShowLyric: false, // 是否显示歌词
				showSongInfoBox: false,
				showMask: false,
				hasLoad: false,
				catSongs: [],
				program: {}
			}
		},
		onLoad(options) {
			this.playId = options.playId
			this.playListId = options.playListId
			this.getProgrameDetail(this.playId)
		},
		methods: {
			getProgrameDetail(id) {
				this.hasLoad = false
				getDJProgramDetail(id).then(res => {
					console.log(res)
					let program = res.program || {}
					this.program = program
					// 当前电台歌曲列表
					this.catSongs = program.songs || []
					this.getSongDetail(program.mainSong.id)
					this.getSongUrl(program.mainSong.id)
					this.$store.commit('song/SET_PLAY_ID', program.mainSong.id)
				})
			},
			// 获取歌曲信息
			async getSongDetail(ids) {
				let res = await getSongDetail(ids)
				
				if (res.code !== 200 || !res.songs.length) {
					return
				}
				this.songInfo = res.songs[0]
				this.$store.commit('song/SET_SONG_INFO', this.songInfo)
				// 设置标题
				uni.setNavigationBarTitle({
					title: ''
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
				audioCtx.coverImgUrl = this.songInfo.al?.picUrl;
				audioCtx.singer = this.songInfo.ar ? this.songInfo.ar[0].name : '';
				audioCtx.title = this.songInfo.name;
				this.$store.commit('song/SET_PLAYING', true)
				this.hasLoad = true
			},
			timeUpdate(currentTime) {
				this.$refs.lyric.update(currentTime)
			},
			// 打开歌曲信息
			openSongInfo() {
				this.showMask = true
				this.showSongInfoBox = true
			},
			closeMask() {
				this.showMask = false
				this.showSongInfoBox = false
			}
		}
	}
</script>

<style lang="scss" scoped>
.sprink-container {
	height: 100vh;
	overflow: auto;
	.background-content {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: -1;
		.background_one {
			position: relative;
			width: 100%;
			height: 100%;
			overflow: hidden;
			// background-color:#3c3c3c;
			image{
				position: absolute;
				display: block;
				width: 150%;
				height: 150%;
				filter: blur(80upx);
				// opacity: 0.7;
			}
		}
		.background_two {
			width: 100%;
			height: 100%;      
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
}
</style>
