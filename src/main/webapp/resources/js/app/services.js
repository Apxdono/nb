'use strict';

/* Services */

angular.module('nova.services', []).
    factory('Constants', function () {
        var service = {
            unitType: {
                entity: 'unitTypes',
                path: '/unittype',
                controller: 'UnitTypesCtrl'
            },
            unit: {
                entity: 'units',
                path: '/unit',
                controller: 'UnitCtrl'
            },
            coop: {
                entity: 'cooperatives',
                path: '/cooperative',
                controller: 'CoopCtrl'
            },
            client: {
                entity: 'clients',
                subentity1 : 'privateClients',
                subentity2 : 'companies',
                path: '/client',
                controller: 'ClientCtrl'
            }
        };
        return service;
    }).
    factory('CommonService', function ($http) {
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
            }

        }
        return service;
    }).
    factory('UnitTypeService', function ($http, Constants, CommonService) {
        var service = angular.extend({}, CommonService);
        service.entity = Constants.unitType.entity;
        return service;
    }).factory('CoopService', function ($http, Constants, CommonService) {
        var service = angular.extend({}, CommonService);
        service.entity = Constants.coop.entity;
        return service;
    }).factory('ClientService', function ($http, Constants, CommonService) {
        var service = angular.extend({}, CommonService);
        service.entity = Constants.client.entity;
        var makeUrl = function(s,m){
            var url = s.baseUrl + '/' + (m.type=='PRIVATE'?Constants.client.subentity1 :Constants.client.subentity2);
            return url;
        };
        service = angular.extend(service,{
            create: function (model) {
                return $http.post(makeUrl(this,model), model);
            },
            update: function (model) {
                return $http.put(makeUrl(this,model)+ '/' + model.id, model);
            }
        });
        return service;
    });

