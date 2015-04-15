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
    './services/navigation-service',
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

        function StandartResolve(act,path){
            return function(Navigation){
                return {
                    navigation : new Navigation(path),
                    action : act
                }
            };
        }

        angular.forEach(Entity, function (object, key) {
            $routeProvider.when(object.path + '/list', angularAMD.route({
                templateUrl: '/views' + object.path + '/list.html',
                controller: object.controller,
                controllerUrl: object.controllerUrl,
                resolve : {
                    $setup : new StandartResolve('list',object.path)
                }
            }));
            if (!object.hasOwnProperty("subtypes")) {
                $routeProvider.when(object.path + '/new', angularAMD.route({
                    templateUrl: '/views' + object.path + '/form.html',
                    controller: object.controller,
                    controllerUrl: object.controllerUrl,
                    resolve : {
                        $setup : new StandartResolve('new',object.path)
                    }
                }));
                $routeProvider.when(object.path + '/view/:id/:index?', angularAMD.route({
                    templateUrl: '/views' + object.path + '/view.html',
                    controller: object.controller,
                    controllerUrl: object.controllerUrl,
                    resolve : {
                        $setup : new StandartResolve('view',object.path)
                    }
                }));
                $routeProvider.when(object.path + '/edit/:id', angularAMD.route({
                    templateUrl: '/views' + object.path + '/form.html',
                    controller: object.controller,
                    controllerUrl: object.controllerUrl,
                    resolve : {
                        $setup : new StandartResolve('edit',object.path)
                    }
                }));
            }

        });

        $routeProvider.when('/client/view/:id/:index?', angularAMD.route({
            templateUrl: '/views/client/view.html',
            controller: Entity.client.controller,
            controllerUrl: Entity.client.controllerUrl,
            resolve : {
                $setup : new StandartResolve('view','/client')
            }
        }));

        $routeProvider.when('/client/new/private', angularAMD.route({
            templateUrl: '/views/client/formPrivate.html',
            controller: Entity.client.controller,
            controllerUrl: Entity.client.controllerUrl,
            resolve : {
                $setup : new StandartResolve('new','/client')
            }
        }));

        $routeProvider.when('/client/new/company', angularAMD.route({
            templateUrl: '/views/client/formCompany.html',
            controller: Entity.client.controller,
            controllerUrl: Entity.client.controllerUrl,
            resolve : {
                $setup : new StandartResolve('new','/client')
            }
        }));

        $routeProvider.when('/client/edit/private/:id', angularAMD.route({
            templateUrl: '/views/client/formPrivate.html',
            controller: Entity.client.controller,
            controllerUrl: Entity.client.controllerUrl,
            resolve : {
                $setup : new StandartResolve('edit','/client')
            }
        }));

        $routeProvider.when('/client/edit/company/:id', angularAMD.route({
            templateUrl: '/views/client/formCompany.html',
            controller: Entity.client.controller,
            controllerUrl: Entity.client.controllerUrl,
            resolve : {
                $setup : new StandartResolve('edit','/client')
            }
        }));

        $routeProvider.when('/section/:house/new', angularAMD.route({
            templateUrl: '/views/section/form.html',
            controller: Entity.section.controller,
            controllerUrl: Entity.section.controllerUrl,
            resolve : {
                $setup : new StandartResolve('new','/section')
            }
        }));

        $routeProvider.when('/unit/:section/new', angularAMD.route({
            templateUrl: '/views/unit/form.html',
            controller: Entity.unit.controller,
            controllerUrl: Entity.unit.controllerUrl,
            resolve : {
                $setup : new StandartResolve('new','/unit')
            }
        }));


        $routeProvider.otherwise({redirectTo: '/'});
    });

    angularAMD.bootstrap(app);
    return app;
});
