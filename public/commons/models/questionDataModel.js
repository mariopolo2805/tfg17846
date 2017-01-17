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
                this.expiration = new Date(json.expiration);
                this.expired = this.expiration < new Date();
                var miliseconds = new Date(json.expiration).getTime() - (new Date()).getTime();
                var minutes = Math.round(miliseconds / 60000);
                this.minutes = minutes > 0 ? minutes : 0;
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
                this.expiration = null;
                this.minutes = null;
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
                expiration: obj.expiration
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