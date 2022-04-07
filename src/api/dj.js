import request from '../utils/request.js'

/**
 * @name 获取电台banner
 */
function getDJBanner() {
	return request({ url: '/dj/banner' })
}

/**
 * @name 获取电台个性推荐列表
 * @param {Object} limit
 */
function getDJRecommend(limit) {
	return request({ url: '/dj/personalize/recommend?limit=' + limit })
}

/**
 * @name 获取
 * @param {Object} data
 * limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页
 */
function getDJHot(data) {
	return request({ url: '/dj/hot', data: params })
}

/**
@name  登录后调用此接口 , 可获得电台类型
 */
function getDJCatelist() {
	return request({ url: '/dj/catelist' })
}

/**
 * @name 获取电台分类
 * @param {Object} data
 * 必选参数 : type: 电台类型 , 数字 , 可通过/dj/catelist获取 , 对应关系为 id 对应 此接口的 type, name 对应类型
 */
function getDJType(data) {
	return request({ url: '/dj/recommend/type', data: params })
}

/**
 * @name 获取电台详情
 * @param {Object} id
 */
function getDJDetail(id) {
	return request({ url: '/dj/detail?rid=' + id })
}

/**
 * @name 获取电台节目
 * @param {Object} data
 * limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
asc : 排序方式,默认为 false (新 => 老 ) 设置 true 可改为 老 => 新
 */
function getDJProgram(data) {
	return request({ url: '/dj/program', data: params })
}

/**
 * @name 获取电台节目详情
 * @param {Object} id
 */
function getDJProgramDetail(id) {
	return request({ url: '/dj/program/detail?id=' + id })
}

export {
	getDJBanner,
	getDJRecommend,
	getDJHot,
	getDJCatelist,
	getDJType,
	getDJDetail,
	getDJProgram,
	getDJProgramDetail
}