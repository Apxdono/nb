define(['./../module'], function (directives) {
    directives.directive('postRender', [ '$timeout', function($timeout) {
        var def = {
            restrict : 'E',
            terminal : true,
            transclude : true,
            link : function(scope, element, attrs) {
                $timeout(function(){scope.init()}, 0);  //Calling a scoped method
            }
        };
        return def;
    }]);
});
