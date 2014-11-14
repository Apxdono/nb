'use strict';
angular.module('nova', [
    'ngRoute',
    'ui.grid',
    'xtForm',
    'ngDialog',
    'ui.bootstrap',
    'LocalStorageModule',
    'nova.controllers',
    'nova.directives',
    'nova.services'
]).config(function ($routeProvider) {
    var consts = angular.injector(['nova.services']).get('Constants');
    angular.forEach(consts,function(object,key){
        $routeProvider.when(object.path+'/list', { templateUrl: '/views'+object.path+'/list.html', controller: object.controller});
        $routeProvider.when(object.path+'/new', { templateUrl: '/views'+object.path+'/form.html', controller: object.controller});
        $routeProvider.when(object.path+'/view/:id', { templateUrl: '/views'+object.path+'/view.html', controller: object.controller});
        $routeProvider.when(object.path+'/edit/:id', { templateUrl: '/views'+object.path+'/form.html', controller: object.controller});
    });
    $routeProvider.when('/client/new/private', { templateUrl: '/views/client/formPrivate.html', controller: 'ClientCtrl'});
    $routeProvider.when('/client/new/company', { templateUrl: '/views/client/formCompany.html', controller: 'ClientCtrl'});
    $routeProvider.when('/client/edit/private/:id', { templateUrl: '/views/client/formPrivate.html', controller: 'ClientCtrl'});
    $routeProvider.when('/client/edit/company/:id', { templateUrl: '/views/client/formCompany.html', controller: 'ClientCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
}).config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('novaStorage');
    // localStorageServiceProvider.setStorageCookieDomain('example.com');
    // localStorageServiceProvider.setStorageType('sessionStorage');
}]).config(function (xtFormErrorsProvider) {
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
});