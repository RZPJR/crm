module.exports = {
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      proxy: process.env.VUE_APP_API_URL,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      disableHostCheck: true,
      sockPort: 8505,
      sockHost: "localhost",
      // https: true,
      port: 8505
    },
    externals: ["vue", "vue-router", /^@vue-mf\/.+/]
  },
  filenameHashing: false
};
