(function () {
    'use strict';
    angular.module('test', ['ngRoute',
        'http-auth-interceptor'
    ]).config(function ($routeProvider) {
        $routeProvider.
            when('/', {controller:'MainCtrl'}).otherwise({redirectTo: '/'});
    })
        .directive('authDemoApplication', function () {
            return {
                restrict: 'C',
                link: function (scope, elem, attrs) {
                    //once Angular is started, remove class:
                    elem.removeClass('waiting-for-angular');

                    var login = $(elem.find('div')[0]);
                    var main = $(elem.find('div')[1]);

                    login.hide();

                    scope.$on('event:auth-loginRequired', function () {
                        main.slideUp('slow');
                        login.slideDown('slow', function () {

                        });
                    });
                    scope.$on('event:auth-loginConfirmed', function () {
                        login.slideUp(function(){
                        });
                        main.slideDown('slow');

                    });
                }
            }
        }).controller("MainCtrl", function ($scope, $log, $http) {
            var self = this;
            this.getSpec = function () {
                $http.get('/rest/api').success(function (data) {
                    $log.info("user found ", data, arguments);
                })
            };

            this.logout = function () {
                $http.get('/logout').success(function () {
                    self.getSpec();
                });
            };
            self.getSpec();
        }).controller("LoginCtrl", function ($scope, $log, $http, authService) {
            var self = this;
            this.submitForm = function () {
                $http({method: 'POST',
                    url: '/login',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: {username: self.username, password: self.password},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    }
                }).success(function (data) {
                    authService.loginConfirmed();
                });
            }
        });
    ;
})();