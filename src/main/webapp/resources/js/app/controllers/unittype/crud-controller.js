define(['../module','text!/views/table/deletedCell.html','../base/base-controller'], function (controllers,deletedTpl) {
    controllers.controller('UnitTypesCtrl', function ($scope, $controller, $injector, Constants, UnitTypeService) {
        $scope.factory = UnitTypeService;
        $controller('BaseController', {$scope: $scope});
        $scope.path = Constants.unitType.path;
        $scope.options.columnDefs = [
            {name: 'Название', field: 'name', sort: {direction: 'asc'}, cellTemplate: '<div class="ui-grid-cell-contents"><a href="#' + $scope.path + '/view/{{row.entity.id}}">{{row.entity[col.field]}}</a> </div>'},
            {name: 'Сокращение', field: 'internalName'},
            {name: 'Активно', field: 'active', cellTemplate: deletedTpl}
        ];
    })
});