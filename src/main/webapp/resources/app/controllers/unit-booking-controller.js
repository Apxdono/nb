define([
    'angular',
    './controller-module',
    'angular-ui-bootstrap',
], function (angular, module) {
    module.register.controller('UnitBookingModalCtrl',function($scope,$modalInstance, $log,ClientService, client){

        $log.debug('initialized unit booking ctrl');
        $scope.clientsAC = [];

        $scope.clientFound = client && client.id ? client : null;

        $scope.clientLabel = function(client){
            if( !client || !client.name) return ;
            var res = client.name;
            if(client.type && client.type === 'COMPANY'){
                res = res + ' ( Юр. лицо ) ';
            } else {
                res = res + ' ( Физ. лицо ) ';
            }
            return res;
        }

        $scope.getClients = function(criteria){
            ClientService.autocomplete({criteria : criteria},{success:function(data){
                while($scope.clientsAC.pop()){};
                var d = ClientService.embedded(data);
                for(var i =0; i < d.length; i++){
                    $scope.clientsAC.push(d[i]);
                }
            }});
            return $scope.clientsAC;
        };

        $scope.clientChange = function(client){
            if(!client || !client.id){
                $scope.clientFound = null;
            }
        };

        $scope.okModal = function () {
            $modalInstance.close($scope.clientFound);
        };

        $scope.cancelModal = function () {
            $modalInstance.dismiss('cancel');
        };
    });



});