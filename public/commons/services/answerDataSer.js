define(['angular'], function(angular) {
    'use strict';

    function AnswerDataSer($http) {

        this.getAnswersData = function() {
            return $http({
                url: 'http://localhost:9000/answers',
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };

        this.getAnswerData = function(id) {
            return $http({
                url: 'http://localhost:9000/answer/' + id,
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };

        this.getAnswersOfQuestionData = function(id) {
            return $http({
                url: 'http://localhost:9000/answersOfQuestion/' + id,
                method: 'POST'
            }).then(function(result) {
                return result.data;
            });
        };

        this.getAnswersOfStudentData = function(id) {
            return $http({
                url: 'http://localhost:9000/answersOfStudent/' + id,
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