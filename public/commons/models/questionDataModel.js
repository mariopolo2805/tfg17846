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
                this.activation = new Date(json.activation);
                this.expired = this.expiration < new Date();
                this.dateActivation = {
                    maxDay: 1,
                    day: this.activation.getDate(),
                    month: this.activation.getMonth() + 1,
                    year: this.activation.getFullYear(),
                    hour: this.activation.getHours(),
                    minutes: this.activation.getMinutes()
                };
                this.dateExpiration = {
                    maxDay: 1,
                    day: this.expiration.getDate(),
                    month: this.expiration.getMonth() + 1,
                    year: this.expiration.getFullYear(),
                    hour: this.expiration.getHours(),
                    minutes: this.expiration.getMinutes()
                };
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
                var today = new Date();
                this.dateActivation = {
                    maxDay: 1,
                    day: today.getDate(),
                    month: today.getMonth() + 1,
                    year: today.getFullYear(),
                    hour: today.getHours(),
                    minutes: today.getMinutes()
                };
                this.dateExpiration = {
                    maxDay: 1,
                    day: today.getDate(),
                    month: today.getMonth() + 1,
                    year: today.getFullYear(),
                    hour: today.getHours(),
                    minutes: today.getMinutes()
                };
            }

            function initMaxDate(dateModel) {
                switch(dateModel.month) {
                    case 2:
                        if((dateModel.year % 4 == 0) &&
                            ((dateModel.year % 100 != 0) || (dateModel.year % 400 == 0))) {
                            return 29;
                        } else {
                            return 28;
                        }
                        break;
                    case 4:
                    case 6:
                    case 9:
                    case 11:
                        return 30;
                        break;
                    default:
                        return 31;
                }
            }
            this.dateActivation.maxDay = initMaxDate(this.dateActivation);
            this.dateExpiration.maxDay = initMaxDate(this.dateExpiration);
        }

        function getExchangeModel(obj) {
            obj.expiration = new Date(obj.dateExpiration.year, obj.dateExpiration.month - 1 , obj.dateExpiration.day, obj.dateExpiration.hour, obj.dateExpiration.minutes, 0);
            obj.expiration.setMinutes(obj.expiration.getMinutes() - obj.expiration.getTimezoneOffset());
            obj.expiration = obj.expiration.toISOString();
            obj.expiration = obj.expiration.substring(0, obj.expiration.length - 5);
            obj.activation = new Date(obj.dateActivation.year, obj.dateActivation.month - 1, obj.dateActivation.day, obj.dateActivation.hour, obj.dateActivation.minutes, 0);
            obj.activation.setMinutes(obj.activation.getMinutes() - obj.activation.getTimezoneOffset());
            obj.activation = obj.activation.toISOString();
            obj.activation = obj.activation.substring(0, obj.activation.length - 5);
            if(obj.expiration <= obj.activation) {
                return "errValidDates";
            }
            var json = {
                idQuestion: obj.id,
                idSection: obj.idSection,
                text: obj.text,
                difficulty: obj.difficulty,
                answerA: obj.answerA,
                answerB: obj.answerB,
                answerC: obj.answerC,
                answerD: obj.answerD,
                solution: obj.solution,
                expiration: obj.expiration,
                activation: obj.activation
            };
            return json;
        }

        function setMaxDate(dateModel) {
            switch(dateModel.month) {
                case 2:
                    if((dateModel.year % 4 == 0) &&
                        ((dateModel.year % 100 != 0) || (dateModel.year % 400 == 0))) {
                        return 29;
                    } else {
                        return 28;
                    }
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    return 30;
                    break;
                default:
                    return 31;
            }
        }

        return {
            QuestionData: QuestionData,
            getExchangeModel: getExchangeModel,
            setMaxDate: setMaxDate
        };
    }

    angular
        .module('tfg.models.questionDataModel',[])
        .factory('QuestionDataModel', QuestionDataModel);
});