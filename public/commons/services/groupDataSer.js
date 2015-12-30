define(['angular'], function(angular) {
    'use strict';

    function GroupDataSer($http) {

        this.getGroupsData = function() {
            return $http({
                url: 'http://localhost:9000/groups',
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };

        this.getGroupData = function(id) {
            return $http({
                url: 'http://localhost:9000/group/' + id,
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };

        this.getGroupsOfTeacherData = function(id) {
            return $http({
                url: 'http://localhost:9000/groupsOfTeacher/' + id,
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