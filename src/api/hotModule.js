import request from '../utils/request.js'
/**
 * @name 热门话题
 */
function getHotTopic(params) {
	return request({ url: '/hot/topic?timestamp=' + new Date().getTime(), data: params })
}

/**
 * @name 获取热门话题详情
 * @param {Object} actid
 */
function getHotTopicDetail(actid) {
	return request({ url: '/topic/detail?actid=' + actid })
}

/**
 * @name 获取话题详情热门动态
 * @param {Object} actid
 */
function getTopicDetailEvent(actid) {
	return request({ url: '/topic/detail/event/hot?actid=' + actid })
}

export {
	getHotTopic,
	getHotTopicDetail,
	getTopicDetailEvent
}