<template>
	<view class="artist-container">
		<view class="artist-bg">
			<view class="artist-img">
				<image :src=artistInfo.artist.cover></image>
			</view>
		</view>
		<view class="catlist-container">
			<view class="catlist-item" :id="'tab-' + index" :class="{ active: index === currentIndex }" v-for="(item, index) in catlist" :key="index" @click="switchTab(index)">
				<view class="catlist-name">{{ item.name }}</view>
			</view>
		</view>
		<swiper class="playlist-swiper" :current="currentIndex" @change="changeSwiper">
			<swiper-item>
				<view class="artist-info-content">
					<view class="artist-info">
						<view class="artist-info-item">
							<text class="info-type">艺人名：</text>
							<text>{{ artistInfo.artist.name }}</text>
						</view>
						<view class="artist-info-item">
							<text class="info-type">歌手简介：</text>
							<text>{{ artistInfo.artist.briefDesc }}</text>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<view class="playlist-list-1">
					<view class="playlist-item" v-for="(ele, songIndex) in playlist" :key="songIndex" @click="gotoPlaying(ele)">
						<view class="cover-title">
						    <text>{{ ele.name }}</text>
						</view>
						<view class="sub-title">
							<text>{{ ele.ar[0].name }}</text> 
							<text>{{ ele.al.name }}</text>
						</view>
						<view v-if="ele.originSongSimpleData" class="cover-alia">原唱：{{ ele.originSongSimpleData.artists[0].name }}</view>
						<view v-if="ele.alia.length" class="cover-alia">{{ ele.alia[0] }}</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<view class="playlist-list-2">
					<view class="playlist-item" v-for="(ele, albumIndex) in albums" :key="albumIndex" @click="gotoPlaylist(ele.id)">
						<image class="cover-image" :src="ele.picUrl" />
						<view class="cover-info">
							<view class="cover-title">
								<text>{{ ele.name }}</text>
								<text v-if="ele.alias.length" class="alias-title">{{ ele.alias[0] }}</text>
							</view>
							<view class="cover-sub">
								<text>{{ ele.artist.name }}</text>
								<text>{{ formatTime(ele.publishTime) }}</text>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<view class="playlist-list-3">
					<view class="playlist-item" v-for="(ele, index) in videos" :key="index">
						<image class="cover-image" :src="ele.imgurl" />
						<view class="cover-info">
							<view class="cover-title">
								<text>{{ ele.name }}</text>
							</view>
							<view class="cover-artist">
								<text>{{ ele.artist.name }}</text>
							</view>
							<view class="cover-sub">
								{{ ele.playCount }}播放
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import { getArtistsong, getArtistMV, getArtistsAlbum, getArtistsDesc, getArtistsDetail, getSimilarArtists } from '../../api/singer.js'
	export default {
		data() {
			return {
				catlist: [
					{
						name: '主页'
					},
					{
						name: '演唱',
						count: ''
					},
					{
						name: '专辑',
						count: ''
					},
					{
						name: '视频',
						count: ''
					}
				],
				playlist: [],
				albums: [],
				videos: [],
				artistId: '',
				albumId: '',
				artistInfo: {},
				currentIndex: 0,
				scrollLeft: 0
			}
		},
		onLoad(options) {
			this.artistId = options.artistId
			this.albumId= options.albumId
			// this.getArtistsDesc(this.artistId)
			this.getArtistsDetail(this.artistId)
			this.getArtistsong(this.artistId)
			this.getArtistsAlbum(this.artistId)
			this.getArtistMV(this.artistId)
		},
		methods: {
			// 获取歌手信息
			getArtistsDesc(id) {
				getArtistsDesc(id).then(res => {
					console.log(res)
				})
			},
			getArtistsDetail(id) {
				getArtistsDetail(id).then(res => {
					console.log(res)
					this.artistInfo = res.data
					this.catlist = [
					{
						name: '主页'
					},
					{
						name: '演唱',
						count: res.data.musicSize
					},
					{
						name: '专辑',
						count: res.data.albumSize
					},
					{
						name: '视频',
						count: res.data.mvSize
					}
				]
				})
			},
			getArtistsong(id) {
				getArtistsong(id).then(res => {
					console.log(res)
					this.playlist = res.hotSongs || []
				})
			},
			getArtistsAlbum(id) {
				getArtistsAlbum(id).then(res => {
					console.log(res)
					this.albums = res.hotAlbums || []
				})
			},
			getArtistMV(id) {
				getArtistMV(id).then(res => {
					console.log(res)
					this.videos = res.mvs || []
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
			    this.currentIndex = index
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
			gotoPlaylist(id) {
				uni.navigateTo({
					url: '/pages/playlist/playlistDetail?playlistId=' + id
				})
			},
			gotoPlaying(song) {
				this.$store.commit('song/SET_PLAYLIST', [song])
				uni.navigateTo({
					url: '/pages/play/play?playId=' + song.id
				})
			},
			formatTime(time) {
				return new Date(time).toLocaleDateString()
			},
			formatText(text, keyword, color = '#2797ff') {
				keyword = keyword || this.keyword
				let reg = new RegExp((`(${ keyword })`), 'gm')
				let replace = `<span style="color: ${ color };">$1</span>`
				return text.replace(reg, replace)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.artist-container {
		background-color: #f5f5f5;
		.artist-bg {
			.artist-img {
				image {
					width: 100%;
				}
			}
		}
		.catlist-container {
			white-space: nowrap;
			margin-bottom: 10rpx;
			padding: 0 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
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
			padding: 30rpx;
			background-color: #fff;
			.swiper-item {
				overflow: auto;
				.playlist-list-1 {
					padding: 0 30rpx;
					.playlist-item {
						margin-top: 30rpx;
						.cover-title {
							width: 96%;
							font-size: 30rpx;
							font-weight: 500;
							color: #000;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							.copyright {
								padding: 2rpx;
								margin-right: 6rpx;
								font-size: 20rpx;
								color: #fff;
								border-radius: 6rpx;
								background-color: #FF0000;
							}
						}
						.sub-title {
							display: flex;
							width: 96%;
							color: #7b7a7a;
							font-size: 24rpx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
						.cover-alia {
							color: #7b7a7a;
							font-size: 24rpx;
						}
					}
				}
				.playlist-list-2 {
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
				.playlist-list-3 {
					.playlist-item {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						margin-bottom: 30rpx;
						padding: 0 30rpx;
						.cover-image {
							width: 300rpx;
						    height: 160rpx;
							border-radius: 20rpx;
						}
						.cover-info {
							display: flex;
							flex-direction: column;
							justify-content: flex-start;
							align-items: flex-start;
							flex: 1;
							padding-left: 30rpx;
							.cover-title {
								font-size: 28rpx;
								color: #000;
								text-overflow: -o-ellipsis-lastline;
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								line-clamp: 2;
								-webkit-box-orient: vertical;
							}
							.cover-artist,
							.cover-sub {
								font-size: 22rpx;
								color: #8c8a89;
							}
						}
					}
				}
			}
		}
	}
</style>
