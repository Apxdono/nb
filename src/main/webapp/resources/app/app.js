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
    './directives/index',
    './controllers/controller-module',
    './controllers/main-ctrl'
], function (jQuery, angularAMD, angular) {

    var app = angular.module('nova', ['ngRoute', 'http-auth-interceptor', 'LocalStorageModule', 'xtForm', 'nova.constants', 'nova.services', 'nova.directives', 'nova.controllers']);

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

        angular.forEach(Entity, function (object, key) {
            $routeProvider.when(object.path + '/list', angularAMD.route({
                templateUrl: '/views' + object.path + '/list.html',
                controller: object.controller,
                controllerUrl: object.controllerUrl,
                resolve: {
                    isFiltered: function() { return true; }
                }
            }));
            if (!object.hasOwnProperty("subtypes")) {
                $routeProvider.when(object.path + '/new', angularAMD.route({
                    templateUrl: '/views' + object.path + '/form.html',
                    controller: object.controller,
                    controllerUrl: object.controllerUrl,
                    resolve: {
                        isFiltered: function() { return true; }
                    }
                }));
                $routeProvider.when(object.path + '/view/:id/:index?', angularAMD.route({
                    templateUrl: '/views' + object.path + '/view.html',
                    controller: object.controller,
                    controllerUrl: object.controllerUrl
                }));
                $routeProvider.when(object.path + '/edit/:id', angularAMD.route({
                    templateUrl: '/views' + object.path + '/form.html',
                    controller: object.controller,
                    controllerUrl: object.controllerUrl
                }));
            }

        });
        $routeProvider.otherwise({redirectTo: '/'});

    });

    angularAMD.bootstrap(app);
    return app;
})