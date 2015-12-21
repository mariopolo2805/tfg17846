define(['crypto-js'], function(criptoJS) {
    'use strict';

    function LoginCtrl($cookies, $state, UserDataModel, UserDataSer) {
        var vm = this;

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
                    var expired = new Date();
                    expired.setMinutes(expired.getMinutes() + 30);
                    $cookies.putObject('user', vm.user, { expires : expired });
                    $state.go('wrapper.mainMenu');
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



// $cookies.put('user', user.username);
// var username = $cookies.get('user');

// var today = new Date(); //You can set the expired time with the third params
// var expired = new Date(today);
// expired.setDate(today.getDate() + 1); //Set expired date to tomorrow
// $cookies.put('user', user.username, {expires : expired });