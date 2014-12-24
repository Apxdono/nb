define(['./module'], function (services) {
    services.factory('Func', function () {
        var service = {
            isEmpty: function (obj) {
                if (!obj) return true;
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop))
                        return false;
                }
                return true;
            },
            copyHalData: function (target, halData) {
                if(service.isEmpty(halData)) return;
                var dd = halData["_embedded"]
                if (dd) {
                    for (var prop in dd) {
                        if (dd.hasOwnProperty(prop)) {
                            for (var o in dd[prop]) {
                                target.push(dd[prop][o]);
                            }
                        }
                    }
                }
            }
    };
    return service;
})
})
;
