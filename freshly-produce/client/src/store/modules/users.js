// Create a new store instance.
const state = () => {
  return {
    user_id: '',
    username: '',
    first_name: '',
    surname: '',
    email: '',
    address: '',
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
  },
  getFirstName (state) {
    return state.first_name;
  },
  getSurname (state) {
    return state.surname;
  },
  getEmail (state) {
    return state.email;
  },  
  getAddress (state) {
    return state.address;
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
  },
  SET_FIRST_NAME (state, payload) {
    state.first_name = payload;
  },
  SET_SURNAME (state, payload) {
    state.surname = payload;
  },
  SET_EMAIL (state, payload) {
    state.email = payload;
  },
  SET_ADDRESS (state, payload) {
    state.address = payload;
  }
}

const actions = {
  setUser(context, user) {
    context.commit('SET_USER_ID', user.user_id);
    context.commit('SET_USERNAME', user.username);
    context.commit('SET_USER_ROLE', user.role);
    context.commit('SET_FIRST_NAME', user.first_name);
    context.commit('SET_SURNAME', user.surname);
    context.commit('SET_EMAIL', user.email);
    context.commit('SET_ADDRESS', user.address);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}