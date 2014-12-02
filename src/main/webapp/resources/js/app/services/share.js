define(['./module'], function (services) {
    services.factory('Share', function () {
        var service = {
            add : function(key,value){
                service[key] = value;
            },
            remove : function (key) {
                delete service[key];
            },
            getShared : function(key){
                return service[key];
            }

        };
        return service;
    })
});
