define('app', ['angular', 'angular-route','xtform','angular-local-storage', './controllers/index', './services/index','./directives/index'], function (angular) {
    var app = angular.module("nova", ['ngRoute','xtForm','LocalStorageModule','nova.services','nova.controllers','nova.directives']);
    return app;
});
