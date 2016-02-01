define(['angular'], function(angular) {
    'use strict';

    function AnswerDataModel() {

        function AnswerData(json) {
            if(angular.isDefined(json)) {
                this.id = json.idAnswer;
                this.idStudent = json.idStudent;
                this.idQuestion = json.idQuestion;
                this.selection = json.selection;
            } else {
                this.id = null;
                this.idStudent = null;
                this.idQuestion = null;
                this.selection = null;
            }
        }

        return {
            AnswerData: AnswerData
        };
    }

    angular
        .module('tfg.models.answerDataModel',[])
        .factory('AnswerDataModel', AnswerDataModel);
});