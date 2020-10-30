<template>
  <v-card class="mx-4 mt-4 py-3 grad-card" width="100%" dark max-width>
    <v-card-title class="alt-title py-0">Welcome Home, {{ $auth.loggedIn ==0 ? 'Guest':user.name}}</v-card-title>
    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-row no-gutters class="d-flex align-center justify-center pt-1 pb-2">
          <v-card-subtitle class="overline py-0">Connected Devices:</v-card-subtitle>
          <p class="display-1 my-auto">{{devices.length+shared.length}}</p>
          <v-icon size="35" class>mdi-home-automation</v-icon>
          <v-card-subtitle class="overline py-0">
            Owned: {{devices.length}}
            <br />
            Shared: {{shared.length}}
          </v-card-subtitle>
        </v-row>
      </v-col>

      <v-col cols="12" md="6">
        <v-card-subtitle class="py-0 d-flex align-center justify-space-around">
          <p v-if="weatherdata.loaded==true" class="overline my-0 mx-2">
            <v-icon>mdi-map-marker</v-icon>
            {{weatherdata.location}}
          </p>
          Weather - {{weatherdata.loaded==0? weatherdata.error :weatherdata.weather}}
        </v-card-subtitle>
        <v-row
          v-if="weatherdata.loaded==true"
          no-gutters
          class="d-flex align-center justify-center"
        >
          <div>
            <v-img
              width="50"
              :src="'https://openweathermap.org/img/wn/'+weatherdata.icon+'@2x.png'"
            ></v-img>
          </div>
          <p class="display-1 my-0 mx-1">
            {{weatherdata.temp-273.15}}
            <v-icon class="ml-n2">mdi-temperature-celsius</v-icon>
          </p>

          <v-card-subtitle class="py-0 mx-1">
            Humidity:
            {{weatherdata.humid}}
            <v-icon>mdi-water-percent</v-icon>
            <br />
            Wind:
            {{weatherdata.wind}}km/h
            <v-icon>mdi-wind-turbine</v-icon>
          </v-card-subtitle>
        </v-row>
      </v-col>
    </v-row>
    <v-card-text v-if="$auth.loggedIn ==0">Login to view your devices</v-card-text>
  </v-card>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    location: null,
    weatherdata: {
      loaded: false,
      temp: null,
      humid: null,
      wind: null,
      weather: null,
      location: null,
      icon: null,
      error: null
    }
  }),
  mounted() {
    this.geolocate()
  },
  methods: {
    ...mapActions([]),
    async geolocate() {
      navigator.geolocation.getCurrentPosition(
        position => {
          let url =
            'https://api.openweathermap.org/data/2.5/weather?lat=' +
            position.coords.latitude +
            '&lon=' +
            position.coords.longitude +
            '&appid=' +
            process.env.WEATHER_API_KEY
          fetch(url)
            .then(resp => resp.json())
            .then(data => {
              console.log(data)
              this.weatherdata.temp = data.main.temp
              this.weatherdata.humid = data.main.humidity
              this.weatherdata.wind = data.wind.speed
              this.weatherdata.location = data.name
              this.weatherdata.weather = data.weather[0].main
              this.weatherdata.icon = data.weather[0].icon
              this.weatherdata.loaded = true
            })
            .catch(err => {
              console.log(err),
                (this.weatherdata.error = 'Service is currently unavailable.')
            })
        },
        error => {
          this.weatherdata.error = error.message
          console.log(error)
        }
      )
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      devices: 'devices',
      shared: 'sharedDevices'
    })
  }
}
</script>
<style lang="scss" >
.alt-title {
  font-family: 'Poppins', sans-serif !important;
}
.grad-card {
  border-radius: 10px !important;
  background-image: linear-gradient(
    135deg,
    $gradientLight 0%,
    $gradientDark 100%
  );
  box-shadow: 0px 5px 20px 0px rgba(103, 67, 213, 0.8);
}
</style>