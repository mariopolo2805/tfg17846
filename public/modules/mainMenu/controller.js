define([], function() {
    'use strict';

    function MainMenuCtrl(
        $scope,
        $state,
        UserDataSer,
        UserDataModel,
        GroupDataSer,
        GroupDataModel,
        SectionDataSer,
        SectionDataModel,
        QuestionDataSer,
        QuestionDataModel,
        AnswerDataSer,
        AnswerDataModel) {

        var vm = this;
        vm.user = null;
        vm.groups = [];
        vm.groupActive = 0;
        vm.onlyOneSection = false;
        vm.sections = [];
        vm.numChecked = 0;
        vm.isAnyChecked = false;
        vm.tabActive = 0;
        vm.colors = ['#44C767', '#F72F2F', '#F89B3A'];
        vm.questions = [];
        vm.questionSelected = null;
        vm.answers = [];
        vm.students = [];
        vm.studentSelected = null;

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

        vm.clickCheck = function() {
            getQuestions();
            vm.changeList();
        }

        vm.allChecked = function() {
            if(vm.sections.length === 0 || vm.onlyOneSection) {
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

            getQuestions();
        }

        vm.uncheckAll = function() {
            _.each(vm.sections, function(item) {
                item.check = false;
            });

            if(vm.tabActive === 0) {
                getQuestions();
                vm.onlyOneSection = false;
            } else if(vm.tabActive === 1) {
                getStudents();
                vm.onlyOneSection = false;
            } else if(vm.tabActive === 2) {
                vm.onlyOneSection = true;
            } else if(vm.tabActive === 3) {
                vm.onlyOneSection = true;
            }
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
        function getQuestions() {
            vm.questions = [];
            vm.studentAnswers = [];
            var checkList = getCheckList();
            _.each(checkList, function(item, index) {
                if(vm.tabActive === 0) {
                    getQuestionsOfSection(item.id);
                }
                if(vm.tabActive === 1 && vm.studentSelected) {
                    getAnswersOfStudentInSection(item.id);
                }
            });
        }

        function getQuestionsOfSection(id) {
            QuestionDataSer.getQuestionsOfSectionData(id).then(function(questions) {
                var questionList = _.map(questions, function(question, index) {
                    var q = new QuestionDataModel.QuestionData(question);
                    q.title = q.idSection + '.' + (index + 1) + ' - ' + q.text;
                    return q;
                });
                vm.questions = Array.prototype.concat(vm.questions, questionList);
                vm.questionSelected = vm.questions[vm.questions.length - 1];
            });
        };

        function getAnswersOfStudentInSection(id) {
            AnswerDataSer.getAnswersOfStudentInSectionData(vm.studentSelected.id, id).then(function(items) {
                var answerList = _.map(items, function(item, index) {
                    var q = new QuestionDataModel.QuestionData(item);
                    q.title = q.idSection + '.' + (index + 1) + ' - ' + q.text;
                    q.selection = item.selection;
                    vm.questions.push(q);
                    var a = new AnswerDataModel.AnswerData(item);
                    a.solution = item.solution;
                    return a;
                });
                vm.questionSelected = vm.questions[vm.questions.length - 1];
                vm.studentAnswers = Array.prototype.concat(vm.studentAnswers, answerList);
                calculateStudentRates();
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
                if(vm.tabActive === 0) {
                    calculateQuestionRates();
                }
            });
        }

        function calculateQuestionRates() {
            vm.rates = [0, 0, 0];
            _.each(vm.answers, function(answer) {
                if(answer.selection === null) {
                    vm.rates[2]++;
                } else if(answer.selection === vm.questionSelected.solution) {
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
        function getStudents() {
            vm.students = [];
            UserDataSer.getStudentsOfSubjectData(vm.groups[vm.groupActive].idSubject).then(function(students) {
                vm.students = _.map(students, function(student, index) {
                    var s = new UserDataModel.UserData(student);
                    s.title = (index + 1) + ' - ' + s.surname + ', ' + s.name;
                    return s;
                });
                vm.studentSelected = vm.students[vm.students.length - 1];
            });
        }

        $scope.$watch(
            "vm.studentSelected",
            function handleFooChange(newValue, oldValue) {
                if(vm.studentSelected) {
                    getQuestions();
                }
            }
        );

        function calculateStudentRates() {
            vm.rates = [0, 0, 0];
            _.each(vm.studentAnswers, function(answer) {
                if(answer.selection === null) {
                    vm.rates[2]++;
                } else if(answer.selection === answer.solution) {
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
        /* Student stats */

        /* New question */
        vm.options = ['A', 'B', 'C', 'D'];
        /* New question */

        /* Edit question */
        /* Edit question */
    }

    return {
        MainMenuCtrl: MainMenuCtrl
    }
});