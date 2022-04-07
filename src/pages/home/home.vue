<template>
	<view class="home-container">
		<view class="search-container" @click="goPage({ url: '/pages/search/search' })">
			<!-- <view class="search-border"></view> -->
			<input class="search-border" type="text" disabled="true" placeholder="大家都在搜" />
		</view>
		<view class="banner-container">
			<banner></banner>
		</view>
		<scroll-view class="scroll-view_H" scroll-x="true">
			<view class="scroll-view-item_H" v-for="item in tabBars" :key="item.id" @click="goPage(item)">
				<view class="bar-icon">
					<image :src="item.icon" />
				</view>
				<view>{{ item.name }}</view>
			</view>
		</scroll-view>
		<view class="recommend-container">
			<view class="recommend-title">
				<text class="title">推荐歌单</text>
				<view class="more">
					<text>更多 &gt;</text>
				</view>
			</view>
			<scroll-view class="rcommend-list" scroll-x="true">
				<view class="recommend-item" v-for="(item, index) in recommondResources" :key="index" @click="gotoPlaylistDetail(item.id)">
					<view class="song-img">
						<image :src="item.picUrl"></image>
						<view class="song-name">
							{{ item.name }}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="top-list-container">
			<view class="recommend-title">
				<text class="title">排行榜</text>
				<view class="more">
					<text>更多 &gt;</text>
				</view>
			</view>
			<scroll-view class="top-content" scroll-x="true">
				<view class="top-list" v-for="(item, itemIndex) in topList" :key="itemIndex" @click="gotoPlaylistDetail(item.id)">
					<view class="top-title">
						<text>{{ item.name }} &gt;</text>
					</view>
					<view class="top-item" v-for="(ele, index) in item.songs" :key="index" @click="gotoPlaying(ele.id)">
						<view class="item-image">
							<image :src="ele.al.picUrl" />
							<view class="song-info">
								<view class="song-name">
									<text class="index">{{ index + 1 }}</text>
									<text>{{ ele.name }}</text>
									<text class="sub-name"> - {{ ele.ar[0].name }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { getRecommendSongs, getRecommendResource } from '../../api/songs.js'
	import { getTopList } from '../../api/toplist.js'
	import { getPlayListTrack } from '../../api/songs.js'
	import banner from './banner.vue'
	export default {
		components: {
			banner
		},
		data() {
			return {
				tabBars: [
					{
						id: '1',
						icon: '../../static/icon/cm2_discover_icn_recmd@2x.png',
						name: '每日推荐',
						url: '/pages/playlist/playlist'
					},
					{
						id: '2',
						icon: '../../static/icon/cm2_discover_icn_recmd@2x.png',
						name: '私人FM',
						url: '/pages/playlist/playlist'
					},
					{
						id: '3',
						icon: '../../static/icon/cm2_discover_icn_recmd@2x.png',
						name: '歌单',
						url: '/pages/playlist/playlist'
					},
					{
						id: '4',
						icon: '../../static/icon/cm2_discover_icn_recmd@2x.png',
						name: '排行榜',
						url: '/pages/topRank/topRank'
					},
					{
						id: '5',
						icon: '../../static/icon/cm2_discover_icn_recmd@2x.png',
						name: '直播',
						url: '/pages/playlist/playlist'
					},
					{
						id: '6',
						icon: '../../static/icon/cm2_discover_icn_recmd@2x.png',
						name: '数字',
						url: '/pages/playlist/playlist'
					}
				],
				recommondResources: [],
				topList: [
					{
						name: '热歌榜'
					},
					{
						name: '飙升榜'
					},
					{
						name: '新歌榜'
					}
				]
			}
		},
		created() {
			this.getRecommendResource() //获取推荐歌单
			this.getTopList() // 获取榜单
		},
		methods: {
			async getRecommendResource() {
				let res = await getRecommendResource()
				this.recommondResources = res.result || []
			},
			getTopList() {
				getTopList().then(res => {
					let list = res.list || []
					for (let i = 0; i < this.topList.length; i++) {
						let topItem = list.filter(item => item.name === this.topList[i].name)
						this.topList[i] = topItem.length ? topItem[0] : this.topList[i]
						getPlayListTrack({ id: this.topList[i].id, offset: 0, limit: 3 }).then(res => {
							// console.log(res)
							this.topList[i].songs = res.songs || []
							this.$set(this.topList, i, this.topList[i])
						})
					}
				})
			},
			goPage(item) {
				uni.navigateTo({
					url: item.url,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			gotoPlaylistDetail(id) {
				uni.navigateTo({
					url: '/pages/playlist/playlistDetail?playlistId=' + id
				})
			},
			gotoPlaying(id) {
				uni.navigateTo({
					url: '/pages/play/play?playId=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-container {
		height: 100%;
		padding-top: 70rpx;
		overflow: auto;
		background: #f5f5f5;
		.search-container {
			width: 100%;
			height: 80rpx;
			padding: 0 30rpx 10rpx 30rpx;
			position: fixed;
			top: 0;
			left: 0;
			background: #fff;
			z-index: 2;
			.search-border {
				width: calc(100% - 60rpx);
				height: 60rpx;
				padding: 0 30rpx;
				border: 1rpx solid #666;
				border-radius: 30rpx;
				background: #f5f5f5;
			}
		}
		.banner-container {
			width: 750rpx;
			height: 302rpx;
			padding: 30rpx;
			border-radius: 30rpx;
			overflow: hidden;
		}
		.scroll-view_H {
			// margin: 30rpx auto;
			padding: 30rpx;
			white-space: nowrap;
			box-sizing: border-box;
			.scroll-view-item_H {
				display: inline-block;
				margin-right: 30rpx;
				text-align: center;
				.bar-icon {
					width: 120rpx;
					height: 120rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 50%;
					background-color: #ecdfdf;
					image  {
						width: 80rpx;
						height: 80rpx;
					}
				}
			}
		}
		.recommend-container {
			padding: 30rpx;
			.recommend-title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 30rpx;
				.title {
					font-size: 34rpx;
					font-weight: 600;
				}
				.more {
					border: 2rpx solid #a7a7a7;
					border-radius: 22rpx;
					font-size: 24rpx;
					padding: 0 16rpx;
				}
			}
			.rcommend-list {
				white-space: nowrap;
				.recommend-item {
					display: inline-block;
					white-space: break-spaces;
					vertical-align: top;
					width: 200rpx;
					margin-right: 30rpx;
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

	    .top-list-container {
			padding: 30rpx;
			.recommend-title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 30rpx;
				.title {
					font-size: 34rpx;
					font-weight: 600;
				}
				.more {
					border: 2rpx solid #a7a7a7;
					border-radius: 22rpx;
					font-size: 24rpx;
					padding: 0 16rpx;
				}
			}
			.top-content {
				white-space: nowrap;
				.top-list {
					display: inline-block;
					width: 90%;
					margin-right: 30rpx;
					padding: 30rpx;
					background: #fff;
					box-shadow: inset 0px 0px 3px 1px #d2d2d287;
					border-radius: 40rpx;
					.top-title {
						font-size: 34rpx;
						text-align: center;
						font-weight: 600;
					}
					.top-item {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-top: 20rpx;
						.item-image {
							display: flex;
							justify-content: flex-start;
							align-items: center;
							image {
								width: 100rpx;
								height: 100rpx;
								margin-right: 30rpx;
								border-radius: 20rpx;
							}
							.song-info {
								.song-name {
									font-size: 30rpx;
									.index {
										margin-right: 20rpx;
										font-weight: 600;
									}
									.sub-name {
										color: #ccc;
										font-size: 22rpx;
										font-weight: 400;
									}
								}
							}
						}
					}
				}
			}
			.rcommend-list {}
		}
	}
</style>
