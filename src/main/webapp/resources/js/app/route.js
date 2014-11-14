define(['app','angular','./services/constants'], function (app,angular) {
    app.config(function ($routeProvider) {
        var consts = angular.injector(['nova.services']).get('Constants');
        angular.forEach(consts, function (object, key) {
            $routeProvider.when(object.path + '/list', { templateUrl: '/views' + object.path + '/list.html', controller: object.controller});
            $routeProvider.when(object.path + '/new', { templateUrl: '/views' + object.path + '/form.html', controller: object.controller});
            $routeProvider.when(object.path + '/view/:id', { templateUrl: '/views' + object.path + '/view.html', controller: object.controller});
            $routeProvider.when(object.path + '/edit/:id', { templateUrl: '/views' + object.path + '/form.html', controller: object.controller});
        });
        $routeProvider.when('/client/new/private', { templateUrl: '/views/client/formPrivate.html', controller: 'ClientCtrl'});
        $routeProvider.when('/client/new/company', { templateUrl: '/views/client/formCompany.html', controller: 'ClientCtrl'});
        $routeProvider.when('/client/edit/private/:id', { templateUrl: '/views/client/formPrivate.html', controller: 'ClientCtrl'});
        $routeProvider.when('/client/edit/company/:id', { templateUrl: '/views/client/formCompany.html', controller: 'ClientCtrl'});
        $routeProvider.otherwise({redirectTo: '/'});
    })
});