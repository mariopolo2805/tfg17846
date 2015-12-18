(function(requirejs) {
    'use strict';

    requirejs.config({

        baseUrl: '',

        paths: {
            'angular': ['lib/angular/angular'],
            'angular-cookies': ['lib/angular-cookies/angular-cookies'],
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
        'angular-cookies',
        'ui-router',
        'ui-bootstrap',
        'underscore',
        './app'
    ], function(angular) {
        angular.bootstrap(document, ['app']);
    });

})(requirejs);