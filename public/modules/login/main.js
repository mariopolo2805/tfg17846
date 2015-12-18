define([
    'angular',
    './controller'
], function(angular, controller) {
    'use strict';

    angular
        .module('tfg.login', ['tfg.mainMenu', 'ngCookies', 'ui.router'])
        .controller('LoginCtrl', [
            '$cookies',
            '$state',
            'UserDataModel',
            'UserDataSer',
            controller.LoginCtrl
        ])
        .config(function($stateProvider) {
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