define(['angular'], function(angular) {
    'use strict';

    function QuestionDataSer($http) {

        this.getQuestionsData = function() {
            return $http({
                url: 'http://localhost:9000/questions',
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };

        this.getQuestionData = function(id) {
            return $http({
                url: 'http://localhost:9000/question/' + id,
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };

        this.getQuestionsOfSectionData = function(id) {
            return $http({
                url: 'http://localhost:9000/questionsOfSection/' + id,
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };

        this.createQuestion = function(newQuestion) {
            return $http({
                url: 'http://localhost:9000/newQuestion',
                method: 'POST',
                data: newQuestion
            }).then(function(result) {
                return result.status;
            });
        };

        this.editQuestion = function(question) {
            return $http({
                url: 'http://localhost:9000/editQuestion',
                method: 'POST',
                data: question
            }).then(function(result) {
                return result.status;
            });
        };

    }

    angular
        .module('tfg.services.questionDataSer', [])
        .service('QuestionDataSer', ['$http', QuestionDataSer]);
});