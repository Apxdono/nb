define('app', ['angularAMD', 'angular-route','jquery','xtform','angular-local-storage', './controllers/index', './services/index','./directives/index'], function (angularAMD) {
    var app = angular.module("nova", ['ngRoute','xtForm','LocalStorageModule','nova.services','nova.controllers','nova.directives']);
    var $doc = $(document);
    var $body = $(document.body);
    return app;
});
