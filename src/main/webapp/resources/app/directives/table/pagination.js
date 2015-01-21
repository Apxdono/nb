define(['./../directive-module','text!/views/elements/table/paging.html'], function (directives,template) {
    directives.directive('paging', function () {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            template: template
        }

    })
});
