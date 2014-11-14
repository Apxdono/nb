define(['../module','../base/base-controller'], function (controllers) {
    controllers.controller('UnitTypesCtrl', function ($scope, $controller, $injector, Constants, UnitTypeService) {
        $scope.factory = UnitTypeService;
        $controller('BaseController', {$scope: $scope});
        $scope.path = Constants.unitType.path;
        $scope.options.columnDefs = [
            {name: 'Название', field: 'name', sort: {direction: 'asc'}, cellTemplate: '<div class="ui-grid-cell-contents"><a href="#' + $scope.path + '/view/{{row.entity.id}}">{{row.entity[col.field]}}</a> </div>'},
            {name: 'Внутреннее имя', field: 'internalName'},
            {name: 'Активно', field: 'active', cellTemplate: '<div class="ui-grid-cell-contents">{{!row.entity[col.field]?"Да":"Нет"}}</div>'}
        ];
    })
});