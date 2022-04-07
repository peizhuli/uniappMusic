<template>
	<view class="playlist-contaienr">
		<scroll-view class="catlist-container" scroll-x="true" :scroll-left="scrollLeft">
			<view class="catlist-item" :id="'tab-' + index" :class="{ active: index === currentIndex }" v-for="(item, index) in catlist" :key="item.id" @click="switchTab(index)">
				<view class="catlist-name">{{ item.name }}</view>
			</view>
		</scroll-view>
		<swiper class="playlist-swiper" :current="currentIndex" @change="changeSwiper">
			<swiper-item class="swiper-item" v-for="(item, itemIndex) in catlist" :key="itemIndex">
				<view class="playlist-list">
					<view class="playlist-item" v-for="(ele, idx) in item.playlist" :key="idx"  @click="gotoPlaylistDetail(ele.id)">
						<image class="cover-image" :src="ele.coverImgUrl" />
						<view class="cover-name">{{ ele.name }}</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import { getHighqualityTag, getHighquality, getPlayListTrack, getTopPlaylist } from '../../api/songs.js'
	export default {
		data() {
			return {
				catlist: [],
				catSongs: [],
				currentIndex: 0,
				scrollLeft: 0
			}
		},
		created() {
			this.getPlaylistCatlist()
		},
		methods: {
			getPlaylistCatlist() {
				getHighqualityTag().then(res => {
					this.catlist = res.tags.slice(0, 6)
					for (let i = 0; i < this.catlist.length; i++) {
						this.getHighqualityList(this.catlist[i], i)
					}
				})
			},
			getHighqualityList(item, i, limit = 20) {
				getTopPlaylist({ cat: item.name, limit }).then(res => {
					this.$set(this.catlist, i, { ...item, playlist: res.playlists || [] })
				})
			},
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
			gotoPlaylistDetail(id) {
				uni.navigateTo({
					url: '/pages/playlist/playlistDetail?playlistId=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.playlist-contaienr {
		padding: 30rpx 10rpx;
		.catlist-container {
			white-space: nowrap;
			margin-bottom: 10rpx;
			padding: 0 20rpx;
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
						bottom: 10rpx;
						background-color: linear-gradient(to right, rgba(247, 72, 72, 0.6), rgba(251, 172, 172, 0.6));
						background-image: linear-gradient(to left, rgba(247, 72, 72, 0.6), rgba(251, 172, 172, 0.6));
					}
				}
			}
		}
		.playlist-swiper {
			height: calc(100vh - 100rpx);
			.swiper-item {
				overflow: auto;
				.playlist-list {
					display: flex;
					justify-content: flex-start;
					align-items: start;
					width: 100%;
					flex-wrap: wrap;
					.playlist-item {
						width: 33.33%;
						padding: 20rpx;
						text-align: center;
						.cover-image {
							width: 100%;
							height: 200rpx;
							border-radius: 30rpx;
						}
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
			}
		}
	}
</style>
