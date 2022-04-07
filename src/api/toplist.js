import request from '../utils/request.js'

 /* @name 获取所有榜单
 */
function getTopList() {
	return request({ url: '/toplist' })
}

function getTopListDetail() {
	return request({ url: '/toplist/detail' })
}

/**
 * @name 获取歌手榜
 * @param {Object} params
 * type : 地区
1: 华语
2: 欧美
3: 韩国
4: 日本
 */
function getSingerTopList(params) {
	return request({ url: '/toplist/artist', data: params })
}


export {
	getTopList,
	getTopListDetail,
	getSingerTopList
}