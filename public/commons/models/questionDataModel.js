define(['angular'], function(angular) {
    'use strict';

    function QuestionDataModel() {

        function QuestionData(json) {
            if(angular.isDefined(json)) {
                this.id = json.idQuestion;
                this.idSection = json.idSection;
                this.text = json.text;
                this.name = json.idSection + '. - ' + json.text;
                this.difficulty = json.difficulty;
                this.answerA = json.answerA;
                this.answerB = json.answerB;
                this.answerC = json.answerC;
                this.answerD = json.answerD;
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