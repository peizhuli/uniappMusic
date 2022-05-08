<template>
	<view class="personal-fm-container">
		<song-bg v-if="hasLoad" :isShowLyr="isShowLyric" @showLyr="showLyr"></song-bg>
		<!-- 歌词 -->
		<song-lyric ref="lyric" v-show="isShowLyric" :lyric="lyric" @hideLyr="hideLyr"></song-lyric>
		<!-- 歌曲操作栏 -->
		<song-action v-show="!isShowLyric" @openSongInfo="openSongInfo"></song-action>
		<!-- 播放进度 -->
		<play-bar v-if="hasLoad" @timeUpdate="timeUpdate"></play-bar>
		<!-- 操作栏 -->
		<play-action @openSongInfo="openSongInfo" @nextSong="getPersonalFM"></play-action>
		<!-- 歌曲信息 -->
		<song-infos v-if="showSongInfoBox"></song-infos>
		<!-- 遮罩层 -->
		<view v-show="showMask" class="mask-container" @tap="closeMask"></view>
	</view>
</template>

<script>
	import playBar from '../play/componnets/playBar.vue'
	import songLyric from '../play/componnets/lyric.vue'
	import songBg from './components/songBg.vue'
	import playAction from './components/playAction.vue'
	import songInfos from '../play/componnets/songInfo.vue'
	import { getPersonalFM } from '../../api/personalized.js'
	import { getSongDetail, getSongUrl, checkSongUrl, getLyric } from '../../api/songs.js'
	let audioCtx = uni.getBackgroundAudioManager()
	export default {
		components: {
			playBar,
			songLyric,
			songBg,
			playAction,
			songInfos
		},
		data() {
			return {
				playId: '',
				lyric: '',
				songInfo: {},
				isShowLyric: false, // 是否显示歌词
				showSongInfoBox: false,
				showMask: false,
				hasLoad: false
			}
		},
		computed: {
			userInfo() {
				return this.$store.state.user.userInfo
			}
		},
		created() {
			if (!this.userInfo) {
				uni.navigateTo({
					url: '/pages/login/login',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				return
			}
			this.getPersonalFM()
		},
		methods: {
			getPersonalFM() {
				this.hasLoad = false
				getPersonalFM().then(res => {
					// console.log(res)
					let data = res.data[0]
					this.playId = data.id
					this.getSongDetail(this.playId)
					this.getSongUrl(this.playId)
					this.getLyric(this.playId)
					this.$store.commit('song/SET_PLAY_ID', this.playId)
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
					title: '私人FM'
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
			closeMask() {
				this.showMask = false
				this.showSongInfoBox = false
			}
		}
	}
</script>

<style lang="scss" scoped>
.personal-fm-container {
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
