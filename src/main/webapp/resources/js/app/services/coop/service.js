define(['./../module','./../common-service'], function (services) {
    services.factory('CoopService', function ($http, Constants, CommonService) {
        var service = angular.extend({}, CommonService);
        service.entity = Constants.coop.entity;
        return service;
    });
});
