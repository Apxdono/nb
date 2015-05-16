define([
    'angular',
    './controller-module'
], function (angular, module,preCreateDialogTpl) {
    module.register.controller('CheckboradCtrl',function($scope, $log, RestService,Entity){

        $log.debug('initialized CheckboradCtrl ctrl');

        $scope.api = new RestService(Entity.house.entity);


        $scope.houseFound;
        $scope.sectionSelected;
        $scope.houseSections = [];
        $scope.houses = [];

        $scope.houseLabel = function(house){
            if( !house || !house.address) return ;
            var res = house.address + ' '+house.structuralNumber;
            return res;
        }

        $scope.getHouses = function(criteria){
            $scope.api.autocomplete({criteria : criteria},{success:function(data){
                while($scope.houses.pop()){};
                var d = $scope.api.embedded(data);
                for(var i =0; i < d.length; i++){
                    $scope.houses.push(d[i]);
                }
            }});
            return $scope.houses;
        };

        $scope.houseChange = function(house){
            if(!house || !house.id){
                $scope.clientFound = null;
                $scope.sectionSelected = null;
                $scope.houseSections = null;
            } else {
                house.getResource('sections',{
                    success : function(data){
                        $log.debug('sections found', data);
                        $scope.houseSections = $scope.api.embedded(data);
                    }
                })
            }
        };

        $scope.sectionChanged = function(){
            if($scope.sectionSelected && $scope.sectionSelected.id){
                $scope.sectionSelected.getResource('units',{
                    success : function(data){
                        $log.debug('units found', data);
                        $scope.units = $scope.api.embedded(data);
                        makeData();
                    }
                })
            }
        };



        function makeData(){
            var td = $scope.tableData = [];
            var spans = $scope.units.map(function(obj){return obj.span});
            var maxRoomCount = Math.max.apply(Math,$scope.units.map(function(o){return o.roomCount;}))
            for(var fc=0; fc < $scope.sectionSelected.floorCount+1; fc++){
                var cols = td[fc] = [];
                for(var sc=0;sc < spans.length; sc++){
                    var rows = cols[sc] = [];
                    for(var rc=1; rc < maxRoomCount+1; rc++){
                        var unit = rows[rc] = {};
                    }
                }
            }

            angular.forEach($scope.units, function (unit) {
                td[unit.floor][unit.span-1][unit.roomCount] = unit;
            });

            $log.debug('TABLE DATA READY', td);




        }



    });



});