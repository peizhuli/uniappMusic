import request from '../utils/request.js'

/**
 * @name 获取推荐MV
 */
function getPersonalizedMV() {
	return request({ url: '/personalized/mv' })
}

/**
 * @name 获取推荐歌单
 * @param {Object} limit
 */
function getPersonalizedSongList(limit) {
	return request({ url: '/personalized?limit=' + limit })
}

/**
 * @name 获取推荐歌曲
 * @param {Object} limit
 */
function getPersonalizedSongs(limit) {
	return request({ url: '/personalized/newsong?limit=' + limit })
}

/**
 * @name 获取推荐电台
 */
function getPersonalizedDJ() {
	return request({ url: '/personalized/djprogram' })
}

/**
 * @name 获取推荐节目
 */
function getPersonalizedProgram() {
	return request({ url: '/program/recommend' })
}

/**
 * @name 获取独家放送
 */
function getPersonalizedPrivate() {
	return request({ url: '/personalized/privatecontent' })
}

/**
 * @name 获取独家放送列表
 * @param {Object} limit
 * @param {Object} offset
 */
function getPersonalizedPrivateList(limit, offset) {
	return request({ url: '/personalized/privatecontent/list?limit=' + limit + '&offset=' + offset })
}

/**
 * @name 私人FM
 */
function getPersonalFM() {
	return request({ url: '/personal_fm?t=' + new Date().getTime() })
}

function getPrivateContent() {
	return request({ url: '/personalized/privatecontent' })
}

export {
	getPersonalizedMV,
	getPersonalizedSongList,
	getPersonalizedSongs,
	getPersonalizedDJ,
	getPersonalizedProgram,
	getPersonalizedPrivate,
	getPersonalizedPrivateList,
	getPersonalFM,
	getPrivateContent
}