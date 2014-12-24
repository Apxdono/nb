define(['../module', './crud-controller'], function (controllers) {
    controllers.controller('UnitPriceController',function($scope,$log,Func,PriceService){
        $log.info('Controller for prices initialized');
        $log.info('parent',$scope.$parent);

        var pricesUrl = null;
        $scope.prices = [];
        $scope.$parent.$watch('model._links',function(n,o){
            if(n){
                pricesUrl = $scope.$parent.model._links['prices'].href;
                PriceService.getMe(pricesUrl).success(function(data){
                    Func.copyHalData($scope.prices,data);
                });
            }
        });

        $scope.dateOptions = {
            formatYear: 'yyyy'
        };

        $scope.open = function($event,index) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope['opened'+index] = true;
        };


        $scope.addPrice = function(){
            if(!$scope.formPrices.$valid) return;
            $scope.model.parentUnit = $scope.$parent.model._links.self.href;
            PriceService.create($scope.model).success(function(data){
                $scope.prices.push(data);
                $scope.model = {};
            });
        };

        $scope.deletePrice = function(ind){
            $log.info('about to delete',$scope.prices[ind]);
            PriceService.destroy($scope.prices[ind]).success(function(data){
                $scope.prices.splice(ind,1);
            });
        };

        $scope.model ={};

        $scope.format = 'dd.MM.yyyy';

    });
});