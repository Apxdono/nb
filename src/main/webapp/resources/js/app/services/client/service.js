define(['./../module','./../common-service'], function (services) {
    services.factory('ClientService', function ($http, Constants, CommonService) {
        var service = angular.extend({}, CommonService);
        service.entity = Constants.client.entity;
        var makeUrl = function(s,m){
            var url = s.baseUrl + '/' + (m.type=='PRIVATE'?Constants.client.subentity1 :Constants.client.subentity2);
            return url;
        };
        service = angular.extend(service,{
            create: function (model) {
                return $http.post(makeUrl(this,model), model);
            },
            update: function (model) {
                return $http.put(makeUrl(this,model)+ '/' + model.id, model);
            }
        });
        return service;
    });
});
