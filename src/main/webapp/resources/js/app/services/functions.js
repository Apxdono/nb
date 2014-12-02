define(['./module'], function (services) {
    services.factory('Func', function () {
        var service = {
            isEmpty : function(obj){
                if(!obj) return true;
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop))
                        return false;
                }
                return true;
            }
        };
        return service;
    })
});
