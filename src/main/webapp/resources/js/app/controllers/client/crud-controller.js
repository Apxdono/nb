define(['../module', '../base/base-controller', 'text!/views/client/preCreateDialog.html', 'text!/views/table/deletedCell.html'], function (controllers, bc, dlgtemplate, deletedTpl) {
    controllers.controller('ClientCtrl', function ($scope, $controller, $location, $modal, Constants, ContactTypes, ClientService,ContactService) {
        $scope.factory = ClientService;
        $controller('BaseController', {$scope: $scope});
        $scope.path = Constants.client.path;
        $scope.options.columnDefs = [
            {name: 'ФИО/Название', field: 'name', sort: {direction: 'asc'}, cellTemplate: '<div class="ui-grid-cell-contents"><a href="#' + $scope.path + '/view/{{row.entity.id}}">{{row.entity[col.field]}}</a> </div>'},
            {name: 'Тип', field: 'type', cellTemplate: '<div class="ui-grid-cell-contents"><span>{{row.entity.type =="PRIVATE"? "Физ. лицо" : "Юр. лицо"}}</span> </div>'},
            {name: 'Запись активна', field: 'active', cellTemplate: deletedTpl}
        ];

        var resetContact = function(){
            $scope.contact = {};
            if($scope.model.id){
                $scope.contact.client = $scope.model._links.self.href;
            }
        };
        resetContact();

        ContactTypes.get(function (data) {
            $scope.ctypes = data;
        });
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
                template: dlgtemplate,
                scope: $scope,
                size: 'sm'
            });
        };
        $scope.model = {contacts : []};

        $scope.fetchSingle = function (data) {
            $scope.model = data;
            resetContact();
        };
        
        $scope.addContact = function () {
            if (!$scope.form2.$valid) {
                return;
            }

            $scope.model.contacts.push($scope.contact);
            resetContact();
        };

        $scope.deleteContact = function (contact) {
            $scope.model.contacts.splice($scope.model.contacts.indexOf(contact),1);
        }

        $scope.contactSort = function(a){
            return a.type.name==='CONTACT_PHONE' ? 0 : 1;
        }

    });
});