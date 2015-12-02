define(['crypto-js'], function(criptoJS) {
    'use strict';

    function LoginCtrl(UserDataModel, UserDataSer) {
        var vm = this;

        // Forms values
        vm.email = "";
        vm.password = "";

        vm.submit = function() {
            UserDataSer.getUserData(vm.email).then(function(user) {
                vm.user = new UserDataModel.UserData(user);
                if(!vm.user.isTeacher) {
                    vm.msgInvalidLogin = "Acceso solo autorizado a profesores";
                } else if(!isCorrectPassword(vm.password, vm.user.password)) {
                    vm.msgInvalidLogin = "Email o contraseña incorrectos";
                } else {
                    vm.msgInvalidLogin = "";
                    //crear rootScope
                    //go() mainMenu
                }
            });
        }

        var isCorrectPassword = function(password, userEncryptPassword) {
            var encryptPassword = criptoJS.SHA256(password).toString();
            return encryptPassword === userEncryptPassword;
        };

    }

    return {
        LoginCtrl: LoginCtrl
    }
});