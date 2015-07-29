(function (requirejs){
    'use strict';

    // -- RequireJS config
    requirejs.config({

        baseUrl: '',

        paths: {
            'jquery': ['lib/jquery/dist/jquery'],
            'angular': ['lib/angular/angular'],
            'ui-router': ['lib/angular-ui-router/release/angular-ui-router'],
            'ui-bootstrap': ['lib/angular-bootstrap-npm/dist/angular-bootstrap']
        },

        shim: {
            'angular': {
                deps: ['jquery'],
                exports: 'angular'
            },
            'ui-router': ['angular'],
            'bootstrap': ['jquery'],
            'ui-bootstrap': ['angular']
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
        './app'
    ], function(angular){
            angular.bootstrap(document, ['app']);
        }
    );
})(requirejs);