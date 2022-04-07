<template>
	<view class="comment-container">
		<view class="song-info-container">
			<view v-if="songInfo.al.picUrl" class="avatar">
				<image :src="songInfo.al.picUrl" mode="scaleToFill" />
			</view>
			<view class="artist-info">
				<view class="song-name">{{ songInfo.name }}</view>
				<view v-if="songInfo.alia.length" class="cover-alia">({{ songInfo.alia[0] }})</view>
				<view class="artist-name"> - {{ songInfo.ar[0].name }}</view>
			</view>
		</view>
		<view class="comment-content">
			<view class="comment-title">
				<view class="title">评论区</view>
				<view class="comment-type">
					<text class="type-item" :class="{ active: !isHot }" @click="changeCommentType(0)">最新</text>
					<text class="type-item" :class="{ active: isHot }" @click="changeCommentType(1)">最热</text>
				</view>
			</view>
			<view class="comment-list">
				<view class="comment-item" v-for="(item, index) in currentComments" :key="index">
					<view class="user-img">
						<image :src="item.user.avatarUrl" />
					</view>
					<view class="comment-info">
						<view class="comment-user">
						    <view class="user-info">
								<view class="user-name">
									{{ item.user.nickname }}
								</view>
								<view class="comment-time">{{ item.timeStr }}</view>
							</view>
							<view class="like-count">
								<text>{{ item.likedCount }}</text>
							</view>
						</view>
						<view class="comment-text">
							<rich-text :nodes="item.content"></rich-text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { getMusicComment, getFloorComment } from '../../api/comment.js'
	export default {
		data() {
			return {
				playId: '',
				hotComments: [],
				latestComments: [],
				isHot: false,
				currentComments: []
			}
		},
		computed: {
			...mapState('song', ['songInfo'])
		},
		onLoad(options) {
			// 获取歌曲评论
			this.playId = options.playId
			this.getMusicComment({ id: this.playId })
		},
		methods: {
			getMusicComment(id) {
				getMusicComment(id).then(res => {
					// console.log(res)
					this.hotComments = [...this.hotComments, ...res.hotComments]
					this.latestComments = [...this.latestComments, ...res.comments]
					// for (let i = 0; i < this.hotComments.length; i++) {
					// 	getFloorComment({ id: this.hotComments[i].commentId, type: 0 }).then(res => {
					// 		console.log(res)
					// 	})
					// }
					this.currentComments = this.isHot ? this.hotComments : this.latestComments
				})
			},
			changeCommentType(type) {
				this.isHot = Boolean(type)
				this.currentComments = this.isHot ? this.hotComments : this.latestComments
			}
		}
	}
</script>

<style lang="scss" scoped>
.comment-container {
	background: #f5f5f5;
	.song-info-container {
		display: flex;
		padding: 0 20rpx;
		align-items: center;
		height: 100rpx;
		width: 100%;
		margin-bottom: 16rpx;
		background: #fff;
		.avatar {
			width: 100rpx;
			height: 100rpx;
			padding: 16rpx;
			text-align: center;
			border-radius: 50%;
			background-color: #333;
			image {
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
			}
		}
		.artist-info {
			width: calc(100% - 100rpx);
			flex: 1;
			padding-left: 20rpx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			.song-name {
				font-weight: 600;
			}
			.cover-alia {
				white-space: nowrap;
				max-width: 40%;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.artist-name {
				color: #ccc;
			}
		}
	}
	.comment-content {
		padding: 0 30rpx;
	    background: #fff;
		.comment-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 0;
			.title {
				font-weight: 600;
			    font-size: 30rpx;
			}
			.comment-type {
				.type-item {
					margin-left: 20rpx;
					color: #ccc;
					&.active {
						color: #333;
					}
				}
			}
		}
		.comment-list {
			.comment-item {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				padding-top: 20rpx;
				.user-img {
					image {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
					}
				}
				.comment-info {
					flex: 1;
					padding-left: 20rpx;
					.comment-user {
						display: flex;
						justify-content: space-between;
						align-items: center;
						.user-info {
							.user-name {
								font-weight: 600;
								font-size: 26rpx;
								color: #4c4c4c;
							}
							.comment-time {
								font-size: 20rpx;
								color: #ccc;
							}
						}
						.like-count {
							color: #ccc;
						}
					}
					.comment-text {
						padding: 10rpx 0 20rpx 0;
						border-bottom: 1rpx solid #eaeaea;
					}
				}

			}
		}
	}
}
</style>
