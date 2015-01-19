define([
    'angular',
    './controller-module',
    '../constants'
], function (angular,module) {

    module.controller('BaseCtrl',function($scope,$log,$routeParams,localStorageService,GridOptions){

        $scope.model = {};
        $scope.initGridOptions = function(entityPath){
            $scope.options = GridOptions.defaultGrid($scope,localStorageService,entityPath);
        }

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


    });


});