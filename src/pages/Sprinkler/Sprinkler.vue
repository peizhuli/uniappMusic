<template>
	<view class="sprinkler-container">
		<scroll-view class="catlist-container" scroll-x="true" :scroll-left="scrollLeft">
			<view class="catlist-item" :class="{ active: index === currentIndex }" v-for="(item, index) in catelists" :key="item.id" @click="switchTab(item, index)">
				<view class="catlist-name">{{ item.name }}</view>
			</view>
		</scroll-view>
		<view class="playlist-list">
			<view class="playlist-item" v-for="(ele, idx) in radioList" :key="idx" @click="gotoDetail(ele, ele.id)">
				<image class="cover-image" :src="ele.picUrl" />
				<view class="dj-info">
					<view class="nick-name">{{ ele.dj.nickname }}</view>
					<view class="signatrue">{{ ele.dj.signature }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getDJBanner, getDJHot, getDJRecommend, getDJCatelist, getDJType, getDJProgram } from '../../api/dj.js'
	export default {
		data() {
			return {
				catelists: [],
				hotRadio: [],
				currentIndex: -1,
				scrollLeft: 0,
				radioList: []
			}
		},
		onShow() {
			// if (!this.$store.state.user.userInfo) {
			// 	uni.navigateTo({
			// 		url: '/pages/login/login',
			// 		success: res => {},
			// 		fail: () => {},
			// 		complete: () => {}
			// 	});
			// }
			// this.getDJBanner()
			// this.getDJHot()
			this.getDJCatelist()
		},
		methods: {
			getDJBanner() {
				getDJBanner().then(res => {
					console.log('banner', res)
				})
			},
			getDJRecommend() {
				getDJRecommend().then(res => {
					console.log(res)
				})
			},
			getDJHot() {
				getDJHot().then(res => {
					console.log(res)
					this.hotRadio = res.djRadios || []
				})
			},
			getDJCatelist() {
				getDJCatelist({ cookie: encodeURIComponent(uni.getStorageSync('cookie')) }).then(res => {
					// console.log(res)
					this.catelists = res.categories || []
					// console.log(this.catelists)
					this.switchTab(this.catelists[0], 0)
				})
			},
			async switchTab(item, current) { //点击其中一个 menu
			    if (this.currentIndex == current) {
			        return false;
			    }
				this.currentIndex = current;
				getDJType({ type: item.id }).then(res => {
					this.radioList = res.djRadios || []
				})
			},
			gotoDetail(item, id) {
				uni.navigateTo({
					url: '/pages/Sprinkler/sprinkDetail?radioId=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.sprinkler-container {
	overflow: hidden;
	height: 100vh;
	.catlist-container {
		white-space: nowrap;
		margin-bottom: 10rpx;
		padding: 0 20rpx;
		.catlist-item {
			display: inline-block;
			position: relative;
			padding: 4rpx 30rpx;
			margin-right: 30rpx;
			text-align: center;
			color: #333;
			.catlist-name {
				font-size: 26rpx;
			}
			&.active {
				color: #fff;
				border-radius: 30rpx;
				background-color: #f74848;
			}
		}
	}
	.playlist-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		padding: 20rpx 30rpx;
		height: calc(100% - 40rpx);
		overflow: auto;
		.playlist-item {
			position: relative;
		    width: 320rpx;
		    height: 320rpx;
		    margin-bottom: 30rpx;
		    border-radius: 30rpx;
		    overflow: hidden;
			.cover-image {
				width: 100%;
				height: 100%;
			}
			.dj-info {
				position: absolute;
				bottom: 20rpx;
				left: 20rpx;
				width: 86%;
				z-index: 1;
				.nick-name {
					color: #fff;
					font-size: 24rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					width: 100%;
				}
				.signatrue {
					font-size: 30rpx;
					font-weight: 600;
					color: #fff;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					width: 100%;
				}
			}
		}
	}
}
</style>
