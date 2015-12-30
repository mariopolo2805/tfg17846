define([
    'angular',
    './userDataSer',
    './subjectDataSer',
    './groupDataSer'
], function(angular) {
    'use strict';

    return angular.module('tfg.services', [
        'tfg.services.userDataSer',
        'tfg.services.subjectDataSer',
        'tfg.services.groupDataSer'
    ]);
});