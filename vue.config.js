let devServer = {
  // 在專案開發中如果呼叫 API 時會 pass 給這個 proxy 網址，即後台網址
  proxy: process.env.VUE_APP_DEV_PROXY,
  // 本地提供 https 憑證
  https: {
    key: process.env.VUE_APP_DEV_SSL_KEY,
    cert: process.env.VUE_APP_DEV_SSL_CERT,
    ca: process.env.VUE_APP_DEV_CA,
  },
  // 開發 server 的 domain 和 port
  host: process.env.VUE_APP_DEV_HOST,
  port: process.env.VUE_APP_DEV_PORT,
};

if (process.env.VUE_APP_DEV_HTTPS === "false") {
  delete devServer.https;
}

module.exports = {
  publicPath: "./",
  // devServer: devServer,
  pages: {
    index: {
      // entry for the page
      entry: "./src/main.ts",
      // 另外在 main.ts 的 router.beforeEach 可自定義網頁標題名稱
      title: process.env.VUE_APP_PROJECT_NAME,
    },
  },
};
