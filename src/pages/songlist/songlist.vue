<template>
	<view class="playlist-contaienr">
		<scroll-view class="catlist-container" scroll-x="true" :scroll-left="scrollLeft">
			<view class="catlist-item" :id="'tab-' + index" :class="{ active: index === currentIndex }" v-for="(item, index) in catlist" :key="item.id" @click="switchTab(index)">
				<view class="catlist-name">{{ item.name }}</view>
			</view>
		</scroll-view>
		<swiper class="playlist-swiper" :current="currentIndex" @change="changeSwiper">
			<swiper-item class="swiper-item" v-for="(item, idx) in catSongs" :key="item.id">
				<view v-if="item.name === '单曲'" class="playlist-list-1">
					<view class="playlist-item" v-for="(ele, songIndex) in item.playlist" :key="songIndex" @click="gotoPlaying(ele.id)">
						<view class="cover-title">
							<!-- <text class="copyright" v-if="ele.originCoverType">原唱</text> -->
							<!-- <text v-if="ele.copyright" class="copyright">原唱</text> -->
						    <rich-text :nodes="formatText(ele.name)"></rich-text>
						</view>
						<view class="sub-title">
							<rich-text :nodes="formatText(ele.ar[0].name)"></rich-text> - 
							<rich-text :nodes="formatText(ele.al.name)"></rich-text>
						</view>
						<view v-if="ele.originSongSimpleData" class="cover-alia">原唱：{{ ele.originSongSimpleData.artists[0].name }}</view>
						<view v-if="ele.alia.length" class="cover-alia">{{ ele.alia[0] }}</view>
					</view>
				</view>
				<view v-if="item.name === '歌单'" class="playlist-list-2">
					<view class="playlist-item" v-for="ele in item.playlist" :key=ele.id>
						<image class="cover-image" :src="ele.coverImgUrl" />
						<view class="cover-info">
							<view class="cover-title">
								<rich-text :nodes="formatText(ele.name)"></rich-text>
							</view>
							<view class="cover-sub">
								{{ ele.trackCount }}首 .by{{ ele.creator.nickname }} .播放{{ ele.playCount }}次
							</view>
						</view>
					</view>
				</view>
				<view v-if="item.name === '视频'" class="playlist-list-3">
					<view class="playlist-item" v-for="ele in item.playlist" :key=ele.id>
						<image class="cover-image" :src="ele.coverUrl" />
						<view class="cover-info">
							<view class="cover-title">
								<rich-text :nodes="formatText(ele.title)"></rich-text>
							</view>
							<view class="cover-artist">
								<rich-text :nodes="formatText(ele.creator[0].userName)"></rich-text>
							</view>
							<view class="cover-sub">
								{{ ele.playTime }}播放
							</view>
						</view>
					</view>
				</view>
				<view v-if="item.name === '歌手'" class="playlist-list-4">
					<view class="playlist-item" v-for="ele in item.playlist" :key=ele.id>
						<view class="artists-info">
							<image class="cover-image" :src="ele.picUrl" />
							<rich-text :nodes="formatText(ele.name)" class="artists"></rich-text>
							<text v-if="ele.alias.length" class="alias">(</text>
							<rich-text v-if="ele.alias.length" :nodes="formatText(ele.alias[0])"></rich-text>
							<text v-if="ele.alias.length" class="alias">)</text>
						</view>
						<view class="focus">
							+ 关注
						</view>
					</view>
				</view>
				<view v-if="item.name === '播客'" class="playlist-list-2">
					<view class="playlist-item" v-for="ele in item.playlist" :key=ele.id>
						<image class="cover-image" :src="ele.picUrl" />
						<view class="cover-info">
							<view class="cover-title">
								<rich-text :nodes="formatText(ele.name)"></rich-text>
							</view>
							<view class="cover-sub">
								{{ ele.programCount }}个声音 .by{{ ele.dj.nickname }} .播放{{ ele.playCount }}次
							</view>
							<view class="secondCategory">{{ ele.secondCategory }}</view>
						</view>
					</view>
				</view>
				<view v-if="item.name === '歌词'" class="playlist-list-6">
					<view class="playlist-item" v-for="ele in item.playlist" :key=ele.id>
						<view class="song-name">
							<rich-text :nodes="formatText(ele.name)"></rich-text>
						</view>
						<view class="artist-info">
							<rich-text :nodes="formatText(ele.name)" class="artists"></rich-text>
							<text class="alias">
								{{ ele.ar[0].name }}
								<text v-if="ele.ar.length > 1">/{{ ele.ar[1].name }}</text>
							</text>
							<text> - {{ ele.al.name }}</text>
						</view>
						<view class="lyrics-content">
							<view class="lyrics-icon">词</view>
							<view class="lyrics-list" :class="{ opend: ele.isOpen }">
								<view class="lyrics-item" v-for="(lyr, idx) in ele.lyrics" :key="idx">
									<rich-text :nodes="formatText(lyr)"></rich-text>
									
								</view>
								<view class="action-bar" @click="toggleLyr(ele)">
									<text>展开歌词</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="item.name === '专辑'" class="playlist-list-2">
					<view class="playlist-item" v-for="ele in item.playlist" :key=ele.id>
						<image class="cover-image" :src="ele.picUrl" />
						<view class="cover-info">
							<view class="cover-title">
								<rich-text :nodes="ele.name"></rich-text>
								<text v-if="ele.alias.length" class="alias-title">{{ ele.alias[0] }}</text>
							</view>
							<view class="cover-sub">
								<text>{{ ele.artist.name }}</text>
								<text>{{ formatTime(ele.publishTime) }}</text>
							</view>
						</view>
					</view>
				</view>
				<view v-if="item.name === '用户'" class="playlist-list-4">
					<view class="playlist-item" v-for="ele in item.playlist" :key=ele.id>
						<view class="artists-info">
							<image class="cover-image" :src="ele.avatarUrl" />
							<rich-text :nodes="formatText(ele.nickname)" class="artists"></rich-text>
							<text v-if="ele.alias.length" class="alias">({{ ele.alias[0] }})</text>
						</view>
						<view v-if="!ele.followed" class="focus">
							+ 关注
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import { searchSong, getMultimatch } from '../../api/search.js'
	export default {
		data() {
			return {
				catlist: [
					// {
					// 	id: 1018,
					// 	name: '综合'
					// },
					{
						id: 1,
						name: '单曲'
					},
					{
						id: 1000,
						name: '歌单'
					},
					{
						// id: 1004,
						id: 1014,
						name: '视频'
					},
					{
						id: 100,
						name: '歌手'
					},
					{
						id: 1009,
						name: '播客'
					},
					{
						id: 1006,
						name: '歌词'
					},
					{
						id: 10,
						name: '专辑'
					},
					// {
					// 	id: 2000,
					// 	name: '声音'
					// },
					{
						id: 1002,
						name: '用户'
					}
				],
				catSongs: [
					// {
					// 	id: 1,
					// 	playlist: []
					// },
					{
						id: 2,
						name: '单曲',
						playlist: []
					},
					{
						id: 3,
						name: '歌单',
						playlist: []
					},
					{
						id: 4,
						name: '视频',
						playlist: []
					},
					{
						id: 5,
						name: '歌手',
						playlist: []
					},
					{
						id: 6,
						name: '播客',
						playlist: []
					},
					{
						id: 7,
						name: '歌词',
						playlist: []
					},
					{
						id: 8,
						name: '专辑',
						playlist: []
					},
					// {
					// 	id: 9,
					// 	playlist: []
					// },
					{
						id: 10,
						name: '用户',
						playlist: []
					}
				],
				currentIndex: 0,
				scrollLeft: 0,
				keyword: ''
			}
		},
		onLoad(options) {
			this.keyword = options.keyword
		},
		mounted() {
			this.searchSong({ keywords: this.keyword })
		},
		methods: {
			searchSong(params, index = 0) {
				searchSong(params).then(res => {
					console.log(res)
					switch (index) {
						case 0: //'单曲'
						case '单曲': {
							this.catSongs[index].playlist = res.result.songs || []
							break
						}
						case 1:
						case '歌单': {
							this.catSongs[index].playlist = res.result.playlists || []
							break
						}
						case 2:
						case '视频': {
							this.catSongs[index].playlist = res.result.videos || []
							break
						}
						case 3:
						case '歌手': {
							this.catSongs[index].playlist = res.result.artists || []
							break
						}
						case 4:
						case '播客': {
							this.catSongs[index].playlist = res.result.djRadios || []
							break
						}
						case 5:
						case '歌曲': {
							this.catSongs[index].playlist = res.result.songs || []
							break
						}
						case 6: {
							this.catSongs[index].playlist = res.result.albums || []
							break
						}
						case 7:
						case '用户': {
							this.catSongs[index].playlist = res.result.userprofiles || []
							break
						}
						// case 8: {
						// 	this.catSongs[index].playlist = res.result.userprofiles || []
						// 	break
						// }
						default: {
							this.catSongs[index].playlist = res.result.songs || []
							break
						}
					}
					// this.$set(this.catSongs, index,)
				})
			},
			async switchTab(current) { //点击其中一个 menu
			    if (this.currentIndex == current) {
			        return false;
			    } else {
			        this.currentIndex = current;
			        this.setScrollLeft(current);
			    }
				if (!this.catSongs[current].playlist.length) {
					this.searchSong({ keywords: this.keyword, type: this.catlist[current].id }, current)
				}
			},
			async changeSwiper(e) {
			    let index = e.target.current;
			    this.setScrollLeft(index);
			    this.currentIndex = index;
				if (!this.catSongs[index].playlist.length) {
					this.searchSong({ keywords: this.keyword, type: this.catlist[index].id }, index)
				}
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
			formatTime(time) {
				return new Date(time).toLocaleDateString()
			},
			toggleLyr(ele) {
				ele.isOpen = !ele.isOpen
				this.$set(ele, 'isOpen', !ele.isOpen)
			},
			formatText(text, keyword, color = '#2797ff') {
				keyword = keyword || this.keyword
				let reg = new RegExp((`(${ keyword })`), 'gm')
				let replace = `<span style="color: ${ color };">$1</span>`
				return text.replace(reg, replace)
			},
			gotoPlaying(playId) {
				uni.navigateTo({
					url: '/pages/play/play?playId=' + playId
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
					padding: 0 30rpx;
					.playlist-item {
						width: 100%;
						padding: 20rpx;
						text-align: center;
						.cover-image {
							width: 100%;
							height: 200rpx;
							border-radius: 30rpx;
						}
						.cover-name {
							text-align: left;
						}
					}
				}
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
				.playlist-list-4 {
					padding: 0 30rpx;
					.playlist-item {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 20rpx 0;
						border-bottom: 1rpx solid #eae8e8;
						.artists-info {
							display: flex;
							justify-content: flex-start;
							align-items: center;
							.cover-image {
								width: 80rpx;
								height: 80rpx;
								border-radius: 50%;
							}
							.artists {
								padding-left: 20rpx;
								font-size: 30rpx;
								color: #000;
							}
							.alias {
								font-size: 30rpx;
								color: #747474;
							}
						}
						.focus {
							padding: 0rpx 14rpx;
							height: 42rpx;
							font-size: 22rpx;
							color: #F06431;
							border-radius: 20rpx;
							border: 1rpx solid #ff0000;
						}
					}
				}
				.playlist-list-6 {
					padding: 0 30rpx;
					.playlist-item {
						margin-bottom: 20rpx;
						padding-bottom: 10rpx;
						border-bottom: 1rpx solid #eee;
						.song-name {
							font-size: 28rpx;
							font-weight: 500;
							color: #000;
						}
						.artist-info {
							font-size: 22rpx;
							color: #a0a0a0;
						}
						.lyrics-content {
							display: flex;
							justify-content: flex-start;
							align-items: baseline;
							padding-top: 20rpx;
							.lyrics-icon {
								padding: 0 4rpx;
								border-radius: 6rpx;
								font-size: 20rpx;
								color: #fff;
								background-color: #d6d6d6;
							}
							.lyrics-list {
								position: relative;
								height: 200rpx;
								padding-left: 20rpx;
								overflow: hidden;
								color: #444;
								line-height: 30rpx;
								.action-bar {
									position: absolute;
									bottom: 0;
									width: 100%;
									margin-top: 10rpx;
									font-size: 22rpx;
									color: #9a9a9a;
									background: #fff;
								}
								&.opened {
									height: auto;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
