define([
    'angular',
    './controller-module',
    '../services/rest-service'

    ], function (angular,module) {
    module.controller("MainCtrl", function ($scope, $log, LoginService,Events,RestService) {
        var self = this;
        self.loggedIn = false;
        self.user = {};
        self.errorMessage = null;
        this.getSpec = function () {
            $http.get('/rest/api').success(function (data) {
                $log.info("user found ", data, arguments);
            })
        };

        this.logout = function () {
            LoginService.doLogout();
        };

        this.submitLogin = function(){
            LoginService.doLogin(self.username,self.password,null,function(err){
                $log.info(arguments);
                if(err && err.status === 406 && err.message == 'Bad credentials'){
                    self.errorMessage = 'Неверный логин/пароль';
                }
            });
        }

        this.hasRole = function(r){
            return !isEmpty(self.user) && self.user.roles.indexOf(r) > -1;
        }

        $scope.api = RestService('unitTypes');
        $scope.api.gridResult({name : ''},{success : function(data){
            $scope.unitTypes = $scope.api.embedded(data);
        }});

        $scope.$on(Events.userDataSuccess,function(md,data){
            self.user = data;
            self.loggedIn = true;
            self.errorMessage = null;
        });

        $scope.$on(Events.loginRequired,function(){
            self.user = {};
            self.loggedIn = false;
            self.errorMessage = null;
        });

    })
});