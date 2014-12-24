define(['./../module','./../common-service'], function (services) {
    services.factory('PriceService', function ($http, Constants, CommonService) {
        var service = angular.extend({}, CommonService);
        service.entity = 'prices';
        return service;
    });
});
