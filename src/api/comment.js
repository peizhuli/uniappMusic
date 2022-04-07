import request from '../utils/request.js'

/**
 * @param {Object} params
 * 必选参数 : id: 音乐 id
可选参数 : limit: 取出评论数量 , 默认为 20
offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
 */
function getMusicComment(params) {
	return request({ url: '/comment/music', data: params })
}

/**
 * @param {Object} params
 * parentCommentId: 楼层评论 id
id : 资源 id
type: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
0: 歌曲
1: mv
2: 歌单
3: 专辑
4: 电台
5: 视频
可选参数 : limit: 取出评论数量 , 默认为 20
 */
function getFloorComment(params) {
	return request({ url: '/comment/floor', data: params })
}

function getAlbumComment(params) {
	return request({ url: '/comment/album', data: params })
}

function getPlaylistComment(params) {
	return request({ url: '/comment/playlist', data: params })
}

function getMVComment(params) {
	return request({ url: '/comment/mv', data: params })
}

function getDJComment(params) {
	return request({ url: '/comment/dj', data: params })
}

function getVideoComment(params) {
	return request({ url: '/comment/video', data: params })
}

export {
	getMusicComment,
	getFloorComment,
	getAlbumComment,
	getPlaylistComment,
	getMVComment,
	getDJComment,
	getVideoComment
}
