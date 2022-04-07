import request from '../utils/request.js'

/**
 * @name 获取歌手单曲
 * @param {Object} id
 */
function getArtists(id) {
	return request({ url: '/artists?id=' + id })
}

/**
 * @name 获取歌手MV
 * @param {Object} id
 */
function getArtistMV(id) {
	return request({ url: '/artist/mv?id=' + id })
}

/**
 * @name 获取歌手专辑
 * @param {Object} id
 * @param {Object} limit
 * @param {Object} offset
 */
function getArtistsAlbum(id, limit, offset) {
	return request({ url: '/artist/album?id=' + id + '&limit=' + limit + '&offset=' + offset' })
}

/**
 * @name 获取歌手描述
 * @param {Object} id
 */
function getArtistsDesc(id) {
	return request({ url: '/artist/desc?id=' + id })
}

/**
 * @name 获取歌手详情
 * @param {Object} id
 */
function getArtistsDetail(id) {
	return request({ url: '/artist/detail?id=' + id })
}

/**
 * @name 获取相似歌手
 * @param {Object} id
 */
function getSimilarArtists(id) {
	return request({ url: '/simi/artist?id=' + id })
}


export {
	getArtists，
	getArtistMV,
	getArtistsAlbum,
	getArtistsDesc,
	getArtistsDetail,
	getSimilarArtists
}