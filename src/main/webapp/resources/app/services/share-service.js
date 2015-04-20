define([
        'angular',
        './service-module'
    ],
    function (angular, module) {
        module.register.factory('Share', function () {
            var service = {
                add: function (key, value) {
                    service[key] = value;
                },
                remove: function (key) {
                    delete service[key];
                },
                getShared: function (key) {
                    return service[key];
                }

            };
            return service;
        });
    });