define(['angular'], function(angular) {
    'use strict';

    function GroupDataModel(SubjectDataModel) {

        function GroupData(json) {
            if(angular.isDefined(json)) {
                this.id = json.idGroup;
                this.group = json.group;
                this.idSubject = json.idSubject;
                this.subject = (json.code) ? new SubjectDataModel.SubjectData(json) : null;
                this.idTeacher = json.idTeacher;
            } else {
                this.id = null;
                this.group = null;
                this.idSubject = null;
                this.subject = null;
                this.idTeacher = null;
            }
        }

        return {
            GroupData: GroupData
        };
    }

    angular
        .module('tfg.models.groupDataModel',[])
        .factory('GroupDataModel', ['SubjectDataModel', GroupDataModel]);
});