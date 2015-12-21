define(['angular'], function(angular) {
    'use strict';

    function SubjectDataModel() {

        function SubjectData(json) {
            if(angular.isDefined(json)) {
                this.id = json.idSubject;
                this.name = json.name;
                this.code = json.code;
                this.grade = json.grade;
                this.period = json.period;
            } else {
                this.id = null;
                this.name = null;
                this.code = null;
                this.grade = null;
                this.period = null;
            }
        }

        return {
            SubjectData: SubjectData
        };
    }

    angular
        .module('tfg.models.subjectDataModel',[])
        .factory('SubjectDataModel', SubjectDataModel);
});