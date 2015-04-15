define([
    'angular',
    './controller-module',
    'angular-ui-bootstrap',
    './base-controller',
    './unit-booking-controller'
], function (angular, module) {
    module.register.controller('UnitCtrl',function($scope,$setup,$controller, $location, $log,Grids,$routeParams, RestService, Utils, Entity, $modal){

        $controller('BaseCtrl',{$scope:$scope,$setup:$setup});

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
                //$scope.model.client = data.getLink('self');
            }});

            $scope.model.getResource('section',{success : function(data){
                $scope.section = data;
                $scope.model.section = $scope.section.getLink('self');
            }});

        };

        $scope.doBooking = function(){
            var modalInstance = $modal.open({
                templateUrl : 'bookingModal.html',
                controller: 'UnitBookingModalCtrl',
                size: 'md',
                backdrop : true,
                resolve: {
                    client: function () {
                        return $scope.clientFound;
                    },
                    ClientService : function(){
                        return $scope.clientService;
                    }
                }
            });

            modalInstance.result.then(function(data){
                if(!!data && !!data.id){
                    $scope.clientFound = data;
                    $scope.model.booked = true;
                    $scope.model.client = data.getLink('self');
                } else {
                   $scope.cancelBooking();
                }
            }, function () {
                $log.debug('Booking canceled');
            });
        };


        $scope.cancelBooking = function(){
            $log.debug('Canceled booking');
            $scope.model.booked = false;
            $scope.clientFound = null;
            delete $scope.model.client;
            if($scope.model.getLink){
                $scope.clientService.deleteAssociation($scope.model.getLink('client'),function(){
                    $log.debug('Deleted client association')
                    $scope.api.read($routeParams.id,{success:function(data){
                        data.booked = false;
                        $scope.model = data;
                    }});
                },function(){
                    $log.debug('client association not present, nothing to delete');
                });
            }
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