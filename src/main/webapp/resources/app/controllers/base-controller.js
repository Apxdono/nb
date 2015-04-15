define([
    'angular',
    './controller-module',
    './../services/function-service'
], function (angular, module) {

    module.register.controller('BaseCtrl', function ($scope,$setup, $location, $log, $routeParams, localStorageService, Grids, Utils, Entity, RestService) {


        $scope.action = $setup.action;
        angular.extend($scope,$setup.navigation);

        $scope.model = {};


        $scope.init = function () {
            $scope.processedEntity = Entity.hasOwnProperty($scope.entity) ? Entity[$scope.entity] : {};
            $log.debug('Initialized with entity ', $scope.processedEntity);
            $scope.initModel();
            $scope.path = $scope.processedEntity.path;
            $scope.initApi();
            $scope.navCallbacks.executeCallbacks($scope.action);
        };

        $scope.initModel = function(){

        };

        $scope.initApi = function(){
            $scope.api = new RestService($scope.processedEntity.entity);
        };

        $scope.initField = function (fieldName, value) {
            if (!$scope.model[fieldName]) {
                $scope.model[fieldName] = value;
            }
        };

        /*Grid system*/
        $scope.initGridOptions = function () {
            $scope.options = new Grids.defaultGrid($scope, localStorageService, $scope.processedEntity.entity);
            $scope.options.columnDefs = $scope.processedEntity.columnDefs;
            $scope.options.fetchData = function () {
                $scope.api.gridResult($scope.prepareParams(), {
                    success: function (data) {
                        $scope.options.data = $scope.api.embedded(data);
                        $scope.options.dataLoaded = true;
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

        $scope.addNavCallback('list',function () {
            $scope.initGridOptions($scope.processedEntity);
            $scope.options.fetchData();
        });

        $scope.addNavCallback('view',function () {
            $scope.model = $scope.api.read($routeParams.id,{success:$scope.singleReadCallback});
            $scope.tabIndex = parseInt($routeParams.index || 0);
        });

        $scope.addNavCallback('edit',function () {
            $scope.model = $scope.api.read($routeParams.id,{success:$scope.singleReadCallback});
        });


        /*Navigation*/

    });


});