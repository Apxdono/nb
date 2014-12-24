define(['app'], function (app) {
    app.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('novaStorage');
        // localStorageServiceProvider.setStorageCookieDomain('example.com');
        // localStorageServiceProvider.setStorageType('sessionStorage');
    }]);
});