define([], function() {
    'use strict';

    function LoginCtrl(UserDataModel, UserDataSer) {
        var vm = this;

        // Forms values
        vm.email = "";
        vm.password = "";

        vm.submit = function() {
            UserDataSer.getUserData(vm.email).then(function(user) {
                vm.user = new UserDataModel.UserData(user);
                console.log(vm.user);
                if(vm.user.password !== vm.password) {
                    vm.msgInvalidLogin = "Email o contraseña incorrectos";
                } else if(!vm.user.isTeacher) {
                    vm.msgInvalidLogin = "Acceso solo autorizado a profesores";
                } else {
                    vm.msgInvalidLogin = "";
                    //crear rootScope
                    //go() mainMenu
                }
            });
        }

    }

    return {
        LoginCtrl: LoginCtrl
    }
});