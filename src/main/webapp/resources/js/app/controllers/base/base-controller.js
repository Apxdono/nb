define(['angular','jquery', '../module'], function (ng,jq, controllers) {
    'use strict';
    controllers.controller('BaseController', function ($scope, $routeParams, $location, localStorageService,Grids) {
        var setData = function (d) {
            var dd = d["_embedded"]
            $scope.options.data = [];
            if (dd) {
                for (var prop in dd) {
                    if (dd.hasOwnProperty(prop)) {
                        angular.forEach(dd[prop], function (o, k) {
                            $scope.options.data.push(o);
                        })
                    }

                }
            }
            $scope.options.pageData = d["page"];
            $scope.options.currentPage($scope.options.pageData.number + 1);
        };
        var errorData = function (d) {
            $location.path("/403");
        };

        function isEmpty(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }

            return true;
        }

        $scope.$location = $location;
        $scope.getSortParam = function () {
            var result = {};
            if ($scope.gridApi) {
                var grid = $scope.gridApi.grid;
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

        $scope.model = {};

        $scope.init = function () {
            if ($location.path().indexOf('/new') !== -1) {
                return;
            }
            if ($location.path().indexOf('/list') !== -1) {
                $scope.options.data = [];
                var key = $scope.factory.entity + '.filters';
                var f = localStorageService.get(key);
                if (!isEmpty(f)) {
                    $scope.options.filters = f;
                }
                $scope.$watch('options.filters', function (newval, oldval) {
                    if (isEmpty(newval)) {
                        return;
                    }
                    var key = $scope.factory.entity + '.filters';
                    localStorageService.set(key, newval);
                    $scope.options.currentPage(1);
                }, true);
            }
            if ($routeParams.id) {
                $scope.factory.read($routeParams.id).success($scope.fetchSingle);
            } else {
                $scope.options.fetchData();
            }
        };

        $scope.fetchSingle = function (data) {
            $scope.model = data;
        };

        $scope.toList = function () {
            $location.path($scope.path + '/list');
        };


        $scope.toNew = function () {
            var hash = $scope.path + '/new';
            $location.path(hash);
        };

        $scope.toView = function (mdl) {
            var hash = $scope.path + '/view/' + mdl.id;
            $location.path(hash);
        };

        $scope.toEdit = function () {
            var hash = $scope.path + '/edit/' + $scope.model.id;
            $location.path(hash);
        };

        $scope.save = function () {
            if (!$scope.form.$valid) {
                return;
            }
            if ($scope.model.id) {
                $scope.factory.update($scope.model).success(
                    function () {
                        $scope.toView($scope.model)
                    }
                );
            } else {
                $scope.factory.create($scope.model).success(
                    function () {
                        $scope.toList()
                    }
                );
            }
        };

        $scope.cancel = function () {
            if ($scope.model.id) {
                $scope.toView($scope.model);
            } else {
                $scope.toList();
            }
        };

        $scope.initField = function (fieldName, value) {
            if (!$scope.model[fieldName]) {
                $scope.model[fieldName] = value;
            }
        };

//table options
        $scope.options = angular.extend({},Grids.defaultGrid);
        $scope.options.currentPage(1);
        $scope.options.size(10);
        $scope.options.fetchData = function () {
            if ($scope.factory) {
                $scope.factory.list($scope.prepareParams()).success(setData).error(errorData);
            }
        };
        $scope.options.onRegisterApi = function (api) {
            $scope.gridApi = api;
            $scope.gridApi.core.on.sortChanged($scope, function () {
                var grid = this.grid;
                $scope.options.fetchData();
            });
        };

        $scope.setFactory = function (f) {
            $scope.factory = f;
        }

    });
});
