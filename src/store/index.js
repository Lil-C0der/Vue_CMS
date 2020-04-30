import Vue from 'vue'
import Vuex from 'vuex'
import { USERLOGIN, USERLOGOUT, SETCRUMBOBJ } from './types'

Vue.use(Vuex)

const state = {
  isLogin: false,
  token: null,
  crumbObj: {}
}

const mutations = {
  [USERLOGIN](state, payload) {
    state.isLogin = true
    state.token = payload
    window.sessionStorage.setItem('token', payload)
    window.sessionStorage.setItem('isLogin', true)
  },
  [USERLOGOUT](state) {
    state.isLogin = false
    state.token = null
    window.sessionStorage.clear('token')
    window.sessionStorage.clear('isLogin')
  },
  [SETCRUMBOBJ](state, payload) {
    state.crumbObj = payload
    window.sessionStorage.setItem('crumbObj', JSON.stringify(payload))
  }
}

const getters = {
  token: (state) => state.token
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})
