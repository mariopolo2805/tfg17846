define([], function() {
    'use strict';

    function TopbarCtrl($rootScope) {
        var vm = this;
        vm.rootScope = $rootScope;
    }

    return {
        TopbarCtrl: TopbarCtrl
    }
});