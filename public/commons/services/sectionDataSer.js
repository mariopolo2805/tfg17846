define(['angular'], function(angular) {
    'use strict';

    function SectionDataSer($http) {

        this.getSectionsData = function() {
            return $http({
                url: '/sections',
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };

        this.getSectionData = function(id) {
            return $http({
                url: '/section/' + id,
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };

        this.getSectionsOfGroupData = function(id) {
            return $http({
                url: '/sectionsOfGroup/' + id,
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };
    }

    angular
        .module('tfg.services.sectionDataSer', [])
        .service('SectionDataSer', ['$http', SectionDataSer]);
});