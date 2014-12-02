define(['../module','text!/views/table/deletedCell.html','../base/base-controller'], function (controllers,deletedTpl) {
    controllers.controller('SectionCtrl', function ($scope, $controller, $injector,$routeParams,$location,$timeout, $http, Constants,Func, Grids,Share, HouseService, SectionService) {
        $scope.factory = SectionService;
        $controller('BaseController', {$scope: $scope});
        $scope.path = Constants.section.path;

        $scope.nestedOptions = angular.extend({},Grids.nestedGrid);
        $scope.nestedOptions.columnDefs = [
            {name : 'Строительный номер' , width:'40%', field : 'structuralNumber', cellTemplate:'<div class="ui-grid-cell-contents"><a href="#' + $scope.path + '/view/{{row.entity.id}}">{{row.entity[col.field]+" "+row.entity.zipCode}}}</a> </div>'},
            {name: 'Почтовый номер', width: '30%', field: 'postalNumber'},
            {name: 'Количество этажей', width: '30%', field: 'floorCount'}
        ];

        $scope.house = Share.get("selectedHouse");

        $scope.newUnit = function () {
            $location.path('/unit/' + $scope.model.id + '/new');
        }

        $scope.getHouse = function(){
            var housePromise = $routeParams.house ? HouseService.read($routeParams.house) : HouseService.getMe($scope.model._links.house.href);
            housePromise.success(function (data) {
                $timeout(function(){
                    $scope.house = data;
                    $scope.tabIndex = parseInt($routeParams.index || 0);
                    if($scope.action === 'new'){
                        $scope.model.house = $scope.house._links.self.href;
                    }
                });
            });
        }

        $scope.addNavCallback('new',function(){
            $scope.getHouse();
        });


        $scope.toList = function(){
                $location.path('/house/view/'+$scope.house.id+'/1');
        };

        $scope.cancel = function(){
            if($scope.model.id){
                $location.path('/section/view/'+$scope.model.id);
            } else {
                $scope.toList();
            }
        };

        $scope.fetchSingle = function(data){
            $scope.model = data;
            $scope.getHouse();
            $http.get($scope.model["_links"].units.href).success(function(data){
                $timeout(function(){
                    if(!Func.isEmpty(data)){
                        var dd = data["_embedded"]
                        $scope.nestedOptions.data = dd['units'] || [];
                    }

                },0);
            });
        };

    });

});