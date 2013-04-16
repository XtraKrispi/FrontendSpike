requirejs.config({
    paths: {
        'underscore': '../../Scripts/common/vendor/underscore',
        'backbone': 'vendor/backbone',
        'jquery': '../../Scripts/common/vendor/jquery-1.9.1',
        'bootstrap': '../../Scripts/common/vendor/bootstrap',
        'sugar': '../../Scripts/common/vendor/sugar-1.3.9.min'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'bootstrap': {
            deps: ['jquery'],
            exports: 'bootstrap'
        },
        'sugar': {
            exports: 'sugar'
        }
    }
});

require(['jquery', 'bootstrap', 'backbone', 'sugar', 'AppRouter'], function ($, bootstrap, Backbone, sugar, AppRouter) {
    var app = new AppRouter();
    Backbone.history.start();
});

