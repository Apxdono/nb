define([
    'angular',
    './controller-module',
    './base-controller'
], function (angular, module) {
    module.register.controller('CoopCtrl',function($scope,$controller, $location, $log, $routeParams, localStorageService, Grids, Entity, RestService){
        $controller('BaseCtrl',{$scope:$scope});
        $log.debug('initialized coop ctrl')

        var cc = '';

        $scope.currentCurator = function(value){
            if(value != null){
                cc = value;
            }
            return cc;
        };

        $scope.addCurator = function(){
            if($scope.currentCurator() && $scope.currentCurator().length > 0){
                $scope.model.curators.push($scope.currentCurator());
                $scope.currentCurator('');
            }
        };

        $scope.removeCurator = function(index){
            $scope.model.curators.splice(index,1);
        };

        $scope.editCurator = function(index){
            $scope.currentCurator($scope.model.curators[index]);
            $scope.removeCurator(index);
        };

    });



});