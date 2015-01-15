define([
    'jquery',
    'angularAMD',
    'angular',
    'angular-auth',
    'angular-route',
    'angular-local-storage',
    'xtform',
    './constants',
    './services/service-module',
    './directives/directive-module',
    './controllers/controller-module',
    './controllers/main-ctrl'
    ], function (jQuery, angularAMD, angular) {

    var app = angular.module('nova', ['ngRoute', 'http-auth-interceptor', 'LocalStorageModule', 'xtForm','nova.constants','nova.services','nova.directives','nova.controllers']);

    app.config(function ($routeProvider, $logProvider, $parseProvider, localStorageServiceProvider, xtFormErrorsProvider, Entity) {
        xtFormErrorsProvider.setErrors({
            minlength: 'Длинна должна быть не меньше {{minlength}}',
            maxlength: 'Длинна должна быть не больше {{maxlength}}',
            required: 'Укажите значение',
            number: 'Значение должно быть числом',
            min: 'Значение должно быть не меньше {{min}}',
            max: 'Значение должно быть не больше {{max}}',
            email: 'Неверный email',
            pattern: 'Неверное значение'
        });


        $logProvider.debugEnabled(true);

        localStorageServiceProvider.setPrefix('novaStorage');
//        localStorageServiceProvider.setStorageCookieDomain('example.com');
//        localStorageServiceProvider.setStorageType('sessionStorage');



//        angularAMD.route({
//            templateUrl: 'views/home.html',
//            controller: 'HomeController',
//            controllerUrl: 'scripts/controller'
//        })
    });

    angularAMD.bootstrap(app);
    return app;
})