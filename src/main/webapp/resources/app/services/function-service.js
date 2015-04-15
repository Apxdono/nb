define([
        'angular',
        './service-module'
    ],
    function(angular,module){
        var provider = module.register || module;
        provider.service('Utils',function(){
            var service = {};

            service.copy = function(s,d){
                var v, key;
                d = d || {};
                for (key in o) {
                    v = o[key];
                    d[key] = (typeof v === "object") ? service.copy(v) : v;
                }
                return d;
            };

            service.makePath = function(){
                var args = Array.prototype.slice.call(arguments);
                var res = args.join('/');
                return args[0].indexOf('/') == 0 ? res : '/'+res;
            };
            return service;
        });



    });