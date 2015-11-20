define(['angular'], function(angular) {
    'use strict';

    function UserDataSer($http) {

        this.getUserData = function(email) {
            return $http({
                url: 'http://localhost:9000/login/' + email,
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };
    }

    angular
        .module('tfg.services.userDataSer', [])
        .service('UserDataSer', ['$http', UserDataSer]);
});