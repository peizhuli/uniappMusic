<template>
	<view class="playlist-container">
		<scroll-view class="catlist-container" scroll-x="true" :scroll-left="scrollLeft">
			<view class="catlist-item" :id="'tab-' + index" :class="{ active: index === currentIndex }" v-for="(item, index) in catlist" :key="item.id" @click="switchTab(index)">
				<view class="catlist-name">{{ item.name }}</view>
			</view>
		</scroll-view>
		<swiper class="playlist-swiper" :current="currentIndex" @change="changeSwiper">
			<swiper-item class="swiper-item">
				<view class="playlist-list">
					<view class="playlist-item" v-for="(ele, idx) in catSongs" :key="idx"  @click="gotoPlaylistDetail(ele.id)">
						<view class="item-cover">
							<image class="cover-image" :src="ele.album.picUrl" />
							<view class="song-info">
								<view class="cover-name">{{ ele.name }}</view>
								<view class="artist">{{ formatArtis(ele.artists) }}</view>
							</view>
						</view>
						<view class="collect-box">
							<image src="../../../static/playing/cm2_play_icn_love@2x.png"></image>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: ['catSongs'],
		data() {
			return {
				catlist: [
					{
						id: 1,
						name: '详情'
					},
					{
						id: 2,
						name: '推荐'
					}
				],
				currentIndex: 0,
				scrollLeft: 0
			}
		},
		methods: {
			async switchTab(current) { //点击其中一个 menu
			    if (this.currentIndex == current) {
			        return false;
			    } else {
			        this.currentIndex = current;
			        this.setScrollLeft(current);
			    }
			},
			async changeSwiper(e) {
			    let index = e.target.current;
			    this.setScrollLeft(index);
			    this.currentIndex = index;
			},
			async setScrollLeft(tabIndex) {
			    let leftWidthSum = 0;
			    for (var i = 0; i <= tabIndex; i++) {
			        let nowElement = await this.getWidth('tab-' + i);
					if (nowElement) {
						leftWidthSum = leftWidthSum + nowElement.width;
					}
			    }
			    let winWidth = uni.getSystemInfoSync().windowWidth;
			    this.scrollLeft = leftWidthSum > winWidth ? (leftWidthSum - winWidth) : 0
			},
			getWidth(id) { //得到元素的宽高
			    return new Promise((res, rej) => {
			        uni.createSelectorQuery().select("#" + id).fields({
			            size: true,
			            scrollOffset: true
			        }, (data) => {
			            res(data);
			        }).exec();
			    })
			},
			formatArtis(artist) {
				let artists = artist.map(item => item.name)
				return artists.join('/')
			},
			gotoPlaylistDetail(id) {
				uni.navigateTo({
					url: '/pages/playlist/playlistDetail?playlistId=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.catlist-container {
		white-space: nowrap;
		padding: 0 30rpx;
		color: #fff;
		.catlist-item {
			display: inline-block;
			position: relative;
			margin-right: 30rpx;
			text-align: center;
			.catlist-name {
				font-size: 30rpx;
			}
			&.active {
				&::after {
					content: "";
					position: absolute;
					width: 100%;
					height: 10rpx;
					left: 0;
					bottom: 6rpx;
					background-color: rgba(249, 228, 228, 0.52);
				}
			}
		}
	}
	.playlist-swiper {
		height: calc(100vh - 100rpx);
		padding: 30rpx;
		.swiper-item {
			overflow: auto;
			.playlist-list {
				display: flex;
				justify-content: flex-start;
				align-items: start;
				padding: 16rpx;
				flex-wrap: wrap;
				border-radius: 20rpx;
				background: rgba(255, 255, 255, 0.1);
				.playlist-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 100%;
					margin-top: 16rpx;
					.item-cover {
						flex: 1;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						.cover-image {
							width: 120rpx;
							height: 120rpx;
							border-radius: 20rpx;
						}
						.song-info {
							margin-left: 20rpx;
							color: #fff;
							.cover-name {
								text-align: left;
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
					.collect-box {
						width: 70rpx;
						image {
							width: 70rpx;
							height: 70rpx;
						}
					}
				}
			}
		}
	}
</style>
