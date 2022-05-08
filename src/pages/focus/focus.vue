<template>
	<view class="focus-container">
		<view class="focus-list">
			<view class="focus-item" v-for="(item, index) in focus" :key="index">
				<image class="focus-avatar" :src="item.avatarUrl"></image>
				<view class="focus-name">
					<text>{{ item.nickname }}</text>
				</view>
			</view>
		</view>
		<scroll-view class="hot-content" scroll-x="true">
			<view class="hot-list" v-for="(item, itemIndex) in hotList" :key="itemIndex">
				<view class="hot-item" v-for="(ele, index) in item" :key="index">
					<text class="icon">#</text>
					<text>{{ ele.title }}</text>
				</view>
			</view>
		</scroll-view>
		<play-widget v-if="playId"></play-widget>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { getFocusUser } from '../../api/user.js'
	import { getHotTopic } from '../../api/hotModule.js'
	import playWidget from '../play/playWidget.vue'
	export default {
		components: {
			playWidget
		},
		data() {
			return {
				hotList: [],
				focus: []
			}
		},
		computed: {
			...mapState('song', ['isPlaying', 'playlist', 'playId']),
			userInfo() {
				return this.$store.state.user.userInfo
			}
		},
		onShow() {
			if (!this.userInfo) {
				uni.navigateTo({
					url: '/pages/login/login',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
			this.getFocusUser({ uid: this.userInfo.account.id })
			this.getHotTopic({ limit: 15, cookie: encodeURIComponent(uni.getStorageSync('cookie')) })
		},
		methods: {
			getFocusUser(params) {
				getFocusUser(params).then(res => {
					// console.log(res)
					if (res.code === 200) {
						this.focus = res.follow.slice(0, 3)
					}
				})
			},
			getHotTopic(params) {
				getHotTopic(params).then(res => {
					// console.log(res)
					if (res.code === 200) {
						this.hotList = [res.hot.slice(0, 5), res.hot.slice(5, 10), res.hot.slice(10, 15)]
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.focus-container {
	.focus-list {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 30rpx;
		.focus-item {
			margin-right: 30rpx;
			text-align: center;
			.focus-avatar {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}
			.focus-name {
				font-size: 24rpx;
			}
		}
	}
	.hot-content {
		padding: 30rpx;
		white-space: nowrap;
		.hot-list {
			display: inline-block;
			width: 90%;
			padding: 10rpx 30rpx;
			margin-right: 30rpx;
			background-color: #fff;
			box-shadow: inset 0px 0px 3px 1px #d2d2d287;
			border-radius: 40rpx;
			.hot-item {
				margin-top: 12rpx;
				font-size: 30rpx;
				.icon {
				    font-size: 34rpx;
				    font-weight: 600;
				    color: #0fabff;
				    margin-right: 20rpx;
				}
			}
		}
	}
}
</style>
