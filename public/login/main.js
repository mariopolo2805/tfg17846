define([
    'angular',
    './controller'
], function (angular, controller){
    'use strict';

    angular
        .module('tfg.login', ['ui.router'])
        .config(function($stateProvider, $urlRouterProvider){
            $stateProvider
                .state('wrapper.login', {
                    url: '/login',
                    views: {
                        '': {
                            templateUrl: '/login/login.html',
                            controller: 'LoginCtrl',
                            controllerAs: 'vm'
                        }
                    }
                });
        })
        .controller('LoginCtrl', ['$http', controller.LoginCtrl]);
});