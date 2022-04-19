const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    allowedHosts: 'all',
    client:{
      webSocketURL:{
        protocol:'wss'
      }
    }
  }
})
