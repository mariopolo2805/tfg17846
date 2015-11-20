define([
    'angular',
    'ui-bootstrap',
    'commons/services/main',
    'commons/models/main',
    'landingPage/main',
    'login/main',
    'mainMenu/main'
], function(angular) {
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
                    'wrapper-top@wrapper' : {
                        templateUrl : 'wrapper/wrapper-top.html',
                    },
                    'wrapper-content@wrapper' : {
                        template: '<ui-view></ui-view>'
                    },
                    'wrapper-foot@wrapper' : {
                        templateUrl : 'wrapper/wrapper-foot.html',
                    }
                }
            });
    });

});