<template>
	<view class="playlist-detail-container">
		<view class="playlist-info-content">
			<view class="backgroun-img">
				<image :src="playlist.picUrl"></image>
			</view>
			<view class="content-box">
				<view class="playlist-cover">
					<image :src="playlist.picUrl"></image>
				</view>
				<view class="playlist-info">
					<view class="playlist-name">{{ playlist.name }}</view>
					<view class="playlist-artist">
						<image class="artist-avatar" :src="playlist.dj.avatarUrl"></image>
					    <text class="artist-name"> {{ playlist.dj.nickname }}</text>
					</view>
					<view class="category-list">
						<view class="category-item">{{ playlist.category }}</view>
						<view class="category-item">{{ playlist.secondCategory }}</view>
					</view>
				</view>
			</view>
			<view class="radio-desc">{{ playlist.desc }}</view>
			<view class="playlist-count">
				<view class="count-item">{{ playlist.shareCount }}</view>
				<view class="count-item">{{ playlist.commentCount }}</view>
				<view class="count-item active">收藏({{ playlist.subCount }})</view>
			</view>
		</view>
		<view class="playlist-list">
			<view class="playlist-item" v-for="(ele, playlistIndex) in programs" :key="playlistIndex" @click="gotoPlaying(ele)">
				<image class="cover-image" :src="ele.coverUrl" />
				<view class="cover-info">
					<view class="cover-title">
						<text>{{ ele.name }}</text>
					</view>
					<view class="cover-sub">
						<text>{{ getTime(ele.createTime) }} - </text>
						<text>{{ ele.listenerCount }}</text>
						<text>{{ dateFormat(ele.duration) }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getDJDetail, getDJProgram } from '../../api/dj.js'
	export default {
		data() {
			return {
				programs: [],
				radioId: '',
				playlist: {}
			}
		},
		onLoad(options) {
			this.radioId = options.radioId
			// this.playlist = JSON.parse(options.radioInfo)
			this.getDJDetail(this.radioId)
			this.getDJProgram(this.radioId)
		},
		methods: {
			getDJProgram(rid) {
				getDJProgram({ rid }).then(res => {
					// console.log(res)
					this.programs = res.programs || []
				})
			},
			getDJDetail(id) {
				getDJDetail(id).then(res => {
					// console.log(res)
					this.playlist = res.data
				})
			},
			getTime(time) {
				return new Date(time).toLocaleDateString()
			},
			// 补零
			formatTime(sec) {
			  return sec < 10 ? '0' + sec : sec
			},
			dateFormat(sec) {
			  // 分钟
			  const min = Math.floor(sec / 1000 / 60)
			  sec = Math.floor(sec / 1000 % 60)
			  return this.formatTime(min) + ':' + this.formatTime(sec)
			},
			gotoPlaying(item) {
				// 保存当前歌曲信息
				let playlist = this.programs.map(ele => ele.mainSong)
				this.$store.commit('song/SET_PLAYLIST', playlist)
				uni.navigateTo({
					url: '/pages/Sprinkler/components/play?playId=' + item.id + '&playlistId=' + this.playlist.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.playlist-detail-container {
		.playlist-info-content {
			// height: 400rpx;
			padding: 30rpx;
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
			    height: 50%;
				.playlist-cover {
					width: 200rpx;
					image {
					    width: 160rpx;
					    height: 160rpx;
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
						font-size: 30rpx;
						color: #fff;
						line-height: 1.6;
						.alias {
							color: #ccc;
						}
					}
					.playlist-artist {
					    color: #cecece;
					    display: flex;
					    align-items: center;
					    justify-content: flex-start;
					    font-size: 24rpx;
						.artist-avatar {
						    width: 40rpx;
						    height: 40rpx;
						    border-radius: 50%;
						    margin-right: 10rpx;
						}
					}
					.category-list {
						display: flex;
						justify-content: space-around;
						padding: 20rpx 0 10rpx 0;
						.category-item {
							background: #635f5f;
							color: #fff;
							padding: 0 10rpx;
							font-size: 22rpx;
							border-radius: 8rpx;
							height: 44rpx;
							line-height: 44rpx;
							margin-right: 10rpx;
						}
					}
					.artist-des {
					    color: #ccc;
					    font-size: 22rpx;
					    text-overflow: -o-ellipsis-lastline;
					    overflow: hidden;
					    text-overflow: ellipsis;
					    display: -webkit-box;
					    -webkit-line-clamp: 3;
					    line-clamp: 3;
					    -webkit-box-orient: vertical;
					    line-height: 1.4;
					}
				}
			}
			.radio-desc {
				color: #fff;
				font-size: 22rpx;
				line-height: 1.4;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				line-clamp: 3;
				-webkit-box-orient: vertical;
			}
			.playlist-count {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 30rpx;
				.count-item {
					width: 26%;
					height: 70rpx;
					background: #fff;
					border-radius: 70rpx;
					color: #333;
					text-align: center;
					line-height: 70rpx;
					&.active {
						width: 38%;
						color: #fff;
						background: #FF3333;
					}
				}
			}
		}
		.playlist-list {
			margin-top: 30rpx;
			.playlist-item {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-bottom: 30rpx;
				padding: 0 30rpx;
				.cover-image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 20rpx;
				}
				.cover-info {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: flex-start;
					flex: 1;
					padding-left: 30rpx;
					.cover-title {
						font-size: 28rpx;
						color: #000;
						width: 80%;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.cover-sub {
						font-size: 24rpx;
						color: #8c8a89;
					}
					.secondCategory {
						color: #ffa500;
						font-size: 20rpx;
					}
				}
			}
		}
	}
</style>
