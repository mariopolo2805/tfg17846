define([
    'angular',
    './controller'
], function(angular, controller) {
    'use strict';

    angular
        .module('tfg.mainMenu', ['ui.router'])
        .controller('MainMenuCtrl', [controller.MainMenuCtrl])
        .controller('EditableChecksCtrl', [controller.EditableChecksCtrl])
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('wrapper.mainMenu', {
                    url: '/mainMenu',
                    views: {
                        '': {
                            templateUrl: 'modules/mainMenu/mainMenu.html',
                            controller: 'MainMenuCtrl',
                            controllerAs: 'vm'
                        }
                    }
                });
        });
});