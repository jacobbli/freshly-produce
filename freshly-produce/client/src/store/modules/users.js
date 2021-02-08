// Create a new store instance.
const state = () => {
  return {
    user_id: '',
    username: '',
    first_name: '',
    surname: '',
    user_role: ''
  }
}

const getters = {
  getUserId (state) {
    return state.user_id;
  },
  getUsername (state) {
    return state.username;
  },
  getUserRole (state) {
    return state.user_role;
  }
}

const mutations = {
  SET_USER_ID (state, payload) {
    state.user_id = payload;
  },
  SET_USERNAME (state, payload) {
    state.username = payload;
  },
  SET_USER_ROLE (state, payload) {
    state.user_role = payload;
  }
}

const actions = {
  setUser(context, user) {
    context.commit('SET_USER_ID', user.user_id);
    context.commit('SET_USERNAME', user.username);
    context.commit('SET_USER_ROLE', user.role);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}