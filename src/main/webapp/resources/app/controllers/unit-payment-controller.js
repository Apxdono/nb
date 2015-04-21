define([
    'angular',
    './controller-module',
    'angular-ui-bootstrap'
], function (angular, module) {
    module.register.service('UnitPaymentController',function($log, RestService){
        var pricesApi = new RestService('payments');
        var service = {
            payments : [],
            paymentsLoaded : false,
            planModel : {  },
            getPayments : function(){
                var self = this;
                self.model.getResource('payments',{
                    success : function(d){
                        self.paymentsLoaded = true;
                        $log.debug('loaded payments',d);
                        self.payments = pricesApi.embedded(d);
                    },
                    error : function(d){
                        self.paymentsLoaded = true;
                    }
                })
            },

            savePayments : function(){
                var self = this;
                if(self.paymentsLoaded && self.payments.length > 0){
                    pricesApi.batchSave(self.payments,{
                        success : function(d){
                            $log.debug('saved payments',d);
                            self.payments = d;
                        },
                        error : function(){
                            $log.debug('didnt save payements',arguments);
                        }
                    })
                }
            },

            cancelPayments :function(){
                this.getPayments();
            },
            generatePlan : function(){
                if( this.formPayments.$valid){
                    $log.debug("form is valid");
                    var d;
//                    this.payments.push(this.newPayment(d,this.planModel.singlePayment));

                    for(var k = 0; k < (this.planModel.paymentCount-1); k++){
                        d = this.nextDate(d);
                        this.payments.push(this.newPayment(d,this.planModel.singlePayment));
                    }
                    this.payments.push(this.newPayment(this.planModel.endDate, this.model.startingPrice - (this.planModel.singlePayment*this.planModel.paymentCount-1)));

                } else {
                    $log.debug("form is invalid");
                }
            },
            newPayment : function(date,sum){
                return {
                    payDay : date,
                    amount : sum,
                    unit : this.model.getLink('self'),
                    client : this.clientFound.getLink('self')
                }
            },
            nextDate : function(date,offset){
                if(!date) {
                    return new Date(this.planModel.startDate);
                }
                var nd = new Date(date);
                switch (offset){
                    case 'week':
                        nd.setDate(date.getDate()+7);
                        return nd;
                    case 'quarter':
                        nd.setMonth(date.getMonth()+3);
                        return nd;
                    case 'sixmonth':
                        nd.setMonth(date.getMonth()+6);
                        return nd;
                    case 'year':
                        nd.setMonth(date.getMonth()+12);
                        return nd;
                    default :
                        nd.setMonth(date.getMonth()+1);
                        return nd;
                }
            }

        };
        return service;
    });



});