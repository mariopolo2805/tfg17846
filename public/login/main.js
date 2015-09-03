define([
    'angular',
    './controller'
], function (angular, controller){
    'use strict';

    angular
        .module('tfg.login', ['ui.router'])
        .config(function($stateProvider, $urlRouterProvider){
            $stateProvider
                .state('root.login', {
                    url: '/login',
                    views: {
                        '': {
                            templateUrl: '/login/login.html',
                            controller: 'LoginCtrl',
                            controllerAs: 'vm'
                        }
                        /*'typography@root.elements': {
                            templateUrl: '/elements/views/typography.html'
                        }*/
                    }
                });

        })
        .controller('LoginCtrl', controller.LoginCtrl);
});

this.hide = function() {
    var div = document.getElementById("landing-page");
    div.style.display = "none";
}