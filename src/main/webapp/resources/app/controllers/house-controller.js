define([
    'angular',
    './controller-module',
    './base-controller'
], function (angular, module) {
    module.register.controller('HouseCtrl',function($scope,$controller, $location, $log, RestService, Utils, Entity){

        $controller('BaseCtrl',{$scope:$scope});
        $log.debug('initialized house ctrl');
        var coopService = new RestService(Entity.coop.entity);

        $scope.addNavCallback('new view edit',function(){
            $scope.coops = coopService.active();
        });

        $scope.singleReadCallback = function(){
            $scope.model.getResource('cooperative',{success : function(data){
                $scope.selectedCoop = Object.size(data) > 0 ? data : $scope.coops[0];
                $scope.model.cooperative = $scope.selectedCoop.getLink('self');
            }});
        };

    });



});