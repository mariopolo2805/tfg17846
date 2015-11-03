define([
    'angular',
    'ui-bootstrap',
    'landingPage/main',
    'login/main'
], function(angular, directivesDecorators){
    'use strict';

    return angular.module('app', [
        'ui.bootstrap',
        'ui.router',
        'tfg.landing',
        'tfg.login'
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