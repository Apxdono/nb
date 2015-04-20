define([
    'angular',
    './controller-module',
    'text!/views/client/preCreateDialog.html',
    './../services/contact-type-service',
    './base-controller'
], function (angular, module,preCreateDialogTpl) {
    module.register.controller('ClientCtrl',function($scope,$setup,$controller, $location, $log, $modal,RestService,Utils,Entity, ContactTypes){

        $controller('BaseCtrl',{$scope:$scope,$setup:$setup});
        $log.debug('initialized client ctrl');
        var dialog;

        $scope.initModel = function(){
            $scope.model.contacts = [];
        };

        var overrideApi = function(){
            var path = $scope.processedEntity.path;
            if($scope.action == 'new'){
                path = $location.path().indexOf('private') > 0 ? Entity.client.subtypes.PRIVATE : Entity.client.subtypes.COMPANY;
            } else if($scope.model.id) {
                path = Entity.client.subtypes[$scope.model.type];
            }
            $scope.api = new RestService(path);
        };

        $scope.addNavCallback('new',overrideApi);

        $scope.addNavCallback('view edit',function(){
            $scope.ctypes = ContactTypes.fetch();
        });

        var resetContact = function(){
            $scope.contact = {};
            if($scope.model.id){
                $scope.contact.client = $scope.model.getLink('self');
            }
        };

        $scope.singleReadCallback = function(){
            overrideApi();
            resetContact();
        };

        var modalController = function($scope){
            $scope.clientType = 'PRIVATE';

            $scope.modalOkay = function(){
                dialog.close();
                $log.debug('dialog closed',this);
                $location.path(Utils.makePath($scope.path,'new',this.clientType.toLowerCase()));
            };

            $scope.modalCancel = function(){
                dialog.dismiss('cancel');
            }
        };

        $scope.newClient = function () {
            dialog = $modal.open({
                template: preCreateDialogTpl,
                scope: $scope,
                size: 'sm',
                controller : modalController
            });
        };

        $scope.toEdit = function(){
            $location.path(Utils.makePath($scope.path,'edit',$scope.model.type.toLowerCase(),$scope.model.id));
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