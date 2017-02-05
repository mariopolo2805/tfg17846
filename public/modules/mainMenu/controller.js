define([], function() {
    'use strict';

    function MainMenuCtrl(
        $rootScope,
        $timeout,
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
        $rootScope.user = vm.user;
        /* User */

        /* Close sesion */
        vm.closeSesion = function() {
            delete vm.user;
            delete $rootScope.user;
            UserDataSer.deleteUserCookie();
        }
        /* Close sesion */
        if(!vm.user) { return null; }

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
                item.index = item.name[5];
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

            switch(vm.tabActive) {
                case 0:
                case 3:
                    getQuestions();
                    vm.onlyOneSection = false;
                    break;
                case 1:
                    getStudents();
                    vm.onlyOneSection = false;
                    break;
                case 2:
                    vm.onlyOneSection = true;
                    break;
            }

            $timeout(function() {
                $rootScope.$apply();
            }, 0);
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
            vm.questionSelected = null;
            vm.questions = [];
            vm.studentAnswers = [];
            var checkList = getCheckList();
            _.each(checkList, function(item, index) {
                if(vm.tabActive !== 2 || vm.tabActive === 1 || vm.tabActive === 3) {
                    return getQuestionsOfSection(item.id, item.index);
                }
                if(vm.tabActive === 1 && vm.studentSelected) {
                    return getAnswersOfStudentInSection(item.id);
                }
            });
            if(vm.tabActive === 2 && checkList.length > 0) {
                return vm.newQuestion.idSection = checkList[0].id;
            }
        }

        function getQuestionsOfSection(id, sectionIndex) {
            QuestionDataSer.getQuestionsOfSectionData(id).then(function(questions) {
                var questionList = _.map(questions, function(question, index) {
                    var q = new QuestionDataModel.QuestionData(question);
                    q.title = sectionIndex + '.' + (index + 1) + ' - ' + q.text;
                    return q;
                });
                vm.questions = Array.prototype.concat(vm.questions, questionList);
                vm.questionSelected = vm.questions[vm.questions.length - 1];
                if(vm.tabActive === 1) {
                    getAnswersOfStudentInSection(id);
                }
            });
        };

        function getAnswersOfStudentInSection(id) {
            AnswerDataSer.getAnswersOfStudentInSectionData(vm.studentSelected.id, id).then(function(items) {
                vm.studentAnswers = _.map(items, function(item, index) {
                    var a = new AnswerDataModel.AnswerData(item);
                    a.solution = item.solution;
                    var found = _.find(vm.questions, function(q) {
                        return q.id === a.idQuestion;
                    });
                    if(found) {
                        found.selection = a.selection;
                        found.selection = a.selection;
                    }
                    return a;
                });
                if(vm.studentAnswers.length !== vm.questions.length) {
                    _.each(vm.questions, function(item) {
                        var found = _.find(vm.studentAnswers, function(a) {
                            return a.idQuestion === item.id;
                        });
                        if(!found && item.expired) {
                            var a = new AnswerDataModel.AnswerData();
                            vm.studentAnswers.push(a);
                        }
                    });
                }
                calculateStudentRates();
            });
        };

        $scope.$watch(
            "vm.questionSelected",
            function handleQuestionSelectedChange(newValue, oldValue) {
                if(vm.questionSelected && vm.tabActive !== 1) {
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
            getStudents();
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
            UserDataSer.getStudentsOfGroupData(vm.groups[vm.groupActive].id).then(function(students) {
                vm.students = _.map(students, function(student, index) {
                    var s = new UserDataModel.UserData(student);
                    s.title = (index + 1) + ' - ' + s.surname + ', ' + s.name;
                    return s;
                });
                vm.studentSelected = vm.students[vm.students.length - 1];
                /* In case of expirated question, search all students didn't answer */
                if (vm.questionSelected && vm.questionSelected.expired) {
                    var answer = new AnswerDataModel.AnswerData(answer);
                    for (var i = vm.answers.length; i < vm.students.length; i++) {
                        vm.answers.push(answer);
                    }
                    calculateQuestionRates();
                }
            });
        }

        $scope.$watch(
            "vm.studentSelected",
            function handleStudentSelectedChange(newValue, oldValue) {
                if(vm.studentSelected && vm.tabActive === 1) {
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
        vm.newQuestion = new QuestionDataModel.QuestionData();
        delete vm.newQuestion.id;
        vm.newQuestion.solution = vm.options[0];

        vm.sendQuestion = function(question) {
            if(angular.isDefined(question)) {
                vm.newQuestion = question;
            }
            if(vm.newQuestion.idSection === null) {
                alert("Valide haber seleccionado el tema (en el panel izquierdo) al que asignarle la pregunta");
            } else {
                if(vm.newQuestion.expiration === null) {
                    var today = new Date();
                    today.setMinutes(today.getMinutes() + vm.newQuestion.minutes);
                    today.setHours(today.getHours() + 1);
                    vm.newQuestion.expiration = today;
                } else {
                    var date = new Date(vm.newQuestion.expiration);
                    date.setMinutes(date.getMinutes() + vm.newQuestion.minutes);
                    date.setHours(date.getHours() + 1);
                    vm.newQuestion.expiration = date;
                }
                vm.newQuestion.expiration = vm.newQuestion.expiration.toISOString();
                vm.newQuestion.expiration = vm.newQuestion.expiration.substring(0, vm.newQuestion.expiration.length - 5);
                var exchangeModel = QuestionDataModel.getExchangeModel(vm.newQuestion);
                QuestionDataSer.createQuestion(exchangeModel).then(function(result) {
                    if(result === 200) {
                        alert("Pregunta creada con éxito");
                    }
                });
            }
        }
        /* New question */

        /* Edit question */
        vm.submitQuestion = function() {
            switch (vm.submitType) {
                case 'edit':
                    return editQuestion();
                case 'duplicate':
                    return duplicateQuestion();
                case 'remove':
                    return removeQuestion();
            }
        }

        function editQuestion() {
            var exchangeModel = QuestionDataModel.getEditExchangeModel(vm.questionSelected);
            QuestionDataSer.editQuestion(exchangeModel).then(function(result) {
                if(result === 200) {
                    alert("Pregunta editada con éxito");
                }
            });
        }
        function duplicateQuestion() {
            vm.sendQuestion(vm.questionSelected);
        }
        function removeQuestion() {
            QuestionDataSer.removeQuestion(vm.questionSelected.id).then(function(result) {
                if(result === 200) {
                    alert("Pregunta eliminada con éxito");
                }
            });
        }
        /* Edit question */
    }

    return {
        MainMenuCtrl: MainMenuCtrl
    }
});