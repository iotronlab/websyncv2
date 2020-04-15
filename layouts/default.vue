<template>
  <v-app>
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
        <v-list-item>
          <v-switch
            v-model="$vuetify.theme.dark"
            hide-details
            inset
            :label="'Dark Mode'"
            @change="updateTheme({status: $vuetify.theme.dark} )"
          ></v-switch>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-text="title" />
      <v-spacer />

      <v-btn v-show="$auth.loggedIn==false" nuxt to="/login" app>Sign in</v-btn>
      <v-badge color="success" overlap right class="mt-1">
        <template v-slot:badge>
          <span v-if="list.length > 0">{{ list.length }}</span>
        </template>
        <v-btn small fab class="nufab mt-n1">
          <v-icon id="notifyicon">mdi-bell-ring-outline</v-icon>
        </v-btn>
      </v-badge>
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
      <v-icon class="mr-2" dark>{{snackbar.icon}}</v-icon>
      {{snackbar.text}}
      <v-btn dark text @click="snackbar.showing= false">Close</v-btn>
    </v-snackbar>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }} iotronLabs</span>
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
  created() {
    this.connection = navigator.connection
  },
  watch: {
    list(list) {
      document.getElementById('notifyicon').classList.remove('notify')
      void document.getElementById('notifyicon').offsetWidth
      document.getElementById('notifyicon').classList.add('notify')
      //    setTimeout(
      //    () => document.getElementById("notifyicon").classList.remove("notify"),
      //      1
      //    );
      console.log('list updated')
    }
  },
  computed: {
    ...mapGetters({
      snackbar: 'snackbar',
      server: 'server',
      list: 'updatedDeviceList'
    }),
    ...mapState({
      snackbars: 'snackbars'
    })
  },
  methods: {
    ...mapActions(['initiateServer', 'initiateConnection', 'updatedDevice']),
    async initialize() {
      await this.initiateServer()

      await this.initiateConnection()
      await this.updatedDevice()

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
<style scoped>
.v-application.theme--light .nufab {
  box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5) !important;
}
.v-application.theme--light .nufab:active {
  box-shadow: 7px 7px 15px 0px rgba((0, 0, 0), 0.3),
    -7px -7px 15px 0px rgba((255, 255, 255), 1),
    inset 4px 4px 8px 0px rgba((0, 0, 0), 0.3),
    inset -4px -4px 8px 0px rgba((255, 255, 255), 1) !important;
  border: 2px solid #eee !important;
  text-shadow: 0px 0px 2px rgba((#a2b1ca), 0.3) !important;
}

.v-application.theme--dark .nufab {
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.7),
    -5px -5px 10px rgba(255, 255, 255, 0.1);
}

.v-application.theme--dark .nufab:active {
  box-shadow: 7px 7px 15px 0px rgba((0, 0, 0), 0.3),
    -7px -7px 15px 0px rgba((80, 80, 80), 1),
    inset 4px 4px 8px 0px rgba((0, 0, 0), 0.3),
    inset -4px -4px 8px 0px rgba((80, 80, 80), 1) !important;
  border: 2px solid #444 !important;
  text-shadow: 0px 0px 2px rgba((#707174), 0.3) !important;
}

.notify {
  animation: bell 1s ease-out;
  transform-origin: center top;
}

@keyframes bell {
  0% {
    transform: rotate(35deg);
  }
  12.5% {
    transform: rotate(-30deg);
  }
  25% {
    transform: rotate(25deg);
  }
  37.5% {
    transform: rotate(-20deg);
  }
  50% {
    transform: rotate(15deg);
  }
  62.5% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(0);
  }
}
</style>