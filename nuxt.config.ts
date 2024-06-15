// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  experimental: {
    componentIslands: true,
  },
  // routeRules: {
  //   '/swcomics': { ssr: true },
  // },
  // plugins: ['~/plugins/qr'],
  // modules: [
  //   'nuxt-vue3-google-signin'
  // ],
  // googleSignIn: {
  //   clientId: '969151254190-pl534uplm25np58ajk2fi93hhidqp4pn.apps.googleusercontent.coms',
  // },
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css', integrity: 'sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor', crossorigin: 'anonymous' }
      ],
      // meta: [
      //   { hid: 'google-signin-client_id', name: 'google-signin-client_id', content: '969151254190-pl534uplm25np58ajk2fi93hhidqp4pn.apps.googleusercontent.coms' }
      // ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js', integrity: 'sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2', crossorigin: 'anonymous' },
        // { src: 'https://apis.google.com/js/platform.js', async: true, defer: true }
      ]
    }
  }
})
