define([
    'angular',
    './controller-module',
    'angular-ui-bootstrap',
], function (angular, module) {
    module.register.service('UnitPriceController',function($log, RestService){
        var pricesApi = new RestService('prices');
        var service = {
            prices : [],

            priceModel : {},
            format : 'dd.MM.yyyy',
            dateOptions : {
                formatYear: 'yyyy'
            },

            open : function($event,index) {
                $event.preventDefault();
                $event.stopPropagation();
                this['opened'+index] = true;
            },
            addPrice : function(){
                if(!this.formPrices.$valid) return;
                this.priceModel.parentUnit = this.model.getLink('self');
                var self = this;
                pricesApi.save(this.priceModel,{
                    success : function(data){
                        self.prices.push(data);
                        self.priceModel = {};
                    }
                },{
                    success : function(data){
                        self.prices.push(data);
                        self.priceModel = {};
                    }
                });
            },
            deletePrice : function(ind){
                $log.info('about to delete',this.prices[ind]);
                if(!ind && ind >= 0) return
                var self = this;

                pricesApi.destroy(self.prices[ind]).success(function(data){
                    self.prices.splice(ind,1);
                });
            }
        };
        return service;
    });



});