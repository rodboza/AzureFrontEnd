console.log("inicio authController.js");

angular.module('azurefrontend').controller('AuthCtrl', [
  '$location',
  'auth',
  'msgs',
  AuthController
])

function AuthController($location, auth, msgs) {
    const vm = this;
    vm.loginMode = true;
	//vm.path = process.env.PATH || 'não achou o path';

    vm.changeMode = () => vm.loginMode = !vm.loginMode;
    vm.getUser = () => auth.getUser(0);

    vm.login = () => {
        auth.login(vm.user, err => err ? msgs.addError(err) : $location.path('/'));
    }

    vm.signup = () => {
        auth.signup(vm.user, err => err ? msgs.addError(err) : $location.path('/'));
    }

    vm.logout = () => {
        auth.logout(() => $location.path('/'));
    }
}

console.log("fim authController.js");
