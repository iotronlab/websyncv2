<template>
  <v-card class="ma-2 nucard" min-height="200">
    <v-card-title class="alt-title">
      {{ light }}
      <v-btn small class="nufab" fab @click="openYeelight(light)">
        <v-icon>mdi-window-maximize</v-icon>
      </v-btn>
    </v-card-title>
    <v-row no-gutters>
      <v-col>
        <v-card-text class="display-1 py-0 primary--text">40%</v-card-text>
        <v-card-subtitle class="py-0 overline">Intensity</v-card-subtitle>
      </v-col>
      <v-col>
        <v-icon size="50" color>mdi-lightbulb-cfl-spiral</v-icon>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="d-flex justify-center">
        <v-switch
          color="success"
          class="pa-2 nuswitch"
          inset
          append-icon="mdi-power"
          hide-details
          :input-value="power(light.capabilities.power)"
          @change="updateDevice({ ip: light.ip })"
        ></v-switch>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    light: {
      required: true,
      type: Object
    }
  },

  computed: {
    link() {
      return {
        name: 'yeelight',

        query: { q: this.light }
      }
    }
  },
  methods: {
    openYeelight(light) {
      this.$store.dispatch('yeelight/setActive', light).then(() => {
        this.$router.push('yeelight')
      })

      console.log(light)
    },
    async updateDevice(ip) {
      await this.$axios
        .$post('switch', ip)
        .then(response => {
          console.log(response)
        })
        .catch(e => console.log(e))
    },
    power(value) {
      console.log(value)
      if (value == 'on') {
        return true
      } else return false
    }
  }
}
</script>
