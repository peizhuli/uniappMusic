<template>
	<view class="playlist-detail-container">
		<view class="playlist-info-content">
			<view class="backgroun-img">
				<image :src="playlist.coverImgUrl"></image>
			</view>
			<view class="content-box">
				<view class="playlist-cover">
					<image :src="playlist.coverImgUrl"></image>
				</view>
				<view class="playlist-info">
					<view class="playlist-name">{{ playlist.name }}</view>
					<view class="playlist-artist">{{ playlist.creator.nickname }}</view>
					<view class="artist-des">{{ playlist.creator.signature }}</view>
				</view>
			</view>
		</view>
		<view class="playlist-list-content">
			<view class="statistic-content">
				<view class="statistic-item" v-for="item in statistics" :key="item.text">
					<image :src="item.pic"></image>
				</view>
			</view>
			<view class="playlist-list">
				<view class="playlist-item" v-for="(item, index) in playlist.tracks" :key="index" @click="gotoPlaying(item)">
					<view class="item-index">{{ index + 1 }}</view>
					<view class="item-info">
						<view class="item-name">
							<text>{{ item.name }}</text>
						    <text class="alias" v-if="item.alia.length">{{ item.alia[0] }}</text>
						</view>
						<view class="item-artist" @click.stop="gotoArtist(item.ar[0].id)">
							<text>{{ item.ar[0].name }}</text>
							<text v-if="item.ar.length > 1"> / {{ item.ar[1].name }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getPlayListDetail } from '../../api/songs.js'
	export default  {
		data() {
			return {
				playlistId: '',
				statistics: [
					{
						pic:'../../static/icon/collect.png',
						text:'收藏'
					},
					{
						pic:'../../static/icon/comment.png',
						text:'评论',
						url:"../comment/comment"
					},
					{
						pic:'../../static/icon/share.png',
						text:'分享'
					}
				],
				playlist: {}
			}
		},
		onLoad(options) {
			this.playlistId = options.playlistId
			this.getPlayListDetail(this.playlistId)
		},
		methods: {
			getPlayListDetail(id) {
				getPlayListDetail(id).then(res => {
					console.log(res)
					this.playlist = res.playlist
				})
			},
			gotoPlaying(item) {
				// 保存当前歌曲信息
				this.$store.commit('song/SET_PLAYLIST', this.playlist.tracks)
				uni.navigateTo({
					url: '/pages/play/play?playId=' + item.id + '&playlistId=' + this.playlistId
				})
			},
			gotoArtist(id) {
				uni.navigateTo({
					url: '/pages/artist/artist?artistId=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.playlist-detail-container {
		.playlist-info-content {
			height: 400rpx;
			position: relative;
			.backgroun-img {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: -1;
				overflow: hidden;
				image {
					top: -90%;
					left: -90%;
					width: 200%;
					height: 200%;
					-webkit-filter: blur(12px);
					filter: blur(50rpx);
					border-radius: 0 0 200rpx 200rpx;
					position: relative;
				}
			}
			.content-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 100%;
				padding: 30rpx;
				.playlist-cover {
					width: 250rpx;
					image {
					    width: 220rpx;
					    height: 220rpx;
						border-radius: 20rpx;
					}
				}
				.playlist-info {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: flex-start;
					.playlist-name {
						height: 120rpx;
						font-size: 30rpx;
						color: #fff;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
						.alias {
							color: #ccc;
						}
					}
					.playlist-artist {
						color: #ccc;
					}
					.artist-des {
						color: #ccc;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						line-clamp: 1;
						-webkit-box-orient: vertical;
					}
				}
			}
		}
		.playlist-list-content {
			.statistic-content {
				width: 70%;
				height: 80rpx;
				padding: 20rpx 40rpx;
				margin: 0 auto;
				position: relative;
				top: -30rpx;
				border-radius: 40rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #fff;
				box-shadow: 0px 0px 10px 1px rgba(189, 189, 189,  0.5);
				.statistic-item {
					font-size: 24rpx;
					color: #333;
					image {
						width: 50rpx;
						height: 50rpx;
					}
				}
			}
			.playlist-list {
				padding: 30rpx;
				.playlist-item {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					margin-bottom: 30rpx;
					.item-index {
						width: 60rpx;
						color: #ccc;
					    font-size: 34rpx;
					}
					.item-info {
						flex: 1;
						.item-name {
							color: #000;
							font-weight: 30rpx;
						}
						.item-artist {
							font-size: 24rpx;
							color: #8a8a8a;
						}
					}
				}
			}
		}
	}
</style>
