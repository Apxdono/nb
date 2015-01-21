define(['./../directive-module','text!/views/elements/form/viewCheckbox.html'], function (directives,template) {
    directives.directive('viewCheckbox', function () {
        return {
            restrict: 'E',
            replace:true,
            scope: {
                value:'=',
                label: '@'
            },
            template : template
        }

    });
});
