const url = "http://localhost:5050/";
const PROXY_CONFIG = {
    baseUrl: url,
    "/api/*": {
        target: url,
        secure: false,
        logLevel: "debug",
    },
    "/config": {
        target: `${url}/.well-known/openid-configuration`,
        secure: false,
        logLevel: "debug",
        ignorePath: true,
        changeOrigin: true,
        pathRewrite: { '^/config': '' },
        router: function (req) {
            return `${url}/.well-known/openid-configuration`;
        }
    },
    "/.well-known/openid-configuration/jwks": {
        target: `${url}/.well-known/openid-configuration/jwks`,
        secure: false,
        logLevel: "debug",
        ignorePath: true,
    },
    "/host/*": {
        target: url,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: { '^/host': '' },
    },
    "/connect/*": {
        target: url,
        secure: true,
        logLevel: "debug",
        changeOrigin: true,
        router: function (req) {
            return url;
        }
    }
}

module.exports = PROXY_CONFIG;