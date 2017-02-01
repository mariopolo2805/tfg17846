define(['angular'], function(angular) {
    'use strict';

    function SubjectDataSer($http) {

        this.getSubjectsData = function() {
            return $http({
                url: '/subjects',
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };

        this.getSubjectData = function(id) {
            return $http({
                url: '/subject/' + id,
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };
    }

    angular
        .module('tfg.services.subjectDataSer', [])
        .service('SubjectDataSer', ['$http', SubjectDataSer]);
});