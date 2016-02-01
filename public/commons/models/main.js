define([
    'angular',
    './userDataModel',
    './subjectDataModel',
    './groupDataModel',
    './sectionDataModel',
    './questionDataModel',
    './answerDataModel'
], function(angular) {
    'use strict';

    return angular.module('tfg.models', [
        'tfg.models.userDataModel',
        'tfg.models.subjectDataModel',
        'tfg.models.groupDataModel',
        'tfg.models.sectionDataModel',
        'tfg.models.questionDataModel',
        'tfg.models.answerDataModel'
    ]);
});