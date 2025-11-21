const state = {
  themeColor: "#1890FF"
}
const mutations = {
 CHANGE_THEMECOLOR(state, val) {
    state.themeColor = val;
  }
}
const actions = {
  changeThemeColor({ commit }, data) {
    commit('CHANGE_THEMECOLOR', data.value);
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
