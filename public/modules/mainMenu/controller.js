define([], function() {
    'use strict';

    function MainMenuCtrl(
        $state,
        UserDataSer,
        GroupDataSer,
        GroupDataModel,
        SectionDataSer,
        SectionDataModel) {

        var vm = this;
        vm.user = null;
        vm.groups = [];
        vm.groupActive = 0;
        vm.sections = [];
        vm.numChecked = 0;
        vm.isAnyChecked = false;
        vm.tabActive = 0;

        /* User */
        vm.user = UserDataSer.getUserCookie();
        console.log("Login with ", vm.user);
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
        };

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
        };

        vm.uncheckAll = function() {
            _.each(vm.sections, function(item) {
                item.check = false;
            });
        };

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
        };
        /* Section */

        /* Questions stats */
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