define(['./../module','text!/views/elements/form/baseInputRequired.html'], function (directives,template) {
    directives.directive('baseInputRequired', function () {
        return {
            restrict: 'E',
            replace:true,
            scope: {
                field: '@',
                model:'=',
                label: '@',
                type : '@',
                labelSpan : '@',
                inputSpan: '@',
                noGroup : '='
            },
            template: template
        }

    });
});
