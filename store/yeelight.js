export const strict = false

export const state = () => ({
  activeLight: Object,
  yeelightList: Array

})

export const getters = {
  activeLight(state) {
    return state.activeLight
  },
  yeelightList(state) {
    return state.yeelightList
  }
}

export const mutations = {
  SET_ACTIVE(state, light) {
    state.activeLight = light
  },
  SET_LIST(state, list) {
    state.yeelightList = list
  }
}

export const actions = {
  setActive({
      commit
    },
    light
  ) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('SET_ACTIVE', light)
        console.log(light)
        resolve()
      }, 1000)
    })

  },
  async getYeelights({
    commit
  }) {
    await this.$axios.$get('getbulbs').then(res => {
      commit('SET_LIST', res.data)
    }).catch(e => console.log(e))
  },
  async setBrightness({
    dispatch
  }, {
    ip,
    value
  }) {
    await this.$axios
      .$post('yeelight/bright', {
        ip: ip,
        bright: value
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
  }
}
