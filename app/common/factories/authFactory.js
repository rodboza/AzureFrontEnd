console.log("inicio authFactory.js");

angular.module('azurefrontend').factory('auth', [
    '$http',
    '$rootScope',
    'consts',
    AuthFactory
])

function AuthFactory($http, $rootScope, consts) {

    let user = null

    function signup(user, callback) {
        submit('signup', user, callback)
    }

    function login(user, callback) {
        submit('login', user, callback)
    }

    function submit(url, user, callback) {
        $http.post(`${consts._oapiUrl}/${url}`, user)
            .then(resp => {
                localStorage.setItem(consts._userKey, JSON.stringify(resp.data))
                $http.defaults.headers.common.Authorization = resp.data.token
                if (callback) callback(null, resp.data)
            }).catch(function (resp) {
                if (callback) callback(resp.data.errors, resp.data)
            })
    }

    function logout(callback) {
        user = null
        localStorage.removeItem(consts._userKey)
        $http.defaults.headers.common.Authorization = ''
        if (callback) callback(null)
    }

    function validateToken(token, callback) {
        if (token) {
            $http.post(`${consts._oapiUrl}/validateToken`, { token })
                .then(resp => {
                    if (!resp.data.valid) {
                        logout()
                    } else {
                        $http.defaults.headers.common.Authorization = getUser().token
                    }
                    if (callback) callback(null, resp.data.valid)
                }).catch(function (resp) {
                    if (callback) callback(resp.data.errors)
                })
        } else {
            if (callback) callback('Token inválido.')
        }
    }

    function getUser() {
        if(!user) {
            user = JSON.parse(localStorage.getItem(consts._userKey))
        }
        return user
    }

    return { signup, login, logout, validateToken, getUser }
}

console.log("fim authFactory.js");
