import request from '../utils/request.js'

function loginByPhone(params) {
	return request({ url: '/login/cellphone', data: params })
}

function loginByEmail(params) {
	return request({ url: '/login', data: params })
}

function getCaptcha(phone) {
	return request({ url: '/captcha/sent?phone='+ phone })
}

function veifyCaptcha(params) {
	return request({ url: '/captcha/verify', data: params })
}

export {
	loginByPhone,
	loginByEmail,
	getCaptcha,
	veifyCaptcha
}