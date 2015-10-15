define([], function(){
    'use strict';

    function LoginCtrl($http) {
        var vm = this;

        vm.email = "marioantonio.polo@estudiante.uam.es";

        var req = {
            method: 'POST',
            url: 'http://localhost:9000/login/' + vm.email
        }

        $http(req).success(function(data) {
            console.log(data);
        });

    }

    return {
        LoginCtrl: LoginCtrl
    }
});