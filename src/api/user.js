import request from '../utils/request.js'

function getPlayList(params) {
	return request({ url: '/user/playlist', data: params })
}

export {
	getPlayList
}