define(['./module','./constants'], function (services) {
    services.factory('CommonService', function ($http) {
        var service = {
            entity: '',
            baseUrl: '/rest/api',
            suffix: '/search/tableResult',
            list: function (parameters) {
                return $http.get(this.baseUrl + '/' + this.entity + this.suffix, {
                    params: parameters
                });
            },
            read: function (id) {
                return $http.get(this.baseUrl + '/' + this.entity + '/' + id);
            },
            create: function (model) {
                return $http.post(this.baseUrl + '/' + this.entity, model);
            },
            update: function (model) {
                return $http.put(this.baseUrl + '/' + this.entity + '/' + model.id, model);
            }

        }
        return service;
    })
});