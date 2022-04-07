import request from '../utils/request.js'

/**
 * @name 搜索歌曲
 * @param {Object} params
 * 必选参数 : keywords : 关键词
可选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
 */
function searchSong(params) {
	return request({ url: '/cloudsearch', data: params })
}

/**
 * @name 获取搜索关键词
 */
function getKeyWord() {
	return request({ url: '/search/default' })
}

/**
 * @name 获取热搜列表
 */
function getHotSearch() {
	return request({ url: '/search/hot/detail' })
}

/**
 * @name 获取搜索建议
 * @param {Object} params
 * 必选参数 : keywords : 关键词
可选参数 : type : 如果传 'mobile' 则返回移动端数据
 */
function getSearchSuggest(params) {
	return request({ url: '/search/suggest', data: params })
}

/**
 * @name 获取多重匹配
 * @param {Object} keywords
 */
function getMultimatch(keywords) {
	return request({ url: '/search/multimatch?keywords=' + keywords })
}

export {
	searchSong,
	getHotSearch,
	getKeyWord,
	getSearchSuggest,
	getMultimatch
}