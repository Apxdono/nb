define(['./../module','text!/views/elements/common/heading.html'], function (directives,template) {

    directives.directive('heading', ['$compile','$location',function ($compile,$location) {
        var dir = {
            restrict: 'E',
            replace:true,

            scope: {
                label: '@',
                icon: '@',
                href : '@',
                hasNext : '='
            },
            template: template
        };
        return dir;
    }]);
});
