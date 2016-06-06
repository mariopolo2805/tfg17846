define([
    'angular',
    './wrapper/controller',
    'ui-bootstrap',
    'commons/services/main',
    'commons/models/main',
    'modules/landingPage/main',
    'modules/login/main',
    'modules/mainMenu/main'
], function(angular, controller) {
    'use strict';

    return angular.module('app', [
        'ui.bootstrap',
        'ui.router',
        'tfg.services',
        'tfg.models',
        'tfg.landing',
        'tfg.login',
        'tfg.mainMenu'
    ])
    .controller('TopbarCtrl', ['$rootScope', controller.TopbarCtrl])
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/landingPage");

        $stateProvider
            .state('wrapper', {
                url: '',
                abstract: true,
                views: {
                    'wrapper': {
                        templateUrl: 'wrapper/wrapper.html'
                    },
                    'wrapper-top@wrapper': {
                        templateUrl : 'wrapper/wrapper-top.html',
                        controller: 'TopbarCtrl',
                        controllerAs: 'vm'
                    },
                    'wrapper-content@wrapper': {
                        template: '<ui-view></ui-view>'
                    },
                    'wrapper-foot@wrapper': {
                        templateUrl : 'wrapper/wrapper-foot.html'
                    }
                }
            });
    });

});