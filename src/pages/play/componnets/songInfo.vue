<template>
	<view class="songinfo-container animated fadeInUp faster">
		<view class="song-name">
			<text class="name">{{ songInfo.name }}</text>
			<text v-if="songInfo.alia.length" class="alia">({{ songInfo.alia[0] }})</text>
		</view>
		<view class="action-list">
			<view class="action-item" v-for="(item, index) in actions" :key="index">
				<view class="icon">
					<image :src="item.icon"></image>
				</view>
				<view class="item-name">
					<text>{{ item.text }}</text>
					<text v-if="item.value">：{{ item.value }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		props:{
			isPlayRelevantShow:Boolean
		},
		computed: {
			...mapState('song', ['songInfo']),
		},
		data() {
			return {
				actions: [
					{
						text:'歌手',
						icon:'../../../static/playing/cm2_lay_icn_artist_new@2x.png',
						value: ''
					},
					{
						text:'专辑',
						icon:'../../../static/playing/cm2_discover_icn_newest@2x.png',
						value: ''
					},
					{
						text:'歌曲收藏',
						icon:'../../../static/playing/cm2_lay_icn_fav_new@2x.png',
					},
					{
						text:'相似歌曲',
						icon:'../../../static/playing/cm2_lay_icn_similar_new@2x.png'
					},
					{
						text:'相关视频',
						icon:'../../../static/playing/cm2_lay_icn_similar_new@2x.png'
					}
				]
			}
		},
		created() {
			console.log(this.songInfo)
			this.$set(this.actions[0], 'value', this.songInfo.ar[0].name)
			this.$set(this.actions[1], 'value', this.songInfo.al.name)
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.songinfo-container {
		width: 100%;
		height: 650rpx;
		padding: 30rpx;
		position: absolute;
		bottom: 0;
		left: 0;
		background-color: #f5f5f5;
		opacity: 0.99;
		z-index: 10;
		border-radius: 20rpx 20rpx 0 0;
		.song-name {
			margin-bottom: 30rpx;
			.name {
				font-size: 34rpx;
			}
			.alia {
			    color: #a2a2a2;
			    font-size: 34rpx;
			}
		}
		.action-list {
			padding: 16rpx;
			border-radius: 16rpx;
			background-color: #fff;
			.action-item {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding-bottom: 20rpx;
				.icon {
					width: 90rpx;
					image {
						width: 60rpx;
						height: 60rpx;
					}
				}
				.item-name {
					flex: 1;
					padding-bottom: 20rpx;
					border-bottom: 1rpx solid #eee;
				}
			}
		}
	}
</style>
