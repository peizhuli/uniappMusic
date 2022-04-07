<template>
	<view class="daily-recommend-container">
		<view class="playlist-list-2">
			<view class="playlist-item" v-for="(ele, playlistIndex) in recommondSongs" :key="playlistIndex" @click="gotoPlaylist(ele.id)">
				<image class="cover-image" :src="ele.coverImgUrl" />
				<view class="cover-info">
					<view class="cover-title">
						<text>{{ ele.name }}</text>
					</view>
					<view class="cover-sub">
						<text>{{ ele.ar[0].name }}</text>
						<text>{{ ele.ar[0].name }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getRecommendSongs } from '../../api/songs.js'
	export default {
		data() {
			return {
				recommondSongs: []
			}
		},
		created() {
			this.getRecommendSongs()
		},
		methods: {
			getRecommendSongs() {
				const userinfo = uni.getStorageSync('userinfo')
				if(!userinfo){
					uni.showToast({
					  title: '请先登录',
					  icon: 'none',
					});
				}
				getRecommendSongs().then(res => {
					console.log(res)
					this.recommondSongs = res.result || []
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.daily-recommend-container {
	
}
</style>
