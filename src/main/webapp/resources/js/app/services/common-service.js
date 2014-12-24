define(['./module','./constants'], function (services) {
    services.factory('CommonService', function ($http,$q) {
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
            },
            destroy : function(model){
                return $http.delete(this.baseUrl + '/' + this.entity + '/' + model.id, model);
            },
            opupdate: function (model) {
                return $http.patch(this.baseUrl + '/' + this.entity + '/' + model.id, model);
            },
            active : function (){
                return $http.get(this.baseUrl+'/'+this.entity+'/search/findByActiveIsTrueOrderByNameAsc');
            },
            autocomplete : function (criteria){
                return $http.get(this.baseUrl+'/'+this.entity+'/search/autocomplete?size=20&criteria='+criteria);
            },
            getMe : function(url){
                return $http.get(url);
            }
        }
        return service;
    })
});
