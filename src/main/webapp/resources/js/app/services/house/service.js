define(['./../module','./../common-service'], function (services) {
    services.factory('HouseService', function ($http, Constants, CommonService) {
        var service = angular.extend({}, CommonService);
        service.entity = Constants.house.entity;
        return service;
    });
});
