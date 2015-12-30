define([
    'angular',
    './userDataModel',
    './subjectDataModel',
    './groupDataModel'
], function(angular) {
    'use strict';

    return angular.module('tfg.models', [
        'tfg.models.userDataModel',
        'tfg.models.subjectDataModel',
        'tfg.models.groupDataModel'
    ]);
});