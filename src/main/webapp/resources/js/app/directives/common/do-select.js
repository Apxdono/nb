define(['./../module','text!/views/elements/common/heading.html'], function (directives,template) {

    directives.directive('doSelect', function () {

       var dir = {
            restrict: 'A',
            link : function(scope, element, attrs){
                var items = attrs.ngOptions.substring(attrs.ngOptions.indexOf(' in ')+4);
                scope.$watch(attrs.ngModel,function(n,o){
                    var index = 0;
                    angular.forEach(scope[items],function(t,k){
                        if(n && t.id === n.id){
                            index = k;
                            return false;
                        }
                    });
                    element.val(index);
                });
            }
        };
        return dir;
    });
});
