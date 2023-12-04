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
