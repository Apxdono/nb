define(['./../module','text!/views/elements/common/newSearch.html'], function (directives,template) {
    directives.directive('newSearch', function () {
        return {
            restrict: 'E',
            replace:true,
            template : template
        }

    });
});
