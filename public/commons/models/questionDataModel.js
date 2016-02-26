define(['angular'], function(angular) {
    'use strict';

    function QuestionDataModel() {

        function QuestionData(json) {
            if(angular.isDefined(json)) {
                this.id = json.idQuestion;
                this.idSection = json.idSection;
                this.text = json.text;
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
                this.difficulty = null;
                this.answerA = null;
                this.answerB = null;
                this.answerC = null;
                this.answerD = null;
                this.solution = null;
            }
        }

        function getExchangeModel(obj) {
            var json = {
                idSection: obj.idSection,
                text: obj.text,
                difficulty: obj.difficulty,
                answerA: obj.answerA,
                answerB: obj.answerB,
                answerC: obj.answerC,
                answerD: obj.answerD,
                solution: obj.solution,
                expired: obj.expired
            };
            return json;
        }

        return {
            QuestionData: QuestionData,
            getExchangeModel: getExchangeModel
        };
    }

    angular
        .module('tfg.models.questionDataModel',[])
        .factory('QuestionDataModel', QuestionDataModel);
});