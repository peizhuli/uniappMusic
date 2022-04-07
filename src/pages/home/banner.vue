<template>
	<swiper class="banner-content" autoplay circular indicator-dots>
		<swiper-item v-for="(item, index) in banners" :key="index">
			<image mode="widthFix" :src="item.pic" />
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		data() {
			return {
				banners: []
			}
		},
		created() {
			this.getBanner()
		},
		methods: {
			async getBanner() {
				let result = await this.request({url: '/banner?type=2'})
				this.banners = result.banners
				console.log(result)
			},
			tabtap(index) {}
		}
	}
</script>

<style lang="scss" scoped>
	.banner-content {
		width: 100%;
		height: 100%;
		text-align: center;
		image{
			width: 100%;
		}
	}
</style>
