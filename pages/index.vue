<template>
  <v-container fluid class="pa-0">
    <transition name="bounce">
      <v-row no-gutters>
        <v-col>
          <v-sheet class="text-center">
            <v-btn @click="doStuff()" />
            <v-card-title
              class="alt-title pb-0 pt-2"
            >Welcome Home, {{ $auth.loggedIn ==0 ? 'Guest':user.name}}</v-card-title>

            <v-card-text v-if="$auth.loggedIn ==0">Login to view your devices</v-card-text>
            <v-col v-if="$auth.loggedIn">
              <RoomTabs />
            </v-col>
          </v-sheet>
        </v-col>
      </v-row>
    </transition>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import RoomTabs from '@/components/RoomTabs.vue'
//import SocketStatus from '@/node_modules/nuxt-socket-io/components/SocketStatus'
export default {
  data: () => ({
    //socketStatus: {},
    //badStatus: {}
  }),
  components: {
    RoomTabs
    //SocketStatus
  },
  middleware: 'auth-user',
  mounted() {
    
  },
  methods: {
    ...mapActions(['updatedDevice']),
    async initiateSocket() {
      

     
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  }
}
</script>
<style lang="scss" >
.alt-title {
  font-family: 'Poppins', sans-serif;
}
</style>