define([], function(){
    'use strict';

    function LoginCtrl($http) {
        var vm = this;

        vm.name = "LOGIN";

        console.log("Query");

        $http.get('http://localhost:9000/login').success(function(data) {
            console.log(data);
        });

        console.log("Query");

    }

    return {
        LoginCtrl: LoginCtrl
    }
});