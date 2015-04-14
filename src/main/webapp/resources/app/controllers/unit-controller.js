define([
    'angular',
    './controller-module',
    'angular-ui-bootstrap',
    './base-controller'
], function (angular, module) {
    module.register.controller('UnitCtrl',function($scope,$controller, $location, $log,Grids,$routeParams, RestService, Utils, Entity){

        $controller('BaseCtrl',{$scope:$scope});
        $log.debug('initialized unit ctrl');
        var sectionService = new RestService(Entity.section.entity);
        var unitTypeService = new RestService(Entity.unitType.entity);
        $scope.clientService = new RestService(Entity.client.entity);

        $scope.tabIndex = parseInt($routeParams.index || 0);

        $scope.addNavCallback('new view edit',function(){
            $scope.unitTypes = unitTypeService.active();
        })

        $scope.addNavCallback('new',function(){
            sectionService.read($routeParams.section,{success : function(data){
                $scope.section = data;
                $scope.model.section = $scope.section.getLink('self');
            }});
        });

        $scope.singleReadCallback = function(){

            $scope.model.getResource('client',{success : function(data){
                $scope.clientFound = data;
                $scope.model.client = data.getLink('self');
            }});

            $scope.model.getResource('section',{success : function(data){
                $scope.section = data;
                $scope.model.section = $scope.section.getLink('self');
            }});

        };


        $scope.clientsAC = [];

        $scope.clientLabel = function(client){
            if( !client || !client.name) return ;
            var res = client.name;
            if(client.type && client.type === 'COMPANY'){
                res = res + ' ( Юр. лицо ) ';
            } else {
                res = res + ' ( Физ. лицо ) ';
            }
            return res;
        }

        $scope.getClients = function(criteria){
            $scope.clientService.autocomplete({criteria : criteria},{success:function(data){
                while($scope.clientsAC.pop()){};
                var d = $scope.api.embedded(data);
                for(var i =0; i < d.length; i++){
                    $scope.clientsAC.push(d[i]);
                }
            }});
            return $scope.clientsAC;
        };


        $scope.clientChange = function(client){
            if(!!client && !!client.id){
                $scope.model.client = client.getLink('self');
            } else {
                delete $scope.model.client;
            }
        };



        $scope.toList = function(){
            $location.path('/section/view/'+$scope.section.id+'/1');
        };

        $scope.cancel = function(){
            if($scope.model.id){
                $location.path('/unit/view/'+$scope.model.id);
            } else {
                $location.path('/section/view/'+$scope.section.id+'/1');
            }
        };

        $scope.toView = function (mdl) {
            var hash = '/unit/view/' + mdl.id;
            $location.path(hash);
        };

    });



});