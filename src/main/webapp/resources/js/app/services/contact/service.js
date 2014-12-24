define(['./../module','./../common-service'], function (services) {
    services.factory('ContactService', function ($http, Constants, CommonService) {
        var service = angular.extend({}, CommonService);
        service.entity = 'contacts';
        return service;
    });
});
