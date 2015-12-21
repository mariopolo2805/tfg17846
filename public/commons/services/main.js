define([
    'angular',
    './userDataSer',
    './subjectDataSer'
], function(angular) {
    'use strict';

    return angular.module('tfg.services', [
        'tfg.services.userDataSer',
        'tfg.services.subjectDataSer'
    ]);
});