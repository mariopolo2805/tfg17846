define(['angular'], function(angular) {
    'use strict';

    function GroupDataSer($http) {

        this.getGroupsData = function() {
            return $http({
                url: '/groups',
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };

        this.getGroupData = function(id) {
            return $http({
                url: '/group/' + id,
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };

        this.getGroupsOfTeacherData = function(id) {
            return $http({
                url: '/groupsOfTeacher/' + id,
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };

        this.getGroupsWithSubjectOfTeacherData = function(id) {
            return $http({
                url: '/groupsWithSubjectOfTeacher/' + id,
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };
    }

    angular
        .module('tfg.services.groupDataSer', [])
        .service('GroupDataSer', ['$http', GroupDataSer]);
});