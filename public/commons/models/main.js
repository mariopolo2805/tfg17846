define([
    'angular',
    './userDataModel',
    './subjectDataModel'
], function(angular) {
    'use strict';

    return angular.module('tfg.models', [
        'tfg.models.userDataModel',
        'tfg.models.subjectDataModel'
    ]);
});