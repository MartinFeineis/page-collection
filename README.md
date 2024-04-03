# Pages Notes




https://dev.to/taikio/implementing-openid-connect-oidc-authentication-with-nuxt-3-2fa4

https://blogs.sap.com/2021/08/23/keyclock-as-an-openid-connect-oidc-provider./
curl http://optiplex:8080/realms/castlePenguin/.well-known/openid-configuration | jq
Adapter Settings from keycloak
```
{
  "realm": "castlePenguin",
  "auth-server-url": "http://optiplex:8080/",
  "ssl-required": "external",
  "resource": "optiplex-nuxt",
  "credentials": {
    "secret": "PMtNy69PWWLfkpiuQ15OWmgG4kiac2c4"
  },
  "confidential-port": 0
}
```
https://blog.devgenius.io/security-in-vuejs-3-0-with-authentication-and-authorization-by-keycloak-part-1-ae884889fa0d
https://github.com/LearnVueCo/tutorial-code/blob/main/apps/nuxt/components/SiteHeader.vue
https://blogs.sap.com/2021/08/23/keyclock-as-an-openid-connect-oidc-provider./
http://optiplex:8080/realms/castlePenguin/.well-known/openid-configurationdd
http://optiplex:8080/realms/master/protocol/openid-connect/auth?client_id=security-admin-console&redirect_uri=http%3A%2F%2Foptiplex%3A8080%2Fadmin%2Fmaster%2Fconsole%2F%23%2FcastlePenguin%2Frealm-settings&state=0f160765-bfa2-4de6-874c-b8f43e40ec17&response_mode=fragment&response_type=code&scope=openid&nonce=7c078d2c-6209-4f52-881f-3e4e7eca383f&code_challenge=ZjfaRyvyQvzsiZkTflIJf9QBWL0BYGo_7xSe3plq1d4&code_challenge_method=S256
http://optiplex:3000/
https://www.npmjs.com/package/oidc-provider
https://stackoverflow.com/questions/51922428/including-npm-packages-in-vue-js-app#51922969
https://stackoverflow.com/questions/9023672/how-do-i-resolve-cannot-find-module-error-using-node-js

