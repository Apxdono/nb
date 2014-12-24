define(['./../module','./../constants'], function (services) {
    services.factory('ContactTypes', function ($http, Constants) {
        var service = {};
        var callbacks = [];
        if(!service.types){
            $http.get("/rest/api/contacttypes").success(function(data){
                data.find = function(str){
                    var result = {};
                    angular.forEach(service.types,function(o,i){
                        if(o.name === str){
                            result = o;
                            return false;
                        }
                    })
                    return result;
                };
                service.types = data;
                if(callbacks.length > 0){
                    angular.forEach(callbacks,function(cb,index){
                        cb(data);
                    });
                }
            });
        }

        service.get = function(cb){
            if(service.types){
                cb(service.types);
            } else {
                callbacks.push(cb);
            }
        }
        return service;
    });
});
