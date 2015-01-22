define([
    'angular',
    './controller-module',
    './../services/function-service'
], function (angular, module) {

    module.register.controller('BaseCtrl', function ($scope, $location, $log, $routeParams, localStorageService, Grids, Utils, Entity, RestService) {

        $scope.model = {};

        $scope.init = function () {
            $scope.processedEntity = Entity.hasOwnProperty($scope.entity) ? Entity[$scope.entity] : {};
            $log.debug('Initialized with entity ', $scope.processedEntity);
            $scope.initModel();
            $scope.path = $scope.processedEntity.path;
            $scope.initApi();
            for (var k in $scope.navCallbacks) {
                if ($location.path().indexOf(k) != -1) {
                    $scope.action = k;
                    if ($scope.navCallbacks[k]()) $scope.navCallbacks[k]();
                    break;
                }
            }
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
            $location.path(Utils.makePath($scope.path ,'list'));
        };

        $scope.toNew = function () {
            $location.path(Utils.makePath($scope.path ,'new'));
        };

        $scope.toView = function (mdl) {
            $location.path(Utils.makePath($scope.path ,'view', mdl ? mdl.id : $scope.model.id));
        };

        $scope.toEdit = function (mdl) {
            $location.path(Utils.makePath($scope.path ,'edit', mdl ? mdl.id : $scope.model.id));
        };

        $scope.singleReadCallback = function(){

        };

        $scope.navCallbacks = {
            'list': function () {
                $scope.initGridOptions($scope.processedEntity);
                $scope.options.fetchData();
            },
            'view': function () {
                $scope.model = $scope.api.read($routeParams.id,{success:$scope.singleReadCallback});
                $scope.tabIndex = $routeParams.index || 0;
            },
            'edit': function () {
                $scope.model = $scope.api.read($routeParams.id,{success:$scope.singleReadCallback});
            }
        };

        $scope.addNavCallback = function (action, callback) {
            if(!action) return;
            var actions = action.split(' ');
            for (var k in actions){
                var a = actions[k];
                var old = $scope.navCallbacks[a];
                $scope.navCallbacks[a] = function () {
                    if (old) old();
                    callback();
                };
            }

        };

        /*Navigation*/

    });


});