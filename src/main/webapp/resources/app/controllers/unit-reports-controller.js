define([
    'angular',
    './controller-module',
    'angular-ui-bootstrap'
], function (angular, module) {
    module.register.service('UnitReportsCtrl',function($log, $location, $window){

        var service = {
            reportParams : {

            },
            printReport : function(rid,params){
                $log.debug('priting report',rid,'with params', params);
                var paramString = this.toParams(params);
                $window.open('/user/reports/'+rid+ ( paramString != ''? '?'+paramString : '' ),'_blank')


                //$http({
                //    method : 'GET',
                //    url : '/user/reports/'+rid,
                //    params : params
                //}).then(function(d){
                //
                //})
            },
            toParams : function(obj){
                var str = "";
                for (var key in obj) {
                    if (str != "") {
                        str += "&";
                    }
                    str += key + "=" + encodeURIComponent(obj[key]);
                }
                return str;
            },
            initReportParams : function(){
                $window.loc = $location;
                $log.debug('location',$location)
                //this.reportParams.unit = this.model.id;
            }
        };
        return service;
    });



});