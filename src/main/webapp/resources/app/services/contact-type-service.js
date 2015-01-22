define([
        'angular',
        './service-module'
    ],
    function(angular,module){

        module.register.service('ContactTypes',function($http){

            var service = {}, data = [];

            service.fetch = function(){
                if(data.length < 1){
                    $http.get('/rest/api/contacttypes').success(function(d){
                        copy(d,data);
                    });
                }
                return data;
            };


            return service;
        });



});