import request from '../utils/request.js'

/**
 * @name 获取 APP 首页信息
 * @param {Object} params
 */
function getHomeInfo(params) {
	return request({ url: '/homepage/block/page', ...params })
}

/**
 * @name 获取 APP 首页圆形图标入口列表
 */
function getDragonBall() {
	return request({ url: '/homepage/dragon/ball' })
}

/**
 * @name 热门话题
 */
function getHotTopic(limit = 9, offset = 0) {
	return request({ url: '/hot/topic?limit=' + limit + '&offset=' + offset })
}

export {
	getHomeInfo,
	getDragonBall
}