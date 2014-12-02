define(['../module','text!/views/table/deletedCell.html','../base/base-controller'], function (controllers,deletedTpl) {
    controllers.controller('HouseCtrl', function ($scope, $controller,$location, $injector,$routeParams, $http, Constants, Grids, HouseService) {
        $scope.factory = HouseService;
        $controller('BaseController', {$scope: $scope});
        $scope.path = Constants.house.path;
        $scope.options.columnDefs = [
            {name: 'Адрес', width: '30%', field: 'address', sort: {direction: 'asc'}, cellTemplate: '<div class="ui-grid-cell-contents"><a href="#' + $scope.path + '/view/{{row.entity.id}}">{{row.entity[col.field]+" "+row.entity.zipCode}}</a> </div>'},
            {name: 'Строительный номер', width: '30%', field: 'structuralNumber'},
            {name: 'Активна', width: '10%', minwidth:50, field: 'active', cellTemplate: deletedTpl}
        ];

        $scope.nestedOptions = angular.extend({},Grids.nestedGrid);
        $scope.nestedOptions.columnDefs = [
            {name : 'Строительный номер' , width:'40%', field : 'structuralNumber', cellTemplate:'<div class="ui-grid-cell-contents"><a href="#' + '/section/view/{{row.entity.id}}">{{row.entity[col.field]+" "+row.entity.zipCode}}</a> </div>'},
            {name: 'Почтовый номер', width: '30%', field: 'postalNumber'},
            {name: 'Количество этажей', width: '30%', field: 'floorCount'}
        ];

        $scope.newSection= function(){
            $location.path('/section/'+$scope.model.id+'/new');
        }

        $scope.tabIndex = parseInt($routeParams.index || 0);



        $scope.fetchSingle = function(data){
            $scope.model = data;
            $http.get($scope.model["_links"].sections.href).success(function(data){
                var dd = data["_embedded"]
                $scope.nestedOptions.data = [];
                if (dd) {
                    for (var prop in dd) {
                        if (dd.hasOwnProperty(prop)) {
                            angular.forEach(dd[prop], function (o, k) {
                                $scope.nestedOptions.data.push(o);
                            })
                        }

                    }
                }
            });
        };

    });

});