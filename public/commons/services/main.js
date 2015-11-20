define([
    'angular',
    './userDataSer'
], function(angular) {
    'use strict';

    return angular.module('tfg.services', [
        'tfg.services.userDataSer'
    ]);
});