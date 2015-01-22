define(['angular','angular-auth','../constants'], function (angular) {
    var services = angular.module("nova.services", ['http-auth-interceptor','nova.constants']);
    services.config(function($controllerProvider,$compileProvider, $filterProvider, $provide){
        services.register =
        {
            factory: $provide.factory,
            service: $provide.service
        };
    });
    return services;
});
