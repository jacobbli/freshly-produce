import store from '../store/store';

const axios = require('axios').default;
// import store from '../store/store'

export async function login(loginForm) {
  try {
    let endpointUrl = `${process.env.VUE_APP_ROOT_URL}/user/login`;
    let response = await axios.post(endpointUrl, loginForm, {
      headers: {'Content-Type': 'application/json' },
    });

    store.dispatch('users/setUser', response.data)
    return Promise.resolve('Successful request');
  } catch(err) {
    return Promise.reject('Request failed');
  }
}