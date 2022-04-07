<template>
	<view class="playlist-container">
		<view class="playlist-list">
				<view class="playlist-item" v-for="(item, index) in playlist" :key="index" @click="gotoPlaylistDetail(item.id)">
					<view class="song-img">
						<image :src="item.picUrl"></image>
						<view class="song-name">
							{{ item.name }}
						</view>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	import { getRecommendSongs, getRecommendResource } from '../../api/songs.js'
	export default {
		data() {
			return {
				playlist: []
			}
		},
		created() {
			this.getRecommendResource()
		},
		methods: {
			async getRecommendResource() {
				let res = await getRecommendResource(20)
				this.playlist = res.result || []
			}
		}
	}
</script>

<style lang="scss" scoped>
	.playlist-container {
		.playlist-list {
			padding: 30rpx 0;
		    display: flex;
		    flex-wrap: wrap;
		    justify-content: flex-start;
		    align-items: center;
			.playlist-item {
				white-space: break-spaces;
				vertical-align: top;
			    width: 33.33%;
			    padding: 10rpx 30rpx;
				.song-img {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					image {
						width: 200rpx;
						height: 200rpx;
						border-radius: 30rpx;
					}
				}
				.song-name {
					font-size: 26rpx;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
		}
	}
</style>
