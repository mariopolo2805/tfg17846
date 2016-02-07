define(['angular'], function(angular) {
    'use strict';

    function UserDataSer($http, $cookies, $state) {

        this.getUserData = function(email) {
            return $http({
                url: 'http://localhost:9000/login/' + email,
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };

        this.getStudentsOfSubjectData = function(id) {
            return $http({
                url: 'http://localhost:9000/studentsOfSubject/' + id,
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };

        this.getUserCookie = function() {
            var user = $cookies.getObject('user');
            if(angular.isUndefined(user)) {
                alert("Su sesión ha cadudado");
                $state.go('wrapper.landingPage');
            }
            return user;
        };
    }

    angular
        .module('tfg.services.userDataSer', ['ngCookies'])
        .service('UserDataSer', ['$http', '$cookies', '$state', UserDataSer]);
});