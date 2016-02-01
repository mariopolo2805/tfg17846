define([
    'angular',
    './userDataSer',
    './subjectDataSer',
    './groupDataSer',
    './sectionDataSer',
    './questionDataSer',
    './answerDataSer'
], function(angular) {
    'use strict';

    return angular.module('tfg.services', [
        'tfg.services.userDataSer',
        'tfg.services.subjectDataSer',
        'tfg.services.groupDataSer',
        'tfg.services.sectionDataSer',
        'tfg.services.questionDataSer',
        'tfg.services.answerDataSer'
    ]);
});