export const strict = false

export const state = () => ({
  serverList: [],
  server: Object,
  connection: Object,
  devices: [],
  updatedDevice: Object,
  updatedDeviceList: [],
  snackbars: []
})

export const getters = {
  snackbar(state) {
    return state.snackbar
  },
  server(state) {
    return state.server
  },
  connection(state) {
    return state.connection
  },
  devices(state) {
    return state.devices
  },
  updatedDevice(state) {
    return state.updatedDevice
  },
  updatedDeviceList(state) {
    return state.updatedDeviceList
  }
}

export const mutations = {
  SET_SNACKBAR(state, snackbar) {
    snackbar.showing = true
    snackbar.icon = snackbar.icon || 'mdi-alert-circle-outline'
    snackbar.color = snackbar.color || 'success'
    state.snackbars = state.snackbars.concat(snackbar)
    //  this.$toast.show('Please Log in')
  },
  SET_SERVER(state, server) {
    state.server = server
  },
  SET_CONNECTION(state, connection) {
    state.connection = connection
  },
  SET_DEVICES(state, devices) {
    state.devices = devices
  },
  SET_UPDATEDDEVICE(state, updatedDevice) {
    state.updatedDevice = updatedDevice
    state.updatedDeviceList.splice(0, 0, updatedDevice)
  }
}

export const actions = {
  async initiateServer({ commit }) {
    let response = await this.$axios.$get('/')

    commit('SET_SERVER', response.data)
    commit('SET_SNACKBAR', {
      icon: 'mdi-human-greeting',
      text: response.data.msg,
      color: 'info'
    })
  },
  setSnackbar({ commit, snackbar }) {
    snackbar.showing = true
    commit('SET_SNACKBAR', snackbar)
    console.log(snackbar)
  },
  async initiateDevice({ commit }) {
    let response = await this.$axios.$get('/devices')

    commit('SET_DEVICES', response.data)
  },
  async update({ dispatch }, { id, status }) {
    let response = await this.$axios.$patch(`/devices/update`, {
      id,
      status
    })
    console.log(response)
    dispatch('initiateDevice')
  }
  //async updateDevice({ commit, dispatch }) {
  //	await this.$echo.channel("home").listen("StatusUpdate", e => {
  //		console.log(e.device)
  //		commit('SET_UPDATEDDEVICE', e.device)
  //		dispatch('initiateDevice')
  //
  //	});
  // }
}
