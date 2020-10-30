<template>
  <transition name="fade">
    <v-container fluid class="pa-0">
      <v-row no-gutters>
        <v-col>
          <v-sheet class="text-center">
            <v-row no-gutters>
              <UserWeather />
            </v-row>
            <v-col>
              <v-sheet>
                <v-toolbar flat>
                  <h2 class="title">Yeelights</h2>
                  <v-spacer />
                  <v-btn fab small @click="getYeelights">
                    <v-icon>mdi-refresh</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-row no-gutters>
                  <v-col v-for="light in yeelights" :key="light.ip">
                    <YeeLight :light="light" />
                  </v-col>
                </v-row>
              </v-sheet>
            </v-col>

            <v-col v-if="$auth.loggedIn">
              <RoomTabs />
            </v-col>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </transition>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import RoomTabs from '@/components/RoomTabs.vue'
import UserWeather from '@/components/UserWeather'
import YeeLight from '@/components/YeeLight'

//import SocketStatus from '@/node_modules/nuxt-socket-io/components/SocketStatus'
export default {
  data() {
    return {}
  },
  components: {
    RoomTabs,
    UserWeather,
    YeeLight
  },
  //middleware: 'auth-user',
  mounted() {
    // Inside page components
    // this.initialize()
  },
  computed: {
    ...mapGetters({
      yeelights: 'yeelight/yeelightList'
    })
  },
  methods: {
    ...mapActions({
      getYeelights: 'yeelight/getYeelights'
    })
  }
}
</script>
