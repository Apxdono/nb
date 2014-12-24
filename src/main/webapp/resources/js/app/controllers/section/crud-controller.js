define(['../module','text!/views/table/deletedCell.html','text!/views/unit/rowTemplate.html','../base/base-controller'], function (controllers,deletedTpl,rowTemplate) {
    controllers.controller('SectionCtrl', function ($scope, $controller, $injector,$routeParams,$location,$timeout, $http, Constants,Func, Grids,Share, HouseService, SectionService) {
        $scope.factory = SectionService;
        $controller('BaseController', {$scope: $scope});
        $scope.path = Constants.section.path;

        $scope.nestedOptions = angular.extend({},Grids.nestedGrid);
        $scope.nestedOptions.rowTemplate = rowTemplate;
        $scope.nestedOptions.columnDefs = [
            {name : 'Строительный номер' , width:'40%', field : 'structuralNumber', cellTemplate:'<div class="ui-grid-cell-contents"><a href="#' + '/unit/view/{{row.entity.id}}">{{row.entity[col.field]+" "+row.entity.zipCode}}</a> </div>'},
            {name: 'Почтовый номер', width: '30%', field: 'postalNumber'},
            {name: 'Количество этажей', width: '30%', field: 'floorCount'}
        ];
        $scope.model = {};
        $scope.tabIndex = parseInt($routeParams.index || 0);

        $scope.$watch('house',function(n,o){
            if(Func.isEmpty(n)){
                return
            }
            $scope.model.house = $scope.house._links.self.href;
        });

        $scope.house = Share.getShared("selectedHouse");


        $scope.attachHouse = function(){
            if(!$scope.house){
                HouseService.getMe($scope.model._links.house.href).success(function(data){
                    $scope.house = data;
                    Share.add("selectedHouse",data);
                });
            }
        };

        $scope.addNavCallback('new', function () {
            if(!$scope.house){
                $location.path('/');
            }
        });

        $scope.newUnit = function () {
            $location.path('/unit/' + $scope.model.id + '/new');
        }

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
            $scope.attachHouse();
            Share.add("selectedSection", $scope.model);
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