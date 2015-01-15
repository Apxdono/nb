try{
    (function (window) {
        window.isEmpty =  function (obj) {
            if (!obj) return true;
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }
            return true;
        };

        window.require.config({

            //  псевдонимы и пути используемых библиотек и плагинов
            paths: {
                'text' : '/webjars/requirejs-text/2.0.10-2/text',
                'jquery': '/webjars/jquery/1.9.1/jquery.min',
                'bootstrap': '/webjars/bootstrap/3.0.0/js/bootstrap',
                'angular': '/webjars/angularjs/1.3.0/angular',
                'angularAMD' : '/resources/js/lib/angular-amd',
                'angular-auth' : '/webjars/angular-http-auth/1.2.1/http-auth-interceptor',
                'angular-route': '/webjars/angularjs/1.3.0/angular-route',
                'angular-local-storage': '/webjars/angular-local-storage/0.1.5/angular-local-storage',
                'angular-ui-bootstrap': '/webjars/angular-ui-bootstrap/0.12.0/ui-bootstrap',
                'angular-ui-bootstrap-tpls': '/webjars/angular-ui-bootstrap/0.12.0/ui-bootstrap-tpls',
                'russian-locale': '/resources/js/lib/russian-locale',
                'ui-grid': '/webjars/ui-grid/3.0.0-rc.11/ui-grid',
                'xtform': '/resources/js/lib/xtform'
            },

            // angular не поддерживает AMD из коробки, поэтому экспортируем перменную angular в глобальную область
            shim: {
                'bootstrap' : { deps : ['jquery'] },
                'angular': {
                    exports: 'angular'
                },
                'angularAMD': ['angular'],
                'angular-route' : ['angular'],
                'angular-local-storage' : ['angular'],
                'angular-ui-bootstrap' : ['angular','angular-ui-bootstrap-tpls','russian-locale'],
                'angular-ui-bootstrap-tpls' : ['angular'],
                'ui-grid' : ['angular'],
                'angular-auth' : ['angular'],
                'xtform' : {
                    deps : ['angular','bootstrap']
                }
            },

            // запустить приложение
            deps: ['app']
        });
    })(window);
} finally {

}