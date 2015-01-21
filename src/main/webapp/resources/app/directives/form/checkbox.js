define(['./../directive-module','text!/views/elements/form/baseCheckbox.html'], function (directives,template) {
    directives.directive('checkbox', function () {
        return {
            restrict: 'E',
            replace:true,
            scope: {
                field: '@',
                model:'=',
                label: '@'
            },
            template : template
        }

    });
});
