define(['./../module','./../common-service'], function (services) {
    services.factory('UnitService', function ($http, Constants, CommonService) {
        var service = angular.extend({}, CommonService);
        service.entity = Constants.unit.entity;
        return service;
    });
});
