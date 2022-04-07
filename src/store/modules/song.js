const state = {
  playId: null, // 歌曲ID
  playUrl: null, //歌曲url
  songInfo: {}, // 歌曲信息
  isPlaying: false, // 是否正在播放
  playlist: []  // 歌单列表
}

const mutations = {
  SET_PLAY_ID(state, playId) {
    state.playId = playId
  },
  SET_PLAY_URL(state, url) {
	  state.playUrl = url
  },
  SET_SONG_INFO(state, songInfo) {
	  state.songInfo = songInfo
  },
  SET_PLAYING(state, isPlaying) {
	  state.isPlaying = isPlaying
  },
  SET_PLAYLIST(state, playlist) {
	  state.playlist = playlist
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}