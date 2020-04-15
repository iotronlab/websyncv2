export const strict = false

export const state = () => ({
  serverList: [],
  server: Object,
  connection: Object,
  devices: [],
  sharedDevices: [],
  rooms: [],
  updatedDevice: Object,
  updatedDeviceList: [],
  snackbars: [],
  theme: Boolean
})

export const getters = {
  snackbar(state) {
    return state.snackbar
  },
  server(state) {
    return state.server
  },
  theme(state) {
    return state.theme
  },
  connection(state) {
    return state.connection
  },
  devices(state) {
    return state.devices
  },
  sharedDevices(state) {
    return state.sharedDevices
  },
  rooms(state) {
    return state.rooms
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
  SET_THEME(state, theme) {
    state.theme = theme

  },
  SET_DEVICES(state, devices) {
    state.devices = devices
  },
  SET_SHAREDDEVICES(state, sharedDevices) {
    state.sharedDevices = sharedDevices
  },
  SET_ROOMS(state, rooms) {
    state.rooms = rooms
  },
  SET_UPDATEDDEVICE(state, updatedDevice) {
    state.updatedDevice = updatedDevice
    state.updatedDeviceList.splice(0, 0, updatedDevice)
  }
}

export const actions = {
  async initiateServer({
    commit
  }) {
    let response = await this.$axios.$get('/')

    commit('SET_SERVER', response.data)
    commit('SET_SNACKBAR', {
      icon: 'mdi-human-greeting',
      text: response.data.msg,
      color: 'info'
    })
  },
  async updateTheme({
    commit
  }, {

    status
  }) {


    await commit('SET_THEME',
      status
    )

  },
  async initiateConnection({
    commit
  }) {
    await commit('SET_CONNECTION', navigator.connection)
  },
  setSnackbar({
    commit,
    snackbar
  }) {
    snackbar.showing = true
    commit('SET_SNACKBAR', snackbar)
    console.log(snackbar)
  },
  async initiateDevice({
    commit
  }) {
    let response = await this.$axios.$get('/devices')
    console.log(response)
    commit('SET_DEVICES', response.devices)
    commit('SET_SHAREDDEVICES', response.shared)
    commit('SET_ROOMS', response.rooms)
  },
  async updateDevice({
    dispatch
  }, {
    id,
    status
  }) {
    let response = await this.$axios.$patch(`/devices/update`, {
      id,
      status
    })
    console.log(response)
    dispatch('initiateDevice')
  },
  async updatedDevice({
    commit,
    dispatch
  }) {

    commit('SET_UPDATEDDEVICE')
    dispatch('initiateDevice')


  }
}
