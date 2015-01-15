define(['./service-module'], function (services) {
    services.factory('LoginService',function($rootScope,$http,authService,Events){
        var loggedIn = false;
        var service = {
            loggedIn : function(){
                return loggedIn;
            },
            user : {},
            doLogin : function(username,password,success,error){
                $http({method: 'POST',
                    url: '/login',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: {username: username, password: password},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    }
                }).success(function () {
                    authService.loginConfirmed();
                    service.getUserData();
                    if(success){
                        success.apply(this,arguments);
                    }
                }).error(function(){
                    if(error){
                        error.apply(this,arguments);
                    }
                });
            },
            getUserData : function(){
                if(isEmpty(service.user)){
                    $http.get('/user/get').success(function(data){
                        service.user = data;
                        loggedIn = true;
                        $rootScope.$broadcast(Events.userDataSuccess,data);
                    });
                }
            },
            doLogout : function(){
                $http.get('/logout').success(function(){
                    $rootScope.$broadcast(Events.loginRequired);
                });
            },

            clearState : function(){
                if(loggedIn){
                    service.user = {};
                    loggedIn = false;
                }
            }
        };
        $rootScope.$on(Events.loginRequired, function () {
            service.clearState();
        });
        service.getUserData();
        return service;
    })
});
