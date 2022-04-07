import request from '../utils/request.js'

/**
 * @name 
 * @param {Object} params
 *  area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部 type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
	order: 排序,可选值为上升最快,最热,最新,不填则为上升最快
	limit: 取出数量 , 默认为 30
	offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 */
function getAllMV(params) {
	return request({ url: '/mv/all', data: params })
}

/**
 * @name 获取最新MV
 * @param {Object} params
可选参数 : area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
可选参数 : limit: 取出数量 , 默认为 30
 */
function getLatestMV(params) {
	return request({ url: '/mv/first', data: params })
}

/**
 * @name 获取MV排行榜
 * @param {Object} params
 */
function getTopMV(params) {
	return request({ url: '/top/mv', data: params })
}

/**
 * @name 获取MV详情
 * @param {Object} mvid
 */
function getMVDetail(mvid) {
	return request({ url: '/mv/detail?mvid=' + mvid })
}

/**
 * @name 获取 mv 点赞转发评论数数据
 * @param {Object} mvid
 */
function getMVInfo(mvid) {
	return request({ url: '/mv/detail/info?mvid=' + mvid })
}

/**
 * @name 获取MV详情
 * @param {Object} mvid
 * 必选参数 : id: mv id
可选参数 : r: 分辨率,默认 1080,可从 /mv/detail 接口获取分辨率列表
 */
function getMVUrl(mvid) {
	return request({ url: '/mv/url?id=' + mvid })
}


export {
	getAllMV,
	getLatestMV,
	getTopMV,
	getMVDetail,
	getMVInfo,
	getMVUrl
}
