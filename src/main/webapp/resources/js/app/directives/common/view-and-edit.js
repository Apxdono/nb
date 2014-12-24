define(['./../module','text!/views/elements/common/viewEdit.html'], function (directives,template) {
    directives.directive('viewEdit', function () {
        return {
            restrict: 'E',
            replace:true,
            template : template
        }

    });
});
