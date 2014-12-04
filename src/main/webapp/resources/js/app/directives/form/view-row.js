define(['./../module','text!/views/elements/form/viewRow.html'], function (directives,template) {
    directives.directive('viewRow', function () {
        return {
            restrict: 'E',
            replace:true,
            scope: {
                value:'=',
                label: '@',
                labelSpan : '@',
                valueSpan: '@',
                noGroup: '='
            },
            template :template
        }

    });
});
