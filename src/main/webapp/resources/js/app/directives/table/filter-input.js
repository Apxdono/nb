define(['./../module','text!/views/elements/table/filterInput.html'], function (directives,template) {
    directives.directive('filterInput', function () {
        return {
            restrict: 'E',
            replace:true,
            scope: {
                field: '@',
                options:'=',
                label: '@'
            },
            template : template
        };
    });
});
