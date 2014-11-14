'use strict';
/* Controllers */
angular.module('nova.controllers').
    controller('UnitTypesCtrl', function ($scope, $controller, $injector, Constants, UnitTypeService) {
        $scope.factory = UnitTypeService;
        $controller('BaseController', {$scope: $scope});
        $scope.path = Constants.unitType.path;
        $scope.options.columnDefs = [
            {name: 'Название', field: 'name', sort: {direction: 'asc'}, cellTemplate: '<div class="ui-grid-cell-contents"><a href="#' + $scope.path + '/view/{{row.entity.id}}">{{row.entity[col.field]}}</a> </div>'},
            {name: 'Внутреннее имя', field: 'internalName'},
            {name: 'Активно', field: 'active', cellTemplate: '<div class="ui-grid-cell-contents">{{!row.entity[col.field]?"Да":"Нет"}}</div>'}
        ];
//        $scope.init()
    }).controller('CoopCtrl', function ($scope, $controller, Constants, CoopService) {
        $scope.factory = CoopService;
        $controller('BaseController', {$scope: $scope});
        $scope.path = Constants.coop.path;
        $scope.options.columnDefs = [
            {name: 'Название', field: 'name', sort: {direction: 'asc'}, cellTemplate: '<div class="ui-grid-cell-contents"><a href="#' + $scope.path + '/view/{{row.entity.id}}">{{row.entity[col.field]}}</a> </div>'},
            {name: 'Внутреннее имя', field: 'internalName'},
            {name: 'Председатель', field: 'chairman'},
            {name: 'Активно', field: 'active', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity[col.field]?"Да":"Нет"}}</div>'}
        ];
    }).controller('ClientCtrl', function ($scope, $controller, $location, $modal, Constants, ngDialog, ClientService) {
        $scope.factory = ClientService;
        $controller('BaseController', {$scope: $scope});
        $scope.path = Constants.client.path;
        $scope.options.columnDefs = [
            {name: 'ФИО/Название', field: 'name', sort: {direction: 'asc'}, cellTemplate: '<div class="ui-grid-cell-contents"><a href="#' + $scope.path + '/view/{{row.entity.id}}">{{row.entity[col.field]}}</a> </div>'},
            {name: 'Тип', field: 'type', cellTemplate: '<div class="ui-grid-cell-contents"><span>{{row.entity.type =="PRIVATE"? "Физ. лицо" : "Юр. лицо"}}</span> </div>'},
            {name: 'Запись активна', field: 'active', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity[col.field]?"Да":"Нет"}}</div>'}
        ];

        $scope.dialog;
        $scope.toNew = function () {
            $scope.dialog.close();
            var hash = $scope.path + '/new';
            if (this.clientType) {
                if (this.clientType == 'PRIVATE') {
                    hash = hash + '/private';
                } else {
                    hash = hash + '/company';
                }
                $location.path(hash);
            }
        };
        $scope.toEdit = function () {
            var hash = $scope.path + '/edit';
            if ($scope.model.type) {
                if ($scope.model.type == 'PRIVATE') {
                    hash = hash + '/private';
                } else {
                    hash = hash + '/company';
                }
                hash = hash + '/' + $scope.model.id;
                $location.path(hash);
            }
        };

        $scope.newClient = function () {
            $scope.dialog = $modal.open({
                templateUrl: '/views/client/preCreateDialog.html',
                scope: $scope,
                size: 'sm'
            });
        };


    });