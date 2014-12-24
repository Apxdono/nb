define(['../module', '../base/base-controller'], function (controllers) {
    controllers.controller('UnitCtrl', function ($scope, $controller, $injector, $routeParams, $location, $timeout, $http, Constants, Func, Grids, Share,ClientService, SectionService, UnitService, UnitTypeService) {
        $scope.factory = UnitService;
        $controller('BaseController', {$scope: $scope});
        $scope.path = Constants.unit.path;
        $scope.model = {};
        $scope.house = Share.getShared("selectedHouse");
        $scope.section = Share.getShared("selectedSection");
        $scope.types = [];

        function getTypes() {
            UnitTypeService.active().success(function (data) {
                if (data["_embedded"]) {
                    $scope.types = data["_embedded"]["unitTypes"];
                }
            });
        };


        var Areas = function () {
            return {
                WHOLE: 0,
                HABITABLE: 0,
                MBTI: 0,
                ACTUAL: 0
            }
        };

        $scope.clientFound = null;

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

        $scope.clients = function(criteria){
            return ClientService.autocomplete(criteria).then(function(data){
                var result = [];
                var dd = data.data["_embedded"]
                if (dd) {
                    for (var prop in dd) {
                        if (dd.hasOwnProperty(prop)) {
                            angular.forEach(dd[prop], function (o, k) {
                                result.push(o);
                            });
                        }
                    }
                }
                return result;
            })
        }

        function watchClient(){
            $scope.$watch('clientFound',function(n,o){
                if(Func.isEmpty(n) || typeof n === 'string'){
                    return;
                }
                $scope.model.client  = $scope.clientFound._links.self.href;
            });
        }


        $scope.$watch('section', function (n, o) {
            if (Func.isEmpty(n)) {
                return
            }
            $scope.model.section = $scope.section._links.self.href;
        });

        $scope.attachSection = function () {
            if (!$scope.section) {
                SectionService.getMe($scope.model._links.section.href).success(function (data) {
                    $scope.section = data;
                    Share.add("selectedSection", data);
                    SectionService.getMe(data._links.house.href).success(function (hdata) {
                        $scope.house = hdata;
                        Share.add("selectedHouse", hdata);
                    })
                });
            }
        };


        $scope.findClient = function () {
            if (!$scope.clientFound) {
                ClientService.getMe($scope.model._links.client.href).success(function (data) {
                    $scope.clientFound = data;
                });
            }
        };

        $scope.addNavCallback('new', function () {
            if (!$scope.section) {
                $location.path('/');
            }
            $scope.model.areas = new Areas();
            watchClient();
        });

        $scope.addNavCallback('edit',watchClient);

        $scope.toList = function () {
            $location.path('/section/view/' + $scope.section.id + '/1');
        };

        $scope.cancel = function () {
            if ($scope.model.id) {
                $location.path('/unit/view/' + $scope.model.id);
            } else {
                $scope.toList();
            }
        };

        $scope.addNavCallback('new', getTypes);
        $scope.addNavCallback('edit',getTypes);

        $scope.fetchSingle = function (data) {
            $scope.model = data;
            $scope.attachSection();
            $scope.findClient();
        };

    });

});