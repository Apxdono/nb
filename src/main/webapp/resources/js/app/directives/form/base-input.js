define(['./../module','text!/views/elements/form/baseInput.html'], function (directives,template) {
    directives.directive('baseInput', function () {
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
