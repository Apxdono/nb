define(['../module'], function (controllers) {
    'use strict';
    controllers.controller('UserController', function ($scope, UserService) {
        $scope.service = UserService;
        $scope.hasAnyRole = function(roles){
            if($scope.service.user != null){
                var res = $scope.service.user.roles.filter(function(n){
                    return roles.indexOf(n) !== -1;
                });
                return (res && res.length > 0) ? true : false;
            }
            return false;
        }
    });
});
