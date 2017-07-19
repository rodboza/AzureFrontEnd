console.log('inicio routes.js');

angular.module('azurefrontend').config([
  '$stateProvider',
  '$urlRouterProvider',
  '$httpProvider',
  function ($stateProvider, $urlRouterProvider, $httpProvider) {
    console.log('$stateProvider >>>' + $stateProvider);
    $stateProvider.state('auth', {
      url: "/auth",
      templateUrl: "auth.html"
    }).state('billingCycauthle', {
      url: "/billingCycles?page",
      templateUrl: "billingCycle/tabs.html"
    })

    $httpProvider.interceptors.push('handleResponseError')
  }])
  .run([
    '$rootScope',
    '$http',
    '$location',
    '$window',
    'auth',
    function ($rootScope, $http, $location, $window, auth) {
      validateUser()
      $rootScope.$on('$locationChangeStart', () => validateUser())

      function validateUser() {
        const user = auth.getUser()
        const authPage = '/auth'
        const isAuthPage = $window.location.href.includes(authPage)

        console.log('$window.location.href >>>' + $window.location.href);

        if (!user && !isAuthPage) {
          $window.location.href = authPage
        } else if (user && !user.isValid) {
          auth.validateToken(user.token, (err, valid) => {
            if (!valid) {
              $window.location.href = authPage
            } else {
              user.isValid = true
              $http.defaults.headers.common.Authorization = user.token
              isAuthPage ? $window.location.href = '/' : $location.path('/dashboard')
            }
          })
        }
      }
    }
  ])


console.log('fim routes.js');
