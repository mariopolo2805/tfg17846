(function(requirejs) {
    'use strict';

    requirejs.config({

        baseUrl: '',

        paths: {
            'jquery': ['lib/jquery/dist/jquery'],
            'angular': ['lib/angular/angular'],
            'ui-router': ['lib/angular-ui-router/release/angular-ui-router'],
            'ui-bootstrap': ['lib/angular-bootstrap-npm/dist/angular-bootstrap'],
            'crypto-js': ['lib/crypto-js/crypto-js'],
            'underscore': ['lib/underscore/underscore-min']
        },

        shim: {
            'angular': {
                deps: ['jquery'],
                exports: 'angular'
            },
            'ui-router': ['angular'],
            'bootstrap': ['jquery'],
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
        'ui-router',
        'ui-bootstrap',
        'underscore',
        './app'
    ], function(angular) {
        angular.bootstrap(document, ['app']);
    });

})(requirejs);