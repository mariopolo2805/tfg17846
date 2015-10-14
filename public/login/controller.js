define([], function(){
    'use strict';

    function LoginCtrl($http) {
        var vm = this;

        vm.name = "LOGIN";

        var req = {
            method: 'POST',
            url: 'http://localhost:9000/login',
            params: { user: 'marioantonio.polo@estudiante.uam.es' }
        }

        console.log("Query");

        $http(req).success(function(data) {
            console.log(data);
        });

        console.log("Query");

    }

    return {
        LoginCtrl: LoginCtrl
    }
});