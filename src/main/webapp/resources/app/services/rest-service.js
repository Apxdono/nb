define(['angular', './service-module'], function (angular, services) {

    services.factory('RestService', function ($http, $q, $timeout) {

        var ctor = function (entityPath) {

            var halExtra = {

                getResource: function (resName,cbs) {
                    if (this['_links'] && this['_links'][resName]) {
                        return service.getResource(this['_links'][resName]['href'],cbs);
                    }
                    return null;
                },

                getLink: function(lnk){
                    if (this['_links'] && this['_links'][lnk]) {
                        return this['_links'][lnk]['href'];
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
                }  else if(data instanceof Array) {
                    for(var i =0; i < data.length; i++){
                        angular.extend(data[i],halExtra);
                    }
                } else {
                     angular.extend(data,halExtra);
                }
                return data;
            }

            var resolvePromise = function (httpPromise, callbacks,isArray, multipromise) {
                var result = isArray ? [] : {};
                var r = multipromise ? $q.all(httpPromise) : httpPromise;
                r.then(function (data) {
                    var d;
                    if(multipromise){
                        d = data.map(function(e){return e.data});
                    } else {
                        d = isArray ? service.embedded(data.data) : data.data;
                    }

                    d = halModelProcess(d);
                    $timeout(function () {
                        copy(d,result);
//                        unwrap(deffered.promise,data);
                        if (callbacks && callbacks.success) {
                            callbacks.success(d,data.data);
                        }
                    }, 0);
                },function () {
                    $timeout(function () {
                        if (callbacks && callbacks.error) {
                            callbacks.error.apply(this, data);
                        }
                    }, 0);
                });
                return result;
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
                save:function(model,createcbs,updatecbs){
                    var created = model.getLink && model.getLink('self');
                    var method = created ? 'PUT' : 'POST';
                    var url = created ? model.getLink('self') : [this.baseUrl,'/',this.entity].join('');
                    var cbs = created ? updatecbs : createcbs;
                    resolvePromise($http({
                        method : method,
                        url : url,
                        data : model
                    }),cbs);
                },

                batchSave : function(data,cbs){
                    var deffs = [];
                    for(var i =0; i < data.length; i++){
                        var model = data[i];
                        var created = model.getLink && model.getLink('self');
                        var method = created ? 'PUT' : 'POST';
                        var url = created ? model.getLink('self') : [this.baseUrl,'/',this.entity].join('');
                        deffs.push($http({
                            method : method,
                            url : url,
                            data : model
                        }))
                    }
                    resolvePromise(deffs,cbs,true,true);
                },
                partialSave : function(model,attrs,cbs){
                    var method = 'PATCH';
                    var url = model.getLink('self');
                    var data = {};
                    for(var i =0; i< attrs.length; i++){
                        data[attrs[i]] = model[attrs[i]];
                    }
                    resolvePromise($http({
                        method : method,
                        url : url,
                        data : data
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
                    }),null);
                },
                active: function () {
                    return resolvePromise($http({
                        method : 'GET',
                        url : this.baseUrl + '/' + this.entity + this.activeRecordsSuffix
                    }),null,true);
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
                embedded : function(halData,filters){
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
                pageData : function(halData){
                    return halData['page'] || {};
                    //{
//                    "size" : 20,
//                        "totalElements" : 6,
//                        "totalPages" : 1,
//                        "number" : 0
                },
                deleteAssociation: function (url, success, error) {
                    $http({
                        method: 'DELETE',
                        url: url
                    }).success(success).error(error);
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