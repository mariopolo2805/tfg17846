define([], function(){
    'use strict';

    function LoginCtrl($http) {
        var vm = this;

        vm.email = "marioantonio.polo@estudiante.uam.es";
        vm.password = "";

        vm.submit = function() {
            var req = {
                method: 'POST',
                url: 'http://localhost:9000/login/' + vm.email
            }

            $http(req).success(function(data) {
                if(data.password === vm.password) {
                    console.log("Password correcta!");
                } else {
                    console.log("Error en login");
                }
            });
        }

    }

    return {
        LoginCtrl: LoginCtrl
    }
});