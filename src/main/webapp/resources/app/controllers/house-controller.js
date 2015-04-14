define([
    'angular',
    './controller-module',
    './base-controller'
], function (angular, module) {
    module.register.controller('HouseCtrl',function($scope,$controller, $location, $log,Grids,$routeParams, RestService, Utils, Entity){

        $controller('BaseCtrl',{$scope:$scope});
        $log.debug('initialized house ctrl');
        var coopService = new RestService(Entity.coop.entity);
        $scope.tabIndex = parseInt($routeParams.index || 0);
        $scope.addNavCallback('new view edit',function(){
            $scope.coops = coopService.active();
        });

        $scope.singleReadCallback = function(){

            $scope.model.getResource('cooperative',{success : function(data){
                $scope.selectedCoop = Object.size(data) > 0 ? data : $scope.coops[0];
                $scope.model.cooperative = $scope.selectedCoop.getLink('self');
            }});

            if($scope.action == 'view'){
                $scope.model.getResource('sections',{
                    success : function(data){
                        $scope.sections = $scope.api.embedded(data);
                        $scope.nestedOptions.data = $scope.sections;
                    }
                });
                $scope.nestedOptions = angular.extend({},Grids.nestedGrid);
                $scope.nestedOptions.columnDefs = [
                    {name : 'Строительный номер' , width:'40%', field : 'structuralNumber', cellTemplate:'<div class="ui-grid-cell-contents"><a href="#' + '/section/view/{{row.entity.id}}">{{row.entity[col.field]+" "+row.entity.zipCode}}</a> </div>'},
                    {name: 'Почтовый номер', width: '30%', field: 'postalNumber'},
                    {name: 'Количество этажей', width: '30%', field: 'floorCount'}
                ];

            }
        };

        $scope.newSection= function(){
            $location.path('/section/'+$scope.model.id+'/new');
        }

    });



});