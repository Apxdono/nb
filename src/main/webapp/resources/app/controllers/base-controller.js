define([
    'angular',
    './controller-module'
], function (angular, module) {

    module.register.controller('BaseCtrl', function ($scope, $location, $log, $routeParams, localStorageService, Grids, Entity, RestService) {

        $scope.model = {};

        $scope.init = function () {
            var ent = Entity.hasOwnProperty($scope.entity) ? Entity[$scope.entity] : {};
            $log.debug('Initialized with entity ', ent);
            $scope.path = ent.path;
            $scope.processedEntity = ent;
            $scope.api = new RestService(ent.entity);
            for (var k in $scope.navCallbacks) {
                if ($location.path().indexOf(k) != -1) {
                    $scope.action = k;
                    if ($scope.navCallbacks[k]()) $scope.navCallbacks[k]();
                    break;
                }
            }
        };

        /*Grid system*/
        $scope.initGridOptions = function (ent) {
            $scope.options = new Grids.defaultGrid($scope, localStorageService, ent.entity);
            $scope.options.columnDefs = ent.columnDefs;
            $scope.options.fetchData = function () {
                $scope.api.gridResult($scope.prepareParams(), {
                    success: function (data) {
                        $scope.options.data = $scope.api.embedded(data);
                        $scope.dataFetched = true;
                        $scope.options.pageData = $scope.api.pageData(data);
                        if ($scope.options.currentPage() > $scope.options.pageData.number + 1) {
                            $scope.options.currentPage($scope.options.pageData.number + 1);
                        }
                    }
                });
            }
        };

        $scope.getSortParam = function () {
            var result = {};
            if ($scope.options.gridApi) {
                var grid = $scope.options.gridApi.grid;
                for (var i = 0; i < grid.columns.length; i++) {
                    var col = grid.columns[i];
                    if (col.sort.direction) {
                        result.sort = col.field + ',' + col.sort.direction;
                        break
                    }
                }
            }
            return result;
        };

        $scope.prepareParams = function () {
            return angular.extend({}, $scope.getSortParam(), $scope.options.filters, $scope.options.paging);
        };
        /*Grid system*/


        /*CRUD*/

        $scope.save = function () {
            if (!$scope.form.$valid) {
                return;
            }
            $scope.api.save($scope.model, {
                    success: $scope.toList
                },
                {
                    success: $scope.toView
                })
        };

        $scope.cancel = function () {
            if ($scope.model.id) {
                $scope.toView($scope.model);
            } else {
                $scope.toList();
            }
        };


        /*Navigation*/
        $scope.toList = function () {
            $location.path($scope.path + '/list');
        };

        $scope.toNew = function () {
            var hash = $scope.path + '/new';
            $location.path(hash);
        };

        $scope.toView = function (mdl) {
            mdl = mdl || $scope.model;
            var hash = $scope.path + '/view/' + mdl.id;
            $location.path(hash);
        };

        $scope.toEdit = function (mdl) {
            mdl = mdl || $scope.model;
            var hash = $scope.path + '/edit/' + mdl.id;
            $location.path(hash);
        };

        $scope.navCallbacks = {
            'list': function () {
                $scope.initGridOptions($scope.processedEntity);
                $scope.options.fetchData();
            },
            'view': function () {
                $scope.model = $scope.api.read($routeParams.id);
            },
            'edit': function () {
                $scope.model = $scope.api.read($routeParams.id);
            }
        };

        $scope.addNavCallback = function (action, callback) {
            var old = $scope.navCallbacks[action];
            $scope.navCallbacks[action] = function () {
                if (old) old();
                callback();
            };
        };

        /*Navigation*/

    });


});