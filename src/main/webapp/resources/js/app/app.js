define('app', ['angularAMD', 'angular-route','jquery','xtform','angular-local-storage', './controllers/index', './services/index','./directives/index'], function (angularAMD) {
    var app = angular.module("nova", ['ngRoute','xtForm','LocalStorageModule','nova.services','nova.controllers','nova.directives']);
//    app.config(function($logProvider){ $logProvider.debugEnabled(false); $logProvider. });
    var $doc = $(document);
    var $body = $(document.body);

    return app;
});
