define([
    'angular',
    '../constants',
    'ui-grid',
    '../services/login-service'
], function (angular) {
    var controllers = angular.module('nova.controllers',['http-auth-interceptor', 'LocalStorageModule','ui.grid', 'xtForm','nova.constants','nova.services']);

    controllers.config(function($controllerProvider,$compileProvider, $filterProvider, $provide){
        controllers.register =
        {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        };
    });

    return controllers;
});