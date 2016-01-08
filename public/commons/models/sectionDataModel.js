define(['angular'], function(angular) {
    'use strict';

    function SectionDataModel() {

        function SectionData(json) {
            if(angular.isDefined(json)) {
                this.id = json.idSection;
                this.name = json.name;
                this.idGroup = json.idGroup;
            } else {
                this.id = null;
                this.name = null;
                this.idGroup = null;
            }
        }

        return {
            SectionData: SectionData
        };
    }

    angular
        .module('tfg.models.sectionDataModel',[])
        .factory('SectionDataModel', SectionDataModel);
});