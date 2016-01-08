define([
    'angular',
    './userDataSer',
    './subjectDataSer',
    './groupDataSer',
    './sectionDataSer'
], function(angular) {
    'use strict';

    return angular.module('tfg.services', [
        'tfg.services.userDataSer',
        'tfg.services.subjectDataSer',
        'tfg.services.groupDataSer',
        'tfg.services.sectionDataSer'
    ]);
});