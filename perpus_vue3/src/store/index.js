import { createStore } from 'vuex'


export default createStore({
  state: {
    isLogin: "",
    token: "",
    user: {}
  },
  mutations: {
    setToken: function(state, token){
      localStorage.setItem("Authorization", token)
      state.token = token
      state.isLogin = true
    },
    setUser: function(state, data){
      state.user = data
    },
    logout: function(state){
      localStorage.removeItem('Authorization')
      state.token = ""
      state.isLogin = false
      state.user = ""
    },
  },
})
