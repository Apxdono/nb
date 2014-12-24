define(['./../module','./../common-service'], function (services) {
    services.factory('UserService', function ($http,$rootScope) {
        var service = {}
        service.user = null;
        $http.get("/user/get").success(function(data){
            service.user = data;
        });
        return service;
    });
});
