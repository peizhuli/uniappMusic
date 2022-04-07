<template>
	<view class="playlist-container">
		<view class="list-title">
			<view class="title">
				当前播放
				<text class="count">({{ playlist.length }})</text>
			</view>
<!-- 			<view class="action-bar">
				<view class="hearting">
					<text>心动模式</text>
				</view>
			</view> -->
		</view>
		<view class="list-content">
			<view class="list-item" v-for="(item, index) in playlist" :key="index" @click="playSong(item)">
				<view class="song-name" :class="{ active: item.id == playId }">
					<text>{{ item.name }}</text>
					<text class="alias"> - {{ item.ar[0].name }}</text>
				</view>
				<view class="delete-icon">
					<image src="../../../static/icon/cm2_lay_icn_close_prs@2x.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {}
		},
		computed: {
			...mapState('song', ['playlist', 'playId'])
		},
		methods: {
			playSong(item) {
				this.$emit('changeSong', item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.playlist-container {
		width: 94%;
		height: 650rpx;
		padding: 30rpx;
		position: absolute;
		bottom: 0;
		left: 3%;
		border-radius: 30rpx 30rpx 0 0;
		background-color: #f5f5f5;
		opacity: 0.99;
		z-index: 10;
		.list-title {
			.title {
				font-size: 32rpx;
				font-weight: 600;
				.count {
					font-size: 26rpx;
					color: #b9b9b9;
				}
			}
		}
		.list-content {
			.list-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 30rpx;
				.song-name {
					width: 80%;
					font-size: 30rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					.alias {
						font-size: 24rpx;
						color: #ccc;
					}
					&.active {
						color: #F06431;
						.alias {
							color: #F06431;
						}
					}
				}
				.delete-icon {
					image {
						width: 30rpx;
						height: 30rpx;
					}
				}
			}
		}
	}
</style>
