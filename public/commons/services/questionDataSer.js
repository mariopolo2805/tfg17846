define(['angular'], function(angular) {
    'use strict';

    function QuestionDataSer($http) {

        this.getQuestionsData = function() {
            return $http({
                url: '/questions',
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };

        this.getQuestionData = function(id) {
            return $http({
                url: '/question/' + id,
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };

        this.getQuestionsOfSectionData = function(id) {
            return $http({
                url: '/questionsOfSection/' + id,
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };

        this.createQuestion = function(newQuestion) {
            return $http({
                url: '/newQuestion',
                method: 'POST',
                data: newQuestion
            }).then(function(result) {
                return result.status;
            });
        };

        this.editQuestion = function(question) {
            return $http({
                url: '/editQuestion',
                method: 'POST',
                data: question
            }).then(function(result) {
                return result.status;
            });
        };

        this.removeQuestion = function(id) {
            return $http({
                url: '/removeQuestion/' + id,
                method: 'POST'
            }).then(function(result) {
                return result.status;
            });
        };

    }

    angular
        .module('tfg.services.questionDataSer', [])
        .service('QuestionDataSer', ['$http', QuestionDataSer]);
});