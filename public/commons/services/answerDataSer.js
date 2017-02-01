define(['angular'], function(angular) {
    'use strict';

    function AnswerDataSer($http) {

        this.getAnswersData = function() {
            return $http({
                url: '/answers',
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };

        this.getAnswerData = function(id) {
            return $http({
                url: '/answer/' + id,
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };

        this.getAnswersOfQuestionData = function(id) {
            return $http({
                url: '/answersOfQuestion/' + id,
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };

        this.getAnswersOfStudentInSectionData = function(id, idSection) {
            return $http({
                url: '/answersOfStudent/' + id + '/section/' + idSection,
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };

        this.getUnansweredQuestionsOfStudentInSectionData = function(id, idSection) {
            return $http({
                url: '/unansweredQuestionsOfStudent/' + id + '/section/' + idSection,
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };

    }

    angular
        .module('tfg.services.answerDataSer', [])
        .service('AnswerDataSer', ['$http', AnswerDataSer]);
});