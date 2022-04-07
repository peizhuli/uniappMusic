<template>
	<view class="lyric-container">
		<scroll-view  class="lyric-scroll" scroll-y :scroll-top="scrollTop" scroll-with-animation="true" show-scrollbar="false" @tap="hideLyr">
		    <view class="lyric-panel">
				<block v-for="(item, index) in lrcList" :key="index">
					<view class="lyric-item" :class="{ active: index === nowLyricIndex }">
						{{item.lrc}}
					</view>
				</block>
		    </view>
		</scroll-view>
	</view>
</template>

<script>
	let lyricHeight = 0;
	export default {
		props: {
			lyric: {
				type: String,
				default: () => ''
			}
		},
		data() {
			return {
				lrcList: [],
				nowLyricIndex: 0, // 当前选中的歌词的索引
				scrollTop: 0, // 滚动条滚动的高度
			}
		},
		watch:{
			lyric(lrc) {
			    if(lrc == '纯音乐,请欣赏') {
					this.lrcList=[{
						lrc,
						time: 0,
					}],
					this.nowLyricIndex= -1;
			    } else {
					this.formatLyric(lrc)
			    }
			},
		},
		created() {
			uni.getSystemInfo({
				success(res) {
				  lyricHeight = res.screenWidth / 750 * 64
				},
			})	
		},
		methods: {
			update(currentTime) {
			    let lrcList = this.lrcList
			    if (lrcList.length == 0) {
			        return
			      }
			    if (currentTime > lrcList[lrcList.length - 1].time) {
			        if (this.nowLyricIndex != -1) {
						
			            this.nowLyricIndex = -1,
			            this.scrollTop=lrcList.length * lyricHeight
			    
			        }
			      }
			    for (let i = 0, len = lrcList.length; i < len; i++) {
			        if (currentTime <= lrcList[i].time) {
			            this.nowLyricIndex = i - 1,
			            this.scrollTop= (i - 1) * lyricHeight
			          break
			        }
			    }
			},
			formatLyric(sLyric) {
				let line = sLyric.split('\n')
				let lrcList = []
				line.forEach((elem) => {
					let time = elem.match(/\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g)
					if (time != null) {
						let lrc = elem.split(time)[1]
						let timeReg = time[0].match(/(\d{2,}):(\d{2})(?:\.(\d{2,3}))?/)
						// 把时间转换为秒
						let time2Seconds = parseInt(timeReg[1]) * 60 + parseInt(timeReg[2]) + parseInt(timeReg[3]) / 1000
						lrcList.push({
							lrc,
							time: time2Seconds,
						})
					}
				})
				this.lrcList= lrcList
			},
			//歌词的显示方法
			hideLyr(){
				this.$emit('hideLyr')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lyric-container {
		position: absolute;
		top: 0;
		left: 10upx;
		bottom: 25%;
		width: 100%;
		z-index: 6;
		.lyric-scroll {
			width: 100%;
			height: 100%;
			color: #FFFFFF;
			font-size: 36upx;
			font-weight: bold;
		   .lyric-panel {
				position: relative;
				top: 50%;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.lyric-item {
					text-align: center;
					&.active {
					    color: red;
				    }
				}
		    }  
		}
	}
</style>
