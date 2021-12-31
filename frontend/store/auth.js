export const state = () => ({
  loggedIn: false,
  user: {
    firstname: '',
    lastname: '',
    pseudo: '',
  }
})

export const mutations = {
  setUser (state, val) {
    if (val === null) {
      state.loggedIn = false
      state.user = {
        firstname: '',
        lastname: '',
        pseudo: '',
      }
    } else {
      state.loggedIn = true
      state.user = val
    }
  }
}

export const actions = {
  async init ({ commit }) {
  try {
    const ret = await this.$axios.$get('auth/me')
    if (ret) {
      commit('setUser', ret)
    } 
  } catch {
      commit('setUser', null)
    }
  },
  async login ({ commit, redirect }, { email, password }) {
    const ret = await this.$axios.$post('auth/login', {
      email,
      password
    })
    if (ret) {
      localStorage.setItem('token', ret.token)
      commit('setUser', {
        firstname: ret.firstname,
        lastname: ret.lastname,
        pseudo: ret.pseudo
      })
      
    } else {
      localStorage.set('token', '')
      commit('setUser', null)
    }
    
  }
}
