<template>
  <v-sheet>
    <v-card class="nucard ma-2" v-if="light">
      <v-card-title class="py-0">
        Yeelight {{light.capabilities}}
        <v-spacer />
        <v-switch color="success" class="pa-2 nuswitch" inset append-icon="mdi-power" hide-details></v-switch>
      </v-card-title>
      <v-card-subtitle>{{light.ip}}</v-card-subtitle>
      <h3 class="subtitle-1 text-center">BRIGHTNESS</h3>
      <v-slider
        v-model="light.capabilities.bright"
        thumb-label
        append-icon="mdi-brightness-4"
        min="0"
        max="100"
        @change="setBrightness(light.ip, light.capabilities.bright)"
      ></v-slider>

      <v-row>
        <v-col class="d-flex justify-center">
          <v-color-picker v-model="color"></v-color-picker>
        </v-col>
        <v-col cols="12" md="4">
          <v-sheet dark class="pa-4">
            <pre>{{ showColor }}</pre>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card>
  </v-sheet>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  async asyncData({ store }) {
    console.log('working')
    // return { light: store.state.yeelight }
  },
  data: () => ({
    //light: Object,
    slider: 45,

    type: 'hex',
    hex: '#FF00FF',
    hexa: '#FF00FFFF',
    rgba: { r: 255, g: 0, b: 255, a: 1 },
    hsla: { h: 300, s: 1, l: 0.5, a: 1 },
    hsva: { h: 300, s: 1, v: 1, a: 1 }
  }),
  created() {
    this.getActiveLight()
  },
  mounted() {
    this.intialize()
  },
  computed: {
    ...mapGetters({
      light: 'yeelight/activeLight'
    }),
    color: {
      get() {
        return this[this.type]
      },
      set(v) {
        this[this.type] = v
      }
    },
    showColor() {
      if (typeof this.color === 'string') return this.color

      return JSON.stringify(
        Object.keys(this.color).reduce((color, key) => {
          color[key] = Number(this.color[key].toFixed(2))
          return color
        }, {}),
        null,
        2
      )
    }
  },
  methods: {
    async intialize() {
      //   this.convertRGBtoHEX(light.capabilities.rgb)
      // console.log(light)
    },
    convertRGBtoHEX(rgb) {
      console.log(rgb)
      let red = (rgb >> 16) & 0x0ff
      let green = (rgb >> 8) & 0x0ff
      let blue = rgb & 0x0ff
      console.log(red, green, blue)
    },
    getActiveLight() {
      //  this.light = this.$store.state.yeelight
      // console.log(this.$store.state.yeelight)
    }
  }
}
</script>