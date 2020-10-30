<template>
  <v-sheet class>
    <v-tabs grow>
      <v-tab v-for="room in rooms" :key="room.id" class="ma-1 nutab">{{ room.name }}</v-tab>

      <v-tab-item v-for="room in rooms" :key="room.id">
        <v-container fluid class="px-0">
          <v-row no-gutters>
            <v-col
              v-for="device in devices"
              :key="device.id"
              v-show="device.room == room.id"
              cols="6"
              md="4"
            >
              <v-card class="ma-2 nucard" min-height="200">
                <v-card-title class="alt-title">{{ device.name }}</v-card-title>
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
                      :device="device"
                      v-model="device.status"
                      @change="updateDevice({id: device.id, status: device.status})"
                    ></v-switch>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-card-subtitle class>{{ shared }}</v-card-subtitle>
          <v-row no-gutters>
            <v-col
              v-for="device in shared"
              :key="device.id"
              v-show="device.room == room.id"
              cols="6"
              md="4"
            >
              <v-card height="200" class="mx-1" elevation="1">
                <v-card-title>{{ device.name }}</v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-sheet>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data: () => ({
    show: false
  }),
  created() {},
  mounted() {
    this.socket = this.$nuxtSocket({
      name: 'home'
      //  persist: 'mySocket'
    })
    this.initialize()

    this.$OneSignal.push(
      async () => await this.$OneSignal.showSlidedownPrompt(),
      console.log(this.$OneSignal),
      this.$OneSignal.isPushNotificationsEnabled(isEnabled => {
        if (isEnabled) {
          console.log('Push notifications are enabled!')
        } else {
          console.log('Push notifications are not enabled yet.')
        }
      })
    )
    //this.displayNotification()
    //    this.initiateSocket()
    // this.socket.on('updatedDevice',  function(msg){
    // console.log('yuhu')
    //  })
  },
  computed: {
    ...mapGetters({
      rooms: 'rooms',
      devices: 'devices',
      shared: 'sharedDevices',
      list: 'updatedDeviceList'
    })
  },
  watch: {},
  methods: {
    ...mapActions(['initiateDevice', 'updateDevice']),
    async initialize() {
      await this.initiateDevice()
      await this.socket.send('User Connected')
      // await Notification.requestPermission(function(status) {
      //    console.log(status)
      //  })
      //   console.log($OneSignal)

      // Using window and array form
    }
  }
}
</script>
<style >
.nucard {
  border-radius: 20px !important;
}

.nutab {
  border-radius: 10px !important;
}
.nuswitch {
  border-radius: 32px;
}

.v-application.theme--dark .nuswitch {
  transition: background 0.1s, color 0.1s;
  box-shadow: -2px -2px 6px rgba(255, 255, 255, 0.1),
    2px 2px 6px rgba(0, 0, 0, 0.8);
}
.v-application.theme--light .nuswitch {
  transition: background 0.1s, color 0.1s;
  box-shadow: 10px 4px 12px rgba(0, 0, 0, 0.15),
    -7px -7px 14px rgba(255, 255, 255, 1),
    inset 1px 1px 0 rgba(255, 255, 255, 1);
}
.v-application.theme--light .nucard {
  transition: background 0.1s, color 0.1s;
  background: linear-gradient(
    -45deg,
    rgba(0, 0, 0, 0.2),
    rgba(255, 255, 255, 0.3)
  );
  box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5) !important;
}
.v-application.theme--light .nucard:active {
  transition: background 0.1s, color 0.1s;
  box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.2),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.5);
  background: linear-gradient(
    -45deg,
    rgba(0, 0, 0, 0.2),
    rgba(255, 255, 255, 0.3)
  );
}
.v-application.theme--dark .nucard {
  transition: background 0.1s, color 0.1s;
  background: linear-gradient(135deg, #3e4047, #17171a);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.7),
    -5px -5px 10px rgba(255, 255, 255, 0.1);
}
.v-application.theme--light .nutab {
  transition: background 0.1s, color 0.1s;
  background: linear-gradient(
    -45deg,
    rgba(0, 0, 0, 0.2),
    rgba(255, 255, 255, 0.3)
  );
  box-shadow: inset 3px 3px 5px #cbcbcb, inset -3px -3px 5px #ffffff;
}
.v-application.theme--dark .nutab {
  transition: background 0.1s, color 0.1s;
  background: linear-gradient(145deg, #1c1d21, #17181c);
  box-shadow: inset 3px 3px 6px #101114, inset -3px -3px 6px #24252a;
}
</style>
