define([
    'angular',
    './controller-module',
    './base-controller'
], function (angular, module) {
    module.register.controller('SectionCtrl',function($scope,$setup,$controller, $location, $log,Grids,$routeParams, RestService, Utils, Entity){

        $controller('BaseCtrl',{$scope:$scope,$setup:$setup});

        $log.debug('initialized section ctrl');
        var houseService = new RestService(Entity.house.entity);
        $scope.tabIndex = parseInt($routeParams.index || 0);

        $scope.addNavCallback('new',function(){
            houseService.read($routeParams.house,{success : function(data){
                $scope.house = data;
                $scope.model.house = $scope.house.getLink('self');

            }});
        });

        $scope.singleReadCallback = function(){

            $scope.model.getResource('house',{success : function(data){
                $scope.house = data;
                $scope.model.house = $scope.house.getLink('self');
            }});


            if($scope.action == 'view'){
                $scope.model.getResource('units',{
                    success : function(data){
                        $scope.units = $scope.api.embedded(data);
                        $scope.nestedOptions.data = $scope.units;
                    }
                });
                $scope.nestedOptions = angular.extend({},Grids.nestedGrid);
                $scope.nestedOptions.columnDefs = [
                    {name : 'Строительный номер' , width:'40%', field : 'structuralNumber', cellTemplate:'<div class="ui-grid-cell-contents"><a href="#' + '/unit/view/{{row.entity.id}}">{{row.entity[col.field]+" "+row.entity.zipCode}}</a> </div>'},
                    {name: 'Почтовый номер', width: '30%', field: 'postalNumber'},
                    {name: 'Количество этажей', width: '30%', field: 'floorCount'}
                ];

            }
        };

        $scope.newUnit= function(){
            $location.path('/unit/'+$scope.model.id+'/new');
        }

        $scope.toList = function(){
            $location.path('/house/view/'+$scope.house.id+'/1');
        };

        $scope.cancel = function(){
            if($scope.model.id){
                $location.path('/section/view/'+$scope.model.id);
            } else {
                $location.path('/house/view/'+$scope.house.id+'/1');
            }
        };

        $scope.toView = function (mdl) {
            var hash = '/section/view/' + mdl.id;
            $location.path(hash);
        };

    });



});