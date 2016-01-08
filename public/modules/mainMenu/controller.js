define([], function() {
    'use strict';

    function MainMenuCtrl(
        $state,
        UserDataSer,
        GroupDataSer,
        GroupDataModel) {

        var vm = this;
        vm.user = null;
        vm.groups = [];
        vm.name = "mainMenu";

        /* User */
        vm.user = UserDataSer.getUserCookie();
        console.log("Login with ", vm.user);

        /* Group with subject of teacher */
        GroupDataSer.getGroupsWithSubjectOfTeacherData(vm.user.id).then(function(subjects) {
            vm.groups = _.map(subjects, function(groupWithSubject) {
                return new GroupDataModel.GroupData(groupWithSubject);
            });
            console.log(vm.groups);
        });

        vm.groupSelected = function(id) {
            console.log(id);
        }
    }

    function EditableChecksCtrl() {
        var vm = this;
        vm.numChecked = 0;
        vm.isAnyChecked = false;

        vm.units = [
            "Tema 1",
            "Tema 2",
            "Tema 3"
        ];

        vm.checkItemsList = toCheckList(vm.units);
        function toCheckList(list) {
            return _.map(list, function(obj) {
                var item = {
                    id: obj.id,
                    check: false
                };
                return item;
            });
        }

        function getCheckList(list) {
            return _.filter(list, function(item) {
                return item.check;
            });
        }

        vm.allChecked = function(list) {
            if(list.length === 0) {
                return;
            }
            vm.changeList(list);
            return _.reduce(list, function(check, item) {
                return item.check && check;
            }, true);
        };

        vm.checkAll = function(list) {
            var checkAll = true;

            if(list.length === 0) {
                return;
            }
            if(vm.allChecked(list)) {
                checkAll = false;
            }

            _.each(list, function(item) {
                item.check = checkAll;
            });
            vm.isAnyChecked = checkAll;
        };

        vm.uncheckAll = function(list) {
            _.each(list, function(item) {
                item.check = false;
            });
        };

        vm.changeList = function(list) {
            vm.numChecked = 0;
            _.each(list, function(item, index) {
                if(item.check) {
                    vm.numChecked++;
                    vm.isAnyChecked = true;
                }
            });
            if(vm.numChecked === 0) {
                vm.isAnyChecked = false;
            }
        };
    }

    return {
        MainMenuCtrl: MainMenuCtrl,
        EditableChecksCtrl: EditableChecksCtrl
    }
});