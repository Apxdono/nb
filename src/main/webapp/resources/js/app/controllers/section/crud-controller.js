define(['../module','text!/views/table/deletedCell.html','../base/base-controller'], function (controllers,deletedTpl) {
    controllers.controller('SectionCtrl', function ($scope, $controller, $injector,$routeParams,$location, $http, Constants, Grids, SectionService) {
        $scope.factory = SectionService;
        $controller('BaseController', {$scope: $scope});
        $scope.path = Constants.section.path;
        var docId = $routeParams.house;
        $scope.model = {house : 'http://localhost:9000/rest/api/houses/'+docId};

        $scope.nestedOptions = angular.extend({},Grids.nestedGrid);
        $scope.nestedOptions.columnDefs = [
            {name : 'Строительный номер' , width:'40%', field : 'structuralNumber', cellTemplate:'<div class="ui-grid-cell-contents"><a href="#' + $scope.path + '/view/{{row.entity.id}}">{{row.entity[col.field]+" "+row.entity.zipCode}}}</a> </div>'},
            {name: 'Почтовый номер', width: '30%', field: 'postalNumber'},
            {name: 'Количество этажей', width: '30%', field: 'floorCount'}
        ];

        $scope.toList = function(){
                $location.path('/house/view/'+$scope.house.id+'/1');
        };

        $scope.cancel = function(){
            if($scope.model.id){
                $location.path('/section/view/'+$scope.model.id);
            } else {
                $location.path('/house/view/'+docId || $scope.house.id+'/1');
            }
        };

        $scope.toView = function (mdl) {
            var hash = '/section/view/' + mdl.id;
            $location.path(hash);
        };

        $scope.house = {};

        $scope.fetchSingle = function(data){
            $scope.model = data;
            $http.get($scope.model._links.house.href).success(function(data){
                $scope.house = data;
            });
            $http.get($scope.model["_links"].units.href).success(function(data){
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