<template>
	<view class="toplist-container">
		<view class="toplist-content" v-for="(item, index) in toplist" :key="item.name">
			<view class="toplist-title">
				<text>{{ item.name }}</text>
			</view>
			<view v-if="index !== 0" class="toplist-list">
				<view class="toplist-item" v-for="(list, index) in item.list" :key="index" @click="gotoPlaylistDetail(list.id)">
					<image :src="list.coverImgUrl" />
					<text class="item-name">{{ list.name }}</text>
				</view>
			</view>
			<view v-else class="toplist-list-1">
				<view class="toplist-item" :class="['item-' + listIdx]" v-for="(list, listIdx) in item.list" :key="listIdx" @click="gotoPlaylistDetail(list.id)">
					<view class="item-img">
						<text class="item-title">{{ list.name }}</text>
						<image :src="list.coverImgUrl" />
					</view>
					<view class="song-list">
						<view class="item-songs" v-for="(song, idx) in list.songs" :key="song.id">
							<view class="song-name">
								<text class="index">{{ idx + 1 }}. </text>
								<text> {{ song.name }} </text>
								<text class="sub-name"> - {{ song.ar[0].name }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getTopList } from '../../api/toplist.js'
	import { getPlayListTrack } from '../../api/songs.js'
	export default {
		data() {
			return {
				toplist: [
					{
						name: '官方',
						tags: ['飙升榜', '新歌榜', '原创榜', '畅销榜', '最火视频榜'],
						list: []
					},
					{
						name: '精选',
						tags: ['编辑推荐榜', '黑胶VIP爱听榜', 'K歌榜', '达人榜', '网络热歌榜'],
						list: []
					},
					{
						name: '曲风',
						list: [],
						tags: ['云音乐电音榜', '云音乐ACG榜', '云音乐说唱榜', '云音乐摇滚榜', '云音乐民谣榜', '云音乐古典榜', '云音乐古风榜', '云音乐ACG动画榜']
					},
					{
						name: '全球',
						list: [],
						tags: ['美国Billboard榜', '日本Oricon榜', '俄语榜', '中文DJ榜', '云音乐欧美热歌榜', '云音乐欧美新歌榜', '泰语榜', '俄罗斯top hit流行音乐榜', '法国 NRJ Vos Hits 周榜', '越南语榜', '云音乐韩语榜', 'UK排行榜周榜', '云音乐日语榜']
					},
					// {
					// 	name: 'MV',
					// 	list: [],
					// 	tags: ['MV榜', '电影MV榜']
					// },
					{
						name: '特色',
						list: [],
						tags: ['听歌识曲榜', '潜力爆款榜', '中国新乡村音乐排行榜', 'KTV唛榜', 'Beatport全球电子舞曲榜']
					}
				]
			}
		},
		created() {
			this.getTopList()
		},
		methods: {
			getTopList() {
				getTopList().then(res => {
					let list = res.list
					for (let i = 0; i < list.length; i++) {
						for (let j = 0; j < this.toplist.length; j++) {
							if (this.toplist[j].tags.indexOf(list[i].name) > -1) {
								this.toplist[j].list.push(list[i])
							}
						}
					}
					this.getPlaylistDetail()
				})
			},
			getPlaylistDetail() {
				for (let i = 0; i < this.toplist[0].list.length; i++) {
					getPlayListTrack({ id: this.toplist[0].list[i].id, limit: 3 }).then(res => {
						console.log(res)
						this.$set(this.toplist[0].list[i], 'songs', res.songs || [])
					})
				}
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
.toplist-container {
	background-color: #f5f5f5;
	.toplist-content {
		padding: 30rpx;
		margin-bottom: 30rpx;
		background-color: #fff;
		.toplist-title {
			font-size: 40rpx;
			font-weight: 600;
		}
		.toplist-list {
			display: flex;
			justify-content: flex-start;
			align-items: start;
			width: 100%;
			flex-wrap: wrap;
			.toplist-item {
				width: 33.33%;
				padding: 20rpx;
				image {
					width: 100%;
					height: 200rpx;
					border-radius: 30rpx;
				}
				.item-name {
					text-align: left;
				}
				&:nth-child(3n + 1) {
					padding-left: 0;
				}
			}
		}
		.toplist-list-1 {
			.toplist-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 30rpx;
				padding: 30rpx;
				border-radius: 30rpx;
				.item-img {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 30%;
					.item-title {
						font-size: 40rpx;
						font-weight: 600;
					}
					image {
						width: 150rpx;
						height: 150rpx;
						border-radius: 30rpx;
					}
				}
				.song-list {
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					flex: 1;
					padding-left: 30rpx;
					.item-songs {
						padding-top: 16rpx;
						text-align: left;
						.song-name {
							.index {}
							.sub-name {
								color: #8a8a8a;
								font-size: 22rpx;
								font-weight: 400;
							}
						}
					}
				}
				&.item-0 {
					background-color: rgba(251, 173, 173, 0.42);
					.item-img {
						.item-title {
							color: #f96262;
						}
					}
				}
				&.item-1 {
					background-color: rgba(161, 241,222, 0.42);
					.item-img {
						.item-title {
							color: #018c6c;
						}
					}
				}
				&.item-2 {
					background-color: rgba(183, 219, 249, 0.42);
					.item-img {
						.item-title {
							color: #0068d4;
						}
					}
				}
			}
		}
	}
}
</style>
