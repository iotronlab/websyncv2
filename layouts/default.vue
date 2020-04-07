<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn class nuxt to="/login">Sign in</v-btn>
    </v-app-bar>
    <v-banner v-model="banner" transition="slide-y-transition" class="mb-2" app>
      <v-icon slot="icon" color="success" size="36">mdi-wifi-strength-alert-outline</v-icon>
      Connected to {{server.name}}
      <br />
      Network - {{connection.type}} {{connection.effectiveType || connection.type}}
      <template
        v-slot:actions="{ dismiss }"
      >
        <v-btn text color="primary" @click="dismiss">Dismiss</v-btn>
        <v-btn text color="primary" @click="checkConnection()">Check Connection</v-btn>
      </template>
    </v-banner>
    <v-content>
      <nuxt />
    </v-content>
    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter(s=>s.showing)"
      :key="snackbar.text +
      Math.random()"
      :style="`top: ${(index * 60)+ 10}px`"
      v-model="snackbar.showing"
      top
      :color="snackbar.color"
      :timeout="4000"
    >
      <v-icon class="mr-2">{{snackbar.icon}}</v-icon>
      {{snackbar.text}}
      <v-btn dark text @click="snackbar.showing= false">Close</v-btn>
    </v-snackbar>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      drawer: false,
      banner: true,
      connection: Object,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],

      title: 'WebSync'
    }
  },
  mounted() {
    this.initialize()
  },

  computed: {
    ...mapGetters({
      snackbar: 'snackbar',
      server: 'server'
      //connection: 'connection'
    }),
    ...mapState({
      snackbars: 'snackbars'
    })
  },
  methods: {
    ...mapActions(['initiateServer', 'initiateConnection']),
    async initialize() {
      await this.initiateServer()

      await this.initiateConnection()

      this.connection = navigator.connection

      // commit('SET_CONNECTION', connection)
    },

    checkConnection() {
      if (navigator.onLine) {
        this.connection = navigator.connection
        //console.log(connection)

        // commit('SET_CONNECTION', connection)
      }
    }
  }
}
</script>
