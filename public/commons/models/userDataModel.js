define(['angular'], function(angular) {
    'use strict';

    function UserDataModel() {

        function UserData(json) {
            if(angular.isDefined(json)) {
                this.id = json.idUser;
                this.name = json.name;
                this.surname = json.surname;
                this.email = json.email ? json.email : null;
                this.password = json.password ? json.password : null;
                this.isTeacher = (json.email && json.email.includes('@uam')) ? true : false;
            } else {
                this.id = null;
                this.name = null;
                this.surname = null;
                this.email = null;
                this.password = null;
                this.isTeacher = null;
            }
        }

        return {
            UserData: UserData
        };
    }

    angular
        .module('tfg.models.userDataModel',[])
        .factory('UserDataModel', UserDataModel);
});