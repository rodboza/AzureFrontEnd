console.log('inicio consts._js');

angular.module('azurefrontend').constant('consts', {
  _appName: 'RODBOZA - Frontend APP',
  _version: '1.0',
  _owner: 'RODBOZA',
  _year: '2017',
  _site: 'http://rodboza.azurewebsites.net/',
  _apiUrl: 'http://rodboza.backend.azurewebsites.net/api',
  _oapiUrl: 'http://rodboza.backend.azurewebsites.net/oapi',
  _userKey: '_primeira_app_user'
}).run(['$rootScope', 'consts', function ($rootScope, consts) {
  $rootScope.consts = consts
}]);
console.log('fim consts._js');
