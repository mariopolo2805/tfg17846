define([
    'angular',
    './controller'
], function(angular, controller) {
    'use strict';

    angular
        .module('tfg.mainMenu', ['chart.js', 'ui.router'])
        .controller('MainMenuCtrl', [
            '$state',
            'UserDataSer',
            'GroupDataSer',
            'GroupDataModel',
            'SectionDataSer',
            'SectionDataModel',
            'QuestionDataSer',
            'QuestionDataModel',
            controller.MainMenuCtrl])
        .controller('EditableChecksCtrl', [controller.EditableChecksCtrl])
        .config(function($stateProvider) {
            $stateProvider
                .state('wrapper.mainMenu', {
                    url: '/mainMenu',
                    abstract: true,
                    views: {
                        '': {
                            templateUrl: 'modules/mainMenu/mainMenu.html',
                            controller: 'MainMenuCtrl',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('wrapper.mainMenu.questionStats', {
                    url: '',
                    views: {
                        '': {
                            templateUrl: 'modules/mainMenu/childViews/questionStats.html'
                        }
                    }
                })
                .state('wrapper.mainMenu.studentStats', {
                    url: '',
                    views: {
                        '': {
                            templateUrl: 'modules/mainMenu/childViews/studentStats.html'
                        }
                    }
                })
                .state('wrapper.mainMenu.newQuestion', {
                    url: '',
                    views: {
                        '': {
                            templateUrl: 'modules/mainMenu/childViews/newQuestion.html'
                        }
                    }
                })
                .state('wrapper.mainMenu.editQuestion', {
                    url: '',
                    views: {
                        '': {
                            templateUrl: 'modules/mainMenu/childViews/editQuestion.html'
                        }
                    }
                });
        });
});