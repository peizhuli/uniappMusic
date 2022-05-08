<template>
	<view class="user-container">
		<view class="user-content">
			<view class="user-info">
				<view class="avatar-container">
					<image v-if="userInfo" :src="userInfo.profile.avatarUrl"></image>
					<image v-else src="../../static/avatar.png"></image>
				</view>
				<text v-if="userInfo" class="user-name">{{ userInfo.account.userName }}</text>
				<text v-else class="user-login" @click="goLogin">立即登录</text>
				<view v-if="userInfo" class="user-count">
					<text class="count-item">{{ userInfo.profile.follows }}关注</text>
					<text class="count-item">{{ userInfo.profile.followeds }}粉丝</text>
					<text class="count-item">{{ userInfo.account.name }}</text>
				</view>
			</view>
		</view>
		<view class="icon-bar-container">
			<view class="icon-list">
				<view class="icon-item" v-for="item in iconbars" :key="item.id">
					<image :src="item.icon" />
					<view class="icon-name">{{ item.name }}</view>
				</view>
			</view>
		</view>
		<view class="like-container">
			<view class="icon-content">
				<image class="icon" src="../../static/icon/cm2_discover_icn_fm-ip6@2x.png" />
				<view class="like-count">
					<view class="like-text">我喜欢的音乐</view>
					<view>{{ likeCount }}首</view>
				</view>
			</view>
			<view class="cardiac-mode">
				<text>心动模式</text>
			</view>
		</view>
		<view class="playlist-container">
			<view class="playlist-header">
				<view class="title-item">
					<text>创建歌单</text>
				</view>
				<view class="title-item">
					<text>收藏歌单</text>
				</view>
			</view>
			<view class="playlist-content">
				<view class="playlist-list">
					<view class="list-header">
						<text>创建歌单({{ playlist.length }})</text>
						<view class="operation-box">
							<icon class="add-icon">+</icon>
							<icon class="more-icon">...</icon>
						</view>
					</view>
					<view class="list-content">
						<view class="list-item" v-for="item in playlist" :key="item.id">
							<view class="icon-content">
								<image class="icon" :src="item.coverImgUrl" />
								<view class="playlist-info">
									<view class="info-name">{{ item.name }}</view>
									<view class="info-count">{{ item.trackCount }}首</view>
								</view>
							</view>
							<view class="more-icon">
								<icon>...</icon>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<play-widget v-if="playId"></play-widget>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { getPlayList } from '../../api/user.js'
	import playWidget from '../play/playWidget.vue'
	export default {
		components: {
			playWidget
		},
		data() {
			return {
				likeCount: 0,
				playlist: [],
				iconbars: [
					{
						id: 1,
						icon: '../../static/icon/cm2_discover_icn_mv@2x.png',
						name: '最近播放'
					},
					{
						id: 2,
						icon: '../../static/icon/cm2_discover_icn_mv@2x.png',
						name: '我的好友'
					},
					{
						id: 3,
						icon: '../../static/icon/home_4.png',
						name: '收藏和赞'
					},
					{
						id: 4,
						icon: '../../static/icon/cm2_discover_icn_newest@2x.png',
						name: '我的播客'
					}
				]
			}
		},
		computed: {
			...mapState('song', ['isPlaying', 'playlist', 'playId']),
			userInfo() {
				return this.$store.state.user.userInfo
			}
		},
		watch: {
			userInfo(val) {
				this.getPlayList()
			}
		},
		created() {

		},
		methods: {
			goLogin() {
				uni.navigateTo({
					url: '/pages/login/login',
					animationType: 'slide-in-right'
				})
			},
			getPlayList() {
				getPlayList({ uid: this.userInfo.account.id , limit: 3, offset: 0 }).then(res => {
					// console.log(res)
					this.playlist = res.playlist || []
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.user-container {
	width: 750rpx;
	padding: 30rpx;
    background-color: #f5f5f5;
    box-sizing: border-box;
	.user-content {
		margin-top: 80rpx;
		border-radius: 30rpx;
		background-color: #fff;
		.user-info {
			width: 100%;
			height: 200rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
			.avatar-container {
				margin-top: -120rpx;
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.user-name {
				font-weight: 600;
				font-size: 40rpx;
			}
			.user-login {
				padding-top: 30rpx;
				font-size: 44rpx;
				font-weight: 600;
			}
			.user-count {
				.count-item {
					margin-right: 30rpx;
				}
			}
		}
	}
	.icon-bar-container {
		margin-top: 30rpx;
		padding: 40rpx;
		border-radius: 30rpx;
		background-color: #fff;
		.icon-list {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.icon-item {
				text-align: center;
				image {
					width: 60rpx;
					height: 60rpx;
				}
				.icon-name {
					font-size: 30rpx;
				}
			}
		}
	}
	.like-container {
		height: 160rpx;
		padding: 30rpx;
		margin-top: 30rpx;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.icon-content {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			image {
				width: 130rpx;
				height: 130rpx;
			}
		}
		.like-count {
			.like-text {
				font-size: 30rpx;
			}
		}
		.cardiac-mode {
			padding: 4rpx 20rpx;
			font-size: 20rpx;
			border: 1rpx solid #ccc;
			border-radius: 30rpx;
		}
	}
	.playlist-container {
		.playlist-header {
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin: 30rpx 0;
			.title-item {}
			.operation-box {
				font-size: 30rpx;
				.add-icon {
					margin-right: 30rpx;
				}
			}
		}
		.playlist-content {
			padding: 30rpx;
			background-color: #fff;
			.playlist-list {
				.list-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.list-content {
					.list-item {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-top: 20rpx;
						.icon-content {
							display: flex;
							justify-content: flex-start;
							align-items: center;
							.icon {
								width: 100rpx;
								height: 100rpx;
								border-radius: 30rpx;
							}
							.playlist-info {
								padding-left: 30rpx;
								.info-name {
									font-size: 30rpx;
								}
								.info-count {
									font-size: 20rpx;
								}
							}
						}
						.more-icon {}
					}
				}
			}
		}
	}
}
</style>
