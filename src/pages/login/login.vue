<template>
	<view class="login-container">
		<view v-if="showLoginHome" class="home-container">
			<view class="home-text">
				<text class="text">立即体验</text>
			</view>
			<view class="login-content">
				<view class="logo-content">
					<image src="../../static/wangyi.png"></image>
				</view>
				<view class="login-form">
					<view class="phone-num">183****8737</view>
					<button class="login-btn active">一键登录</button>
					<button class="login-btn">微信登录</button>
					<view class="other-login-form">
						<view class="other-login-item">
							<image src="../../static/icon/cm2_discover_icn_radio@2x.png"></i>
						</view>
						<view class="other-login-item">
							<image src="../../static/icon/cm2_discover_icn_radio@2x.png"></i>
						</view>
						<view class="other-login-item" @click="showEmailLogin">
							<image src="../../static/icon/cm2_discover_icn_radio@2x.png"></i>
						</view>
					</view>
					<view class="service-text">
						<text class="aggree-text">同意</text>
						<text>服务条款，隐私政策、中国移动认证服务协议</text>
					</view>
				</view>
			</view>
		</view>
		<view v-else-if="showPhone" class="phone-container">
			<form @submit="submitByPHone">
				<view class="uni-form-item uni-column">
					<view class="title">手机号</view>
					<input class="uni-input" name="input" placeholder="请输入手机号" />
				</view>
				<view class="uni-btn-v">
					<button form-type="submit">Submit</button>
				</view>
			</form>
		</view>
		<view v-else-if="showEmail" class="email-container">
			<form @submit="loginByEmail">
				<view class="uni-form-item uni-column">
					<input class="uni-input" v-model="formData.email" name="email" placeholder="请输入邮箱" />
				</view>
				<view class="uni-form-item uni-column">
					<input class="uni-input" type="password" v-model="formData.password" name="password" placeholder="请输入密码" />
				</view>
				<view class="uni-btn-v">
					<button class="login-btn" form-type="submit">登录</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import { loginByPhone,  loginByEmail, getCaptcha, veifyCaptcha } from '../../api/login.js'
	export default {
		data() {
			return {
				showLoginHome: true,
				showPhone: false,
				showEmail: true,
				formData: {
					phone: '',
					email: 'ifkeyi@163.com',
					password: 'lipeizhu714'
				}
			};
		},
		methods: {
			showEmailLogin() {
				this.showLoginHome = false
				this.showPhone = false
				this.showEmail = true
			},
			submitByPHone() {},
			loginByEmail() {
				 uni.setNavigationBarTitle({
				    title: '邮箱登录'
				})
				loginByEmail({ email: this.formData.email, password: this.formData.password }).then(res => {
					console.log(res)
					if (res.code === 200) {
						this.$store.commit('user/SET_USER_INFO', res)
						uni.setStorageSync('userinfo' ,res);
						uni.switchTab({
							url: '/pages/user/user',
							animationType: 'pop-in'
						})
					} else {
						
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.login-container {
    width: 750upx;
	height: 1400upx;
	.home-container {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		background: #dd2d1e;
		box-sizing: border-box;
		.home-text {
			text-align: right;
			color: #fc a098;
			height: 100rpx;
			width: 100%;
			padding: 30rpx 30rpx 0 0;
			color: #d6d6d6;
			box-sizing: border-box;
		}
		.login-content {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			padding: 30rpx 100rpx;
			box-sizing: border-box;
			.logo-content {
				height: 100rpx;
				text-align: center;
				image {
					height: 60rpx;
					width: 60rpx;
				}
			}
			.login-form {
				width: 100%;
				text-align: center;
				.phone-num {
					width: 100%;
					margin-bottom: 30rpx;
					color: #f5d5d5;
				}
				.login-btn {
					width: 100%;
					height: 80rpx;
					margin-bottom: 30rpx;
					font-size: 30rpx;
					font-weight: 600;
					text-align: center;
					font-family: 微软雅黑;
					border: 1rpx solid #ffa2a2;
					border-radius: 80rpx;
					color: #fff;
					background: transparent;
					&.active {
						color:  #eb4358;
						background: #fff;
					}
				}
				.other-login-form {
					display: flex;
					justify-content: space-around;
					align-items: center;
					margin-bottom: 30rpx;
					.other-login-item {
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
						text-align: center;
						line-height: 60rpx;
						image {
							width: 100%;
							height: 100%;
						}
					}
				}
				.service-text {
					font-size: 20rpx;
					color: #f5d5d5;
				}
			}
		}
	}
	.email-container {
		width: 100%;
		padding: 30rpx;
		background-color: #fff;
		.uni-input {
			border-bottom: 1rpx solid #ccc;
			outline: none;
		}
		.login-btn {
			width: calc(100% - 60rpx);
			height: 80rpx;
			text-align: center;
			font-size: 30rpx;
			color: #fff;
			border-radius: 60rpx;
			background: #dd2d1e;
		}
	}
}
</style>
