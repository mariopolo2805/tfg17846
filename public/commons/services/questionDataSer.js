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

    }

    angular
        .module('tfg.services.questionDataSer', [])
        .service('QuestionDataSer', ['$http', QuestionDataSer]);
});