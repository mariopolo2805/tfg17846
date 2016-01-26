define(['angular'], function(angular) {
    'use strict';

    function QuestionDataModel() {

        function QuestionData(json) {
            if(angular.isDefined(json)) {
                this.id = json.idQuestion;
                this.idSection = json.idSection;
                this.text = json.text;
                this.name = json.idQuestion + ' - ' + json.text;
                this.difficulty = json.difficulty;
                this.answer1 = json.answer1;
                this.answer2 = json.answer2;
                this.answer3 = json.answer3;
                this.answer4 = json.answer4;
                this.solution = json.solution;
            } else {
                this.id = null;
                this.idSection = null;
                this.text = null;
                this.name = '? - NoData';
                this.difficulty = null;
                this.answer1 = null;
                this.answer2 = null;
                this.answer3 = null;
                this.answer4 = null;
                this.solution = null;
            }
        }

        return {
            QuestionData: QuestionData
        };
    }

    angular
        .module('tfg.models.questionDataModel',[])
        .factory('QuestionDataModel', QuestionDataModel);
});