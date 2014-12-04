define(['../module','../base/base-controller'], function (controllers) {
    controllers.controller('UnitCtrl', function ($scope, $controller,  $injector,$routeParams,$location,$timeout, $http, Constants,Func, Grids,Share, SectionService, UnitService) {
        $scope.factory = UnitService;
        $controller('BaseController', {$scope: $scope});
        $scope.path = Constants.unit.path;
        $scope.model = {};
        $scope.house = Share.getShared("selectedHouse");
        $scope.section = Share.getShared("selectedSection");

        var Areas = function(){
            return {
                WHOLE : 0,
                HABITABLE : 0,
                MBTI : 0,
                ACTUAL:0
            }
        };


        $scope.$watch('section',function(n,o){
            if(Func.isEmpty(n)){
                return
            }
            $scope.model.section = $scope.section._links.self.href;
        });

        $scope.attachSection = function(){
            if(!$scope.section){
                SectionService.getMe($scope.model._links.section.href).success(function(data){
                    $scope.section = data;
                    Share.add("selectedSection",data);
                    SectionService.getMe(data._links.house.href).success(function(hdata){
                        $scope.house = hdata;
                        Share.add("selectedHouse",hdata);
                    })
                });
            }
        };

        $scope.addNavCallback('new', function () {
            if(!$scope.section){
                $location.path('/');
            }
            $scope.model.areas = new Areas();
        });

        $scope.toList = function(){
                $location.path('/section/view/'+$scope.section.id+'/1');
        };

        $scope.cancel = function(){
            if($scope.model.id){
                $location.path('/unit/view/'+$scope.model.id);
            } else {
                $scope.toList();
            }
        };

        $scope.fetchSingle = function(data){
            $scope.model = data;
            $scope.attachSection();

        };

    });

});