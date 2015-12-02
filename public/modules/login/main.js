define([
    'angular',
    './controller'
], function(angular, controller) {
    'use strict';

    angular
        .module('tfg.login', ['ui.router'])
        .controller('LoginCtrl', ['UserDataModel', 'UserDataSer', controller.LoginCtrl])
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('wrapper.login', {
                    url: '/login',
                    views: {
                        '': {
                            templateUrl: 'modules/login/login.html',
                            controller: 'LoginCtrl',
                            controllerAs: 'vm'
                        }
                    }
                });
        });
});