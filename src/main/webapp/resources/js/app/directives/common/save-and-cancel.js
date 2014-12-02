define(['./../module','text!/views/elements/common/saveCancel.html'], function (directives, template) {
    directives.directive('saveCancel', function () {
        return {
            restrict: 'E',
            replace: true,
            template: template
        }

    });
});
