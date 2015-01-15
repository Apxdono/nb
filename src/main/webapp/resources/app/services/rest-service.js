define(['angular', './service-module'], function (angular, services) {

    services.factory('RestService', function ($http, $q, $timeout) {

        var ctor = function (entityPath) {

            var halExtra = {

                getResource: function (resName) {
                    if (this['_links'] && this['_links'][resName]) {
                        return service.getResource(this['_links'][resName]['href']);
                    }
                    return null;
                }

            }

            var unwrap = function(p,data){
                for (var prop in p) { if (p.hasOwnProperty(prop)) { delete p[prop]; } }
                angular.extend(p,data);
            }

            var halModelProcess = function (data) {
                if(isEmpty(data)) return data;
                var embd = data['_embedded'];
                if (embd) {
                    for (var t in embd){
                        var subset = embd[t];
                        for(var e in subset){
                            angular.extend(subset[e],halExtra);
                        }
                    }
                }  else {
                    angular.extend(data,halExtra);
                }
                return data;
            }

            var resolvePromise = function (httpPromise, callbacks) {
                var deffered = $q.defer();
                httpPromise.success(function (data) {
                    data = halModelProcess(data);
                    $timeout(function () {
                        deffered.resolve(data);
                        unwrap(deffered.promise,data);
                        if (callbacks && callbacks.success) {
                            callbacks.success(data);
                        }
                    }, 0);
                }).error(function () {
                    $timeout(function () {
                        deffered.reject();
                        if (callbacks && callbacks.error) {
                            callbacks.error.apply(this, data);
                        }
                    }, 0);
                });
                return deffered.promise;
            }


            var service = {
                entity: entityPath,
                baseUrl: '/rest/api',
                gridSuffix: '/search/tableResult',
                autocompleteSuffix: '/search/autocomplete',
                activeRecordsSuffix: '/search/findByActiveIsTrueOrderByNameAsc',
                read: function (id, cbs) {
                    return resolvePromise($http({
                        method: 'GET',
                        url: this.baseUrl + '/' + this.entity + '/' + id
                    }), cbs);
                },
                create: function (model,cbs) {
                    return resolvePromise($http({
                            method : 'POST',
                            url : this.baseUrl + '/' + this.entity,
                            parameters : model
                        }),cbs);
                },
                update: function (model,cbs) {
                    return resolvePromise($http({
                        method : 'PUT',
                        url : this.baseUrl + '/' + this.entity + '/' + model.id,
                        parameters : model
                    }),cbs);
                },
                destroy: function (model) {
                    return $http.delete(this.baseUrl + '/' + this.entity + '/' + model.id, model);
                },
                opupdate: function (model) {
                    return resolvePromise($http({
                        method : 'PATCH',
                        url : this.baseUrl + '/' + this.entity + '/' + model.id,
                        parameters : model
                    }),cbs);
                },
                active: function () {
                    return $http.get(this.baseUrl + '/' + this.entity + this.activeRecordsSuffix);
                },
                autocomplete: function (parameters,cbs) {
                    return resolvePromise($http({
                        method: 'GET',
                        url: this.baseUrl + '/' + this.entity + this.autocompleteSuffix,
                        params: parameters
                    }),cbs);
                },
                gridResult : function(parameters,cbs){
                    return resolvePromise($http({
                        method: 'GET',
                        url: this.baseUrl + '/' + this.entity + this.gridSuffix,
                        params: parameters
                    }),cbs);
                },
                extractEmbedded : function(halData,filters){
                    var embd = halData['_embedded'];
                    var result = [];
                    if (embd) {
                        for (var t in embd){
                            var subset = embd[t];
                            for(var e in subset){
                                result.push(subset[e]);
                            }
                        }
                    }
                    return result;
                },
                getResource: function (url,cbs) {
                    return resolvePromise($http({
                        method : 'GET',
                        url : url
                    }),cbs);
                }
            };
            return service;
        }
        return ctor;
    });
});