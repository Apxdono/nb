define(['../module','text!/views/table/deletedCell.html','../base/base-controller'], function (controllers,deletedTpl) {
    controllers.controller('CoopCtrl', function ($scope, $controller, $injector, Constants, CoopService) {
        $scope.factory = CoopService;
        $controller('BaseController', {$scope: $scope});
        $scope.path = Constants.coop.path;
        $scope.options.columnDefs = [
            {name: 'Название', width: '30%', field: 'name', sort: {direction: 'asc'}, cellTemplate: '<div class="ui-grid-cell-contents"><a href="#' + $scope.path + '/view/{{row.entity.id}}">{{row.entity[col.field]}}</a> </div>'},
            {name: 'Внутреннее имя', width: '30%', field: 'internalName'},
            {name: 'Председатель', width: '30%', field: 'chairman'},
            {name: 'Активна', width: '10%', minwidth:50, field: 'active', cellTemplate: deletedTpl}
        ];
        var cc = '';

        $scope.currentCurator = function(value){
            if(value != null){
                cc = value;
            }
            return cc;
        };
        $scope.addCurator = function(){
            if($scope.currentCurator() && $scope.currentCurator().length > 0){
                $scope.model.curators.push($scope.currentCurator());
                $scope.currentCurator('');
            }
        };
        $scope.removeCurator = function(index){
            $scope.model.curators.splice(index,1);
        };
        $scope.editCurator = function(index){
            $scope.currentCurator($scope.model.curators[index]);
            $scope.removeCurator(index);
        };
    });
});