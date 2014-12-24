define(['./../module','./../common-service'], function (services) {
    services.factory('SectionService', function ($http, Constants, CommonService) {
        var service = angular.extend({}, CommonService);
        service.entity = Constants.section.entity;
        return service;
    });
});
