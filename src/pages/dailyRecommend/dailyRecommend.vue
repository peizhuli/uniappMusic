<template>
	<view class="daily-recommend-container">
		<view class="daily-bg">
			<view class="dayily">
				<text class="month">{{ daily.month }}</text> / 
				<text class="day">{{ daily.day }}</text>
			</view>
			<image src="../../static/day.jpg" mode="widthFix" />
		</view>
		<view class="playlist-list">
			<view class="playlist-item" v-for="(ele, playlistIndex) in recommondSongs" :key="playlistIndex" @click="gotoPlaylist(ele.id)">
				<image class="cover-image" :src="ele.al.picUrl" />
				<view class="cover-info">
					<view class="cover-title">
						<text>{{ ele.name }}</text>
						<text v-if="ele.alia.length" class="alias">{{ ele.alia[0] }}</text>
					</view>
					<view class="cover-sub">
						<text>{{ ele.ar[0].name }} - </text>
						<text>{{ ele.al.name }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getRecommendSongs } from '../../api/songs.js'
	export default {
		data() {
			return {
				recommondSongs: [],
				recommendReason: [],
				daily: {
					month: '',
					day: ''
				}
			}
		},
		created() {
			let time = new Date()
			this.daily = {
				month: time.getMonth() + 1,
				day: time.getDate()
			}
			this.getRecommendSongs({ cookie: encodeURIComponent(uni.getStorageSync('cookie')) })
		},
		methods: {
			getRecommendSongs(params) {
				const userinfo = uni.getStorageSync('userinfo')
				if(!userinfo){
					uni.showToast({
					  title: '请先登录',
					  icon: 'none',
					});
				}
				getRecommendSongs(params).then(res => {
					console.log(res)
					this.recommondSongs = res.data.dailySongs || []
					this.recommendReason = res.data.recommendReasons || []
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.daily-recommend-container {
	.daily-bg {
		position: relative;
		width: 100%;
		height: 214rpx;
		.dayily {
			position: absolute;
		    bottom: 20rpx;
		    left: 30rpx;
			color: #fff;
			.month {
				font-size: 40rpx;
				font-weight: 600;
			}
			.day {
				font-size: 30rpx;
			}
		}
		image {
			width: 100%;
			height: 100%;
		}
	}
	.playlist-list {
		margin-top: 30rpx;
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
					width: 80%;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
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
}
</style>
