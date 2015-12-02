define([
    'angular'
], function(angular) {
    'use strict';

    angular
        .module('tfg.landing', ['ui.router'])
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('wrapper.landingPage', {
                    url: '/landingPage',
                    views: {
                        '': {
                            templateUrl: '/modules/landingPage/landingPage.html'
                        }
                    }
                });
        });
});