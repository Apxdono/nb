define(['angular','angular-auth','../constants'], function (angular) {
    var services = angular.module("nova.services", ['http-auth-interceptor','nova.constants']);
    return services;
});
