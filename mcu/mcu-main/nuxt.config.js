import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - mcu',
    title: 'mcu',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/mcu_sealed.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~layouts/global.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    
  ],
  auth: {
    strategies: {
      local: {
        scheme: "refresh",
        token: {
          property: "access",
          maxAge: 900
        },
        refreshToken: {
          property: "refresh",
          data: "refresh",
          maxAge: 1 * 24 * 60 * 60
        },
        user: {
          property: "user"
          // autoFetch: false
        },
        endpoints: {
          login: { url: "/auth/login/", method: "post",propertyName: 'access' },
          refresh: { url: "/auth/refresh/", method: "post" },
          user: { url: "/auth/user/", method: "get" },
          logout: { url: "/auth/logout/", method: "post" }
        },
        autoLogout: false
      }
    },
    redirect: {
      login: "/route",
      logout: "/route",
      callback: "/route",
      home: "/route"
    }
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/auth',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    baseURL: process.env.BASE_URL_DEV
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      light:true,
      themes: {
        dark: {
          primary: "222f3e",
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light:{
          primary: "7c0ba0",
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
