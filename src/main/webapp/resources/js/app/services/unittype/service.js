define(['./../module','./../common-service'], function (services) {
    services.factory('UnitTypeService', function ($http, Constants, CommonService) {
        var service = angular.extend({}, CommonService);
        service.entity = Constants.unitType.entity;
        return service;
    });
});
