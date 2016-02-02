define([], function() {
    'use strict';

    function MainMenuCtrl(
        $scope,
        $state,
        UserDataSer,
        GroupDataSer,
        GroupDataModel,
        SectionDataSer,
        SectionDataModel,
        QuestionDataSer,
        QuestionDataModel,
        AnswerDataModel,
        AnswerDataSer) {

        var vm = this;
        vm.user = null;
        vm.groups = [];
        vm.groupActive = 0;
        vm.sections = [];
        vm.numChecked = 0;
        vm.isAnyChecked = false;
        vm.tabActive = 0;
        vm.questions = [];
        vm.questionSelected = null;
        vm.answers = [];

        /* User */
        vm.user = UserDataSer.getUserCookie();
        /* User */

        /* Group with subject of teacher */
        GroupDataSer.getGroupsWithSubjectOfTeacherData(vm.user.id).then(function(subjects) {
            vm.groups = _.map(subjects, function(groupWithSubject) {
                return new GroupDataModel.GroupData(groupWithSubject);
            });
            getSections();
        });

        vm.groupSelected = function(index) {
            vm.groupActive = index;
            getSections();
        }
        /* Group with subject of teacher */

        /* Section */
        function getSections() {
            vm.questions = [];
            SectionDataSer.getSectionsOfGroupData(vm.groups[vm.groupActive].id).then(function(sections) {
                vm.sections = _.map(sections, function(section) {
                    var s = new SectionDataModel.SectionData(section);
                    s.check = false;
                    return s;
                });
            });
        }

        function getCheckList() {
            return _.filter(vm.sections, function(item) {
                return item.check;
            });
        }

        vm.allChecked = function() {
            if(vm.sections.length === 0) {
                return;
            }
            vm.changeList(vm.sections);
            return _.reduce(vm.sections, function(check, item) {
                return item.check && check;
            }, true);
        }

        vm.checkAll = function() {
            var checkAll = true;

            if(vm.sections.length === 0) {
                return;
            }
            if(vm.allChecked(vm.sections)) {
                checkAll = false;
            }

            _.each(vm.sections, function(item) {
                item.check = checkAll;
            });
            vm.isAnyChecked = checkAll;
            vm.getQuestions();
        }

        vm.uncheckAll = function() {
            _.each(vm.sections, function(item) {
                item.check = false;
            });
            vm.getQuestions();
        }

        vm.changeList = function() {
            vm.numChecked = 0;
            _.each(vm.sections, function(item, index) {
                if(item.check) {
                    vm.numChecked++;
                    vm.isAnyChecked = true;
                }
            });
            if(vm.numChecked === 0) {
                vm.isAnyChecked = false;
            }
        }
        /* Section */

        /* Questions stats */
        vm.getQuestions = function() {
            vm.questions = [];
            var checkList = getCheckList();
            _.each(checkList, function(item, index) {
                getQuestionsOfSection(item.id);
            });
        }

        function getQuestionsOfSection(id) {
            QuestionDataSer.getQuestionsOfSectionData(id).then(function(questions) {
                var questionList = _.map(questions, function(question, index) {
                    var q = new QuestionDataModel.QuestionData(question);
                    q.name = q.name.substr(0, 2) + (index + 1) + q.name.substr(2);
                    return q;
                });
                vm.questions = Array.prototype.concat(vm.questions, questionList);
                vm.questionSelected = vm.questions[vm.questions.length - 1];
            });
        };

        $scope.$watch(
            "vm.questionSelected",
            function handleFooChange(newValue, oldValue) {
                if(vm.questionSelected) {
                    getAnswers();
                }
            }
        );

        function getAnswers() {
            AnswerDataSer.getAnswersOfQuestionData(vm.questionSelected.id).then(function(answers) {
                vm.answers = _.map(answers, function(answer) {
                    return new AnswerDataModel.AnswerData(answer);
                });
                calculateRates();
            });
        }

        vm.colors = ['#44C767', '#F72F2F', '#F89B3A'];

        function calculateRates() {
            vm.rates = [0, 0, 0];
            _.each(vm.answers, function(answer) {
                if(answer.selection === null) {
                    vm.rates[2]++;
                }
                else if(answer.selection === vm.questionSelected.solution) {
                    vm.rates[0]++;
                } else {
                    vm.rates[1]++;
                }
            });
            vm.sum = vm.rates[0] + vm.rates[1] + vm.rates[2];
            vm.percentRight = Math.round((vm.rates[0] * 100 / vm.sum) * 100) / 100;
            vm.percentWrong = Math.round((vm.rates[1] * 100 / vm.sum) * 100) / 100;
            vm.percentNoAnswer = Math.round((vm.rates[2] * 100 / vm.sum) * 100) / 100;
            vm.labels = [vm.percentRight + '%', vm.percentWrong + '%', vm.percentNoAnswer + '%'];

        }
        /* Questions stats */

        /* Student stats */
        /* Student stats */

        /* New question */
        /* New question */

        /* Edit question */
        /* Edit question */
    }

    return {
        MainMenuCtrl: MainMenuCtrl
    }
});