<template>
	<view class="playing-container">
		<song-bg v-if="hasLoad" :isShowLyr="isShowLyric" @showLyr="showLyr"></song-bg>
		<!-- 歌词 -->
		<song-lyric ref="lyric" v-show="isShowLyric" :lyric="lyric" @hideLyr="hideLyr"></song-lyric>
		<!-- 歌曲操作栏 -->
		<song-action v-show="!isShowLyric" @openSongInfo="openSongInfo"></song-action>
		<!-- 播放进度 -->
		<play-bar v-if="hasLoad" @timeUpdate="timeUpdate"></play-bar>
		<!-- 操作栏 -->
		<play-action @openPlayList="openPlayList" @changeSong="changeSong"></play-action>
		<!-- 歌曲信息 -->
		<song-infos v-if="showSongInfoBox"></song-infos>
		<!-- 播放列表 -->
		<playlist v-if="showPlayList" @changeSong="changeSong"></playlist>
		<!-- 遮罩层 -->
		<view v-show="showMask" class="mask-container" @tap="closeMask"></view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { getSongDetail, getSongUrl, checkSongUrl, getLyric } from '../../api/songs.js'
	import playBar from './componnets/playBar.vue'
	import songLyric from './componnets/lyric.vue'
	import songBg from './componnets/songBg.vue'
	import playAction from './componnets/playAction.vue'
	import songAction from './componnets/songAction.vue'
	import songInfos from './componnets/songInfo.vue'
	import playlist from './componnets/playlist.vue'
	let audioCtx = uni.getBackgroundAudioManager()
	export default {
		components: {
			playBar,
			songLyric,
			songBg,
			playAction,
			songAction,
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
				showPlayList: false,
				hasLoad: false
			}
		},
		onLoad(options) {
			console.log(options)
			this.playId = options.playId
			this.playListId = options.playListId
			this.getSongDetail(this.playId)
			this.getSongUrl(this.playId)
			this.getLyric(this.playId)
			this.$store.commit('song/SET_PLAY_ID', this.playId)
		},
		methods: {
			// 获取歌曲信息
			async getSongDetail(ids) {
				let res = await getSongDetail(ids)
				if (res.code !== 200 || !res.songs.length) {
					return
				}
				console.log(res)
				this.songInfo = res.songs[0]
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
				audioCtx.coverImgUrl = this.songInfo.al?.picUrl;
				audioCtx.singer = this.songInfo.ar ? this.songInfo.ar[0].name : '';
				audioCtx.title = this.songInfo.name;
				this.hasLoad = true
				this.$store.commit('song/SET_PLAYING', true)
			},
			// 获取歌词
			getLyric(id) {
				getLyric(id).then(res => {
					// console.log(res)
					this.lyric = res.lrc.lyric || ''
				})
			},
			showLyr() {
				this.isShowLyric = true
			},
			hideLyr() {
				this.isShowLyric = false
			},
			timeUpdate(currentTime) {
				this.$refs.lyric.update(currentTime)
			},
			// 打开歌曲信息
			openSongInfo() {
				this.showMask = true
				this.showSongInfoBox = true
			},
			openPlayList() {
				this.showPlayList = true
				this.showMask = true
			},
			closeMask() {
				this.showMask = false
				this.showSongInfoBox = false
				this.showPlayList = false
			},
			changeSong(item) {
				this.getSongDetail(item.id)
				this.getSongUrl(item.id)
				this.getLyric(item.id)
				this.$store.commit('song/SET_PLAY_ID', item.id)
			}
		}
	}
</script>

<style lang="scss" scoped>
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
