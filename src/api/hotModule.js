import request from '../utils/request.js'
/**
 * @name 热门话题
 */
function getHotTopic(limit = 9, offset = 0) {
	return request({ url: '/hot/topic?limit=' + limit + '&offset=' + offset })
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
	getHotTopic，
	getHotTopicDetail,
	getTopicDetailEvent
}