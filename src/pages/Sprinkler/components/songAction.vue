<template>
	<view>
		<view class="playing_info u-f-ac">
			<view class="icon"   >
				<image v-if="islike"
				 src="../../../static/playing/cm2_play_icn_loved@2x.png" mode="widthFix" />
				 <image v-else :src="pic[0]" mode="widthFix" />
			</view>
			<view class="icon">
				<image :src="pic[1]" mode="widthFix"
				 @tap="tocomment"/>
			</view>
			<view class="icon">
					<image :src="pic[2]" mode="widthFix" />
			</view>
			<view class="icon">
				<image :src="pic[3]" mode="widthFix"
				@tap="playRelevantOpen" />
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState,mapGetters } from 'vuex';
	let app=getApp();
	export default {
		computed: {
			...mapState('song', ['playId']),
			...mapGetters(['islike'])
		},
		data() {
			return {
				pic:[
					'../../../static/playing/cm2_play_icn_love@2x.png',
					'../../../static/playing/cm2_play_icn_cmt@2x.png',
					'../../../static/playing/cm2_play_icn_dld@2x.png',
					'../../../static/playing/cm2_play_icn_more@2x.png',
				]
			}
		},
		methods: {
			playRelevantOpen(){
				this.$emit('openSongInfo')
			},
			tocomment(){
				uni.navigateTo({
					url:'/pages/comment/comment?playId=' + this.playId
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.playing_info{
		width: 100%;
		// position: absolute;
		padding: 0 30rpx 0 30rpx;
		bottom: 15%;
		left: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		z-index: 4;
		.icon{
			image{
				width: 80rpx;
			}
		}
	}
</style>
