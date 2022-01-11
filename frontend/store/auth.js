export const state = () => ({
  loggedIn: false,
  user: {
    userId:'',
    isAdmin:'',
    firstname: '',
    lastname: '',
    pseudo: '',
    avatar:'',
    
  }
})

export const mutations = {
  setUser (state, val) {
    if (val === null) {
      state.loggedIn = false
      state.user = {
        userId:'',
        isAdmin:'',
        firstname: '',
        lastname: '',
        pseudo: '',
        avatar:'',
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
  async login ({ commit }, { email, password }) {
    const ret = await this.$axios.$post('auth/login', {
      email,
      password
    })
    if (ret) {
      localStorage.setItem('userId', ret.userId)
      localStorage.setItem('token', ret.token)
      localStorage.setItem('lastname', ret.lastname)
      localStorage.setItem('firstname', ret.firstname)
      localStorage.setItem('pseudo', ret.pseudo)
      localStorage.setItem('avatar',ret.avatar)
      localStorage.setItem('isAdmin',ret.isAdmin)
      commit('setUser', {
        userId: ret.userId,
        isAdmin : ret.isAdmin,
        firstname: ret.firstname,
        lastname: ret.lastname,
        pseudo: ret.pseudo,
        avatar: ret.avatar,
      })
      
    } else {
      localStorage.set('token', '')
      commit('setUser', null)
    }
    
  }
}
