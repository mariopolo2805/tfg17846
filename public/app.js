define([
    'angular',
    'ui-bootstrap',
    'login/main'
], function(angular, directivesDecorators){
    'use strict';

    return angular.module('app', [
        'ui.bootstrap',
        'ui.router',
        'tfg.login'
    ])
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('root', {
                url: '',
                template: '<ui-view/>'
            });
    });

});