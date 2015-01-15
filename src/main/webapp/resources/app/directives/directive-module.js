define(['angular','jquery','angular-auth','../constants'], function (angular,$) {
    var directives = angular.module('nova.directives',['nova.constants']);
    directives.directive('authContainer', function (Events) {
        return {
            restrict: 'C',
            link: function (scope, elem, attrs) {
                elem.removeClass('waiting-for-angular');
                var login = $(elem.children()[0]);
                var main = $(elem.children()[1]);
                login.hide();
                scope.$on(Events.loginRequired, function () {
                    main.slideUp('slow');
                    login.slideDown('slow', function () {

                    });
                });
                scope.$on(Events.loggedIn, function () {
                    login.slideUp(function(){
                    });
                    main.slideDown('slow');
                });
            }
        }
    });
    return directives;
});