define([], function() {
    'use strict';

    function MainMenuCtrl() {
        var vm = this;

        vm.name = "mainMenu";
        vm.subjects = [
            "SI1 - G301",
            "SI1 - G302",
            "PSI - G361",
            "PSI - G362"
        ];

        vm.units = [
            "Tema 1",
            "Tema 2",
            "Tema 3"
        ];

        vm.subject = function(name) {
            console.log(name);
        };

    }

    return {
        MainMenuCtrl: MainMenuCtrl
    }
});