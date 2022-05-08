import request from '../utils/request.js'

/**
 * @name 获取所有歌单分类
 */

function getPlaylistCatlist() {
	return request({ url: '/playlist/catlist' })
}

/**
 * @name 获取歌单
 * @param {Object} params
 * 可选参数 : order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
limit: 取出歌单数量 , 默认为 50
offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 */
function getTopPlaylist(params) {
	return request({ url: '/top/playlist', data: params })
}

/**
 * @name 获取精品歌单分类
 */
function getHighqualityTag() {
	return request({ url: '/playlist/highquality/tags' })
}

/**
 * @name 获取精品歌单
 * @param {Object} params
 * 可选参数 : cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
limit: 取出歌单数量 , 默认为 20
before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
 */
function getHighquality(params) {
	return request({ url: '/top/playlist/highquality', data: params })
}


/**
 * @name 获取推荐歌单
 */
function getRecommendResource(limit = 5) {
	return request({url: '/personalized?limit=' + limit})
}

/**
 * @name 获取推荐歌曲
 */
function getRecommendSongs(params) {
	return request({ url: '/recommend/songs?t=' + new Date().getTime(), data: params })
}

/**
 * @name 获取相似歌单
 * @param {Object} id
 */
function getSimilarPlayList(id) {
	return request({url: '/simi/playlist?id=' + id })
}

/**
 * @name 获取相似歌曲
 * @param {Object} id
 */
function getSimilarSongs(id) {
	return request({url: '/simi/song?id=' + id })
}

/**
 * @name 获取最近 5 个听了这首歌的用户
 * @param {Object} id
 */
function getSimilarUser(id) {
	return request({url: '/simi/user?id=' + id })
}

/**
 * @name 获取歌单详情
 * @param {Object} id
 */
function getPlayListDetail(id) {
	return request({ url: '/playlist/detail?id=' + id })
}

/**
 * @name 获取歌单所有歌曲
 * @param {Object} params
 * 必选参数 : id : 歌单 id
可选参数 : limit : 限制获取歌曲的数量，默认值为当前歌单的歌曲数量
可选参数 : offset : 默认值为0
 */
function getPlayListTrack(params) {
	return request({ url: '/playlist/track/all', data: params })
}

/**
 * @name 获取歌曲详情
 * @param {Object} ids
 */
function getSongDetail(ids) {
	return request({ url: '/song/detail?ids=' + ids })
}


function getSongUrl(ids) {
	return request({ url: '/song/url?id=' + ids })
}

function checkSongUrl(ids) {
	return request({ url: '/check/music?id=' + ids })
}

function getLyric(id) {
	return request({ url: '/lyric?id=' + id })
}

export {
	getRecommendResource,
	getRecommendSongs,
	getSimilarSongs,
	getSimilarPlayList,
	getSimilarUser,
	getPlayListDetail,
	getPlayListTrack,
	getPlaylistCatlist,
	getHighqualityTag,
	getHighquality,
	getTopPlaylist,
	getSongDetail,
	getSongUrl,
	checkSongUrl,
	getLyric
}