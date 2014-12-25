define(['../module', 'text!/views/table/deletedCell.html', '../base/base-controller'], function (controllers, deletedTpl) {
    controllers.controller('HouseCtrl', function ($scope, $controller, $location, $injector, $routeParams, $timeout, $http, Constants, Func, Share, Grids, CoopService, HouseService) {
        $scope.factory = HouseService;
        $controller('BaseController', {$scope: $scope});
        $scope.path = Constants.house.path;
        $scope.options.columnDefs = [
            {name: 'Адрес', width: '30%', field: 'address', sort: {direction: 'asc'}, cellTemplate: '<div class="ui-grid-cell-contents"><a href="#' + $scope.path + '/view/{{row.entity.id}}">{{row.entity[col.field]+" "+row.entity.zipCode}}</a> </div>'},
            {name: 'Строительный номер', width: '30%', field: 'structuralNumber'},
            {name: 'Активна', width: '10%', minwidth: 50, field: 'active', cellTemplate: deletedTpl}
        ];

        $scope.nestedOptions = angular.extend({}, Grids.nestedGrid);
        $scope.nestedOptions.columnDefs = [
            {name: 'Строительный номер', width: '40%', field: 'structuralNumber', cellTemplate: '<div class="ui-grid-cell-contents"><a href="#' + '/section/view/{{row.entity.id}}">Секция {{row.entity[col.field]}}</a> </div>'},
            {name: 'Почтовый номер', width: '30%', field: 'postalNumber'},
            {name: 'Количество этажей', width: '30%', field: 'floorCount'}
        ];

        $scope.newSection = function () {
            $location.path('/section/' + $scope.model.id + '/new');
        }

        $scope.tabIndex = parseInt($routeParams.index || 0);

        $scope.coops = [];
        $scope.selectedCoop;

        function getCoops() {
            UnitTypeService.active().success(function (data) {
                if (data["_embedded"]) {
                    $scope.types = data["_embedded"]["unitTypes"];
                }
            });
        };


        $scope.getCoops = function(){
            CoopService.active().success(function (data) {
                $scope.coops = data["_embedded"]["cooperatives"];
                $timeout(function () {
                    $scope.model.cooperative = $scope.selectedCoop ?$scope.selectedCoop._links.self.href : $scope.coops[0]._links.self.href;
                },0);
            });
        };


        $scope.addNavCallback('new',function(){
            $scope.getCoops();
        });
        $scope.addNavCallback('edit',function(){
            $scope.getCoops();
        });


        $scope.fetchSingle = function (data) {
            $scope.model = data;
            Share.add("selectedHouse",$scope.model);
            $scope.model.cooperative = "";
            CoopService.getMe($scope.model._links.cooperative.href).success(function (data) {
                $timeout(function () {
                    $scope.selectedCoop = data;
                    $scope.model.cooperative = $scope.selectedCoop._links.self.href;
                },0);
            });

            $http.get($scope.model["_links"].sections.href).success(function (data) {
                $timeout(function(){
                    if(!Func.isEmpty(data)){
                        var dd = data["_embedded"]
                        $scope.nestedOptions.data = dd['sections'] || [];
                    }
                },0);
            });
        };

    });

});