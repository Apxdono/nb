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

    });


});