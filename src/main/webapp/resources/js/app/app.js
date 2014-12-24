define('app', ['angularAMD', 'angular-route','jquery','xtform','angular-local-storage','angular-ui-bootstrap', './controllers/index', './services/index','./directives/index'], function (angularAMD) {
    var app = angular.module("nova", ['ngRoute','xtForm','LocalStorageModule','nova.services','nova.controllers','nova.directives','ui.bootstrap']);
//    app.config(function($logProvider){ $logProvider.debugEnabled(false); $logProvider. });
    var $doc = $(document);
    var $body = $(document.body);


    app.directive('ngReallyClick', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('click', function() {
                    var message = attrs.ngReallyMessage;
                    if (message && confirm(message)) {
                        scope.$apply(attrs.ngReallyClick);
                    }
                });
            }
        }
    }]);
    return app;
});
