(function(requirejs) {
    'use strict';

    requirejs.config({

        baseUrl: '',

        paths: {
            'angular': ['lib/angular/angular'],
            'angular-chart': ['lib/angular-chart.js/dist/angular-chart'],
            'angular-cookies': ['lib/angular-cookies/angular-cookies'],
            'chart': ['lib/chart.js/Chart'],
            'crypto-js': ['lib/crypto-js/crypto-js'],
            'jquery': ['lib/jquery/dist/jquery'],
            'ui-router': ['lib/angular-ui-router/release/angular-ui-router'],
            'ui-bootstrap': ['lib/angular-bootstrap-npm/dist/angular-bootstrap'],
            'underscore': ['lib/underscore/underscore-min']
        },

        shim: {
            'angular': {
                deps: ['jquery'],
                exports: 'angular'
            },
            'angular-chart': ['angular', 'chart'],
            'angular-cookies': ['angular'],
            'ui-router': ['angular'],
            'ui-bootstrap': ['angular'],
            'underscore': {
                exports: '_'
            }
        }
    });

    requirejs.onError = function(err) {
        console.log(err);
    };

    // Load the app
    require([
        'angular',
        'angular-chart',
        'angular-cookies',
        'ui-router',
        'ui-bootstrap',
        'underscore',
        './app'
    ], function(angular) {
        angular.bootstrap(document, ['app']);
    });

})(requirejs);