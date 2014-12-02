define(['../module','../base/base-controller'], function (controllers) {
    controllers.controller('UnitCtrl', function ($scope, $controller, $injector,$routeParams,$location,$timeout, $http, Constants,Func, Grids, SectionService, UnitService) {
        $scope.factory = UnitService;
        $controller('BaseController', {$scope: $scope});
        $scope.path = Constants.unit.path;

        $scope.section = {};

        $scope.getSection = function(){
            var sectionPromise = $routeParams.section ? SectionService.read($routeParams.section) : SectionService.getMe($scope.model._links.section.href);
            sectionPromise.success(function (data) {
                $timeout(function(){
                    $scope.section = data;
                    if($scope.action === 'new'){
                        $scope.model.section = $scope.section._links.self.href;
                    }
                });
            });
        };

        $scope.addNavCallback('new',function(){
            $scope.getSection();
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
            $scope.getSection();
        };

    });

});