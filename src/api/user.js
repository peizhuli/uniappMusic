import request from '../utils/request.js'

function getPlayList(params) {
	return request({ url: '/user/playlist', data: params })
}

function getFocusUser(params) {
	return request({ url: '/user/follows?t=' + new Date().getTime(), data: params })
}

export {
	getPlayList,
	getFocusUser
}