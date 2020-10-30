import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/onesignal',
    '@nuxtjs/axios',

    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'nuxt-socket-io',

  ],
  oneSignal: {
    cdn: true,
    init: {

      appId: 'e63876a9-3f7c-4163-81e0-acb1f5521808',
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
        disable: false
      },
      autoRegister: true
    }
  },

  //socket config
  io: {
    sockets: [{
      name: 'home',
      url: 'http://127.0.0.1:5000',
      default: true,
      vuex: { // optional
        // pass in the evt --> mutation map OR array of actions
        actions: [{
          socketUpdate: 'socketUpdate'
        }], // pass in the evt --> action map OR array of actions or mixed!,
        // pass in the state props you want to listen for changes on. When those props thance, they'll fire these "emitBack" events. If the emitBack is a string, it will send the string, otherwise, if it's an object, it will send the mapped string. (see the updated examples in the page/examples.vue, where I also use a "mapState2Way" function in the component).
      },
    }]
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  auth: {
    redirect: {
      home: '/',
      logout: '/',
      login: '/',
      callback: '/'
    },
    watchLoggedIn: true,
    refresh_token: {
      prefix: '_refresh_token.'
    },
    token: {
      prefix: '_token.'
    },
    localStorage: true,
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/',
        expires: 5
        // domain: '',
        // secure - false,
      }
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
            propertyName: 'token'
          },
          user: {
            url: '/userdetails',
            method: 'get',
            propertyName: 'data'
          },
          logout: {
            url: '/logout',
            method: 'post'
          }
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      }
    }
  },

  axios: {
    baseURL: 'http://127.0.0.1:5000'
  },
  plugins: [{
    src: '~/plugins/local-storage.js',
    ssr: false
  }],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    customProperties: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.deepPurple.accent2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent4
        },
        light: {
          primary: colors.deepPurple.accent3,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.darken1
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
