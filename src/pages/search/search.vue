<template>
	<view class="search-content">
		<view class="search-box">
			<input v-model="keyword" :focus="isFocus" class="search-input" type="text" confirm-type="search" :placeholder="placeholderText" @input="debounceInput" @confirm="goSearchList" @blur="isFocus = false" />
			<text class="clear-icon" v-if="keyword" @click.native="clearSearch">X</text>
		</view>
		<view class="hot-container">
			<view class="hot-title">
				<text class="title">热搜榜</text>
				<view class="btn">播放</view>
			</view>
			<view class="hot-content" :class="{ more: iShowMoreHot }">
				<view v-if="!iShowMoreHot" class="hot-mask" @click="showMoreHot">
					<text>展开更多热搜</text>
				</view>
				<view class="hot-list">
					<view class="hot-item" :class="{ top: [0, 1, 2].indexOf(index) > -1 }" v-for="(item, index) in hotSearchs" :key="index" @click="goSearchList(item.searchWord)">
						<view class="hot-index">{{ index + 1 }}</view>
						<view class="hot-name">{{ item.searchWord }}</view>
						<view class="hot-icon"></view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="showSuggestList" class="suggest-container">
			<view class="suggest-list">
				<view class="suggest-item" v-for="item in suggestList" :key="index" @click="goSearchList(item.keyword)">
					<text>{{ item.keyword }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { searchSong, getHotSearch, getKeyWord, getSearchSuggest, getMultimatch } from '../../api/search.js'
	export default {
		data() {
			return {
				historySearch: [],
				hotSearchs: [],
				suggestList: [],
				placeholderText: 'showKeyword',
				iShowMoreHot: false,
				keyword: '',
				showSuggestList: false,
				isFocus: false,
				debounceInput: () => {}
			}
		},
		created() {
			this.getKeyWord()
			this.getHotSearch()
		},
		mounted() {
			this.isFocus = true
			this.debounceInput = this.debounce(this.getSearchSuggest, 500)   
		},
		methods: {
			getKeyWord() {
				getKeyWord().then(res => {
					this.placeholderText = res.showKeyword || ''
				})
			},
			getHotSearch() {
				getHotSearch().then(res => {
					this.hotSearchs = res.data || []
				})
			},
			getSearchSuggest() {
				if (!this.keyword) {
					this.showSuggestList = false
					return
				}
				getSearchSuggest({ keywords: this.keyword, type: 'mobile' }).then(res => {
					console.log(res)
					this.suggestList = res.result.allMatch || []
					this.showSuggestList = true
				})
			},
			searchSong() {
				searchSong({ keywords: this.keyword, limit: 10 }).then(res => {
					console.log(res)
					this.suggestList = res.result.songs || []
					this.showSuggestList = true
				})
			},
			showMoreHot() {
				this.iShowMoreHot = true
			},
			clearSearch() {
				this.keyword = ''
				this.showSuggestList = false
			},
			goSearchList(keyword) {
				if (keyword && keyword.type === 'confirm') {
					keyword = keyword.detail.value
				}
				this.keyword = keyword
				uni.navigateTo({
					url: '/pages/songlist/songlist?keyword=' + this.keyword
				})
			},
			debounce(func, delay = 300, immediate = false) {
				let timer = null
				return function() {
					if (timer) {
						clearTimeout(timer)
					}
					if (immediate && !timer) {
						func.apply(this, arguments)
					}
					timer = setTimeout(() => {
					 func.apply(this, arguments)
					}, delay)
				}
			}
		},
		beforeDestroy() {}
	}
</script>

<style lang="scss" scoped>
.search-content {
	height: 100vh;
	padding-top: 70rpx;
	background: #f5f5f5;
	position: relative;
	.search-box {
		padding: 0 30rpx;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 60rpx;
		background: #fff;
		.search-input {
			width: 100%;
			height: 98%;
			border-bottom: 2px solid #c7c7c7;
		}
		.clear-icon {
			position: absolute;
			right: 30rpx;
			top: 4px;
		}
	}
	.hot-container {
		padding: 0 30rpx;
		.hot-title {
			margin: 10rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.title {
				font-size: 30rpx;
				font-weight: 600;
			}
			.btn {
				border: 2rpx solid #a7a7a7;
				border-radius: 22rpx;
				font-size: 24rpx;
				padding: 0 16rpx;
			}
		}
		.hot-content {
			height: 470rpx;
			padding: 10rpx 30rpx 30rpx 30rpx;
			background: #fff;
			border-radius: 30rpx;
			overflow: hidden;
			position: relative;
			.hot-list {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				flex-wrap: wrap;
				.hot-item {
					width: 50%;
					margin-top: 20rpx;
					display: flex;
					.hot-index {
						margin-right: 16rpx;
						font-size: 30rpx;
						font-weight: 600;
						color: #c1c1c1;
					}
					.hot-name {
						color: #404040;
					}
					&.top {
						.hot-index {
							color: #fb7272;
						}
						.hot-name {
							font-weight: 600;
						}
					}
				}
			}
			.hot-mask {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 60rpx;
				text-align: center;
				color: #9c9c9c;
				font-size: 24rpx;
				background: #fff;
			}
			&.more {
				height: auto;
			}
		}
	}
	.suggest-container {
		width: 100%;
		height: 100%;
		padding: 30rpx;
		position: absolute;
		top: 60rpx;
		left: initial;
		background: #fff;
		.suggest-list {
			.suggest-item {
				padding-bottom: 20rpx;
				border-bottom: 1rpx solid #e8e8e8;
			}
		}
	}
}
</style>
