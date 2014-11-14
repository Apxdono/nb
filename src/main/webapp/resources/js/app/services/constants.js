define(['./module'], function (services) {
    services.factory('Constants', function () {
        var service = {
            unitType: {
                entity: 'unitTypes',
                path: '/unittype',
                controller: 'UnitTypesCtrl'
            },
            unit: {
                entity: 'units',
                path: '/unit',
                controller: 'UnitCtrl'
            },
            coop: {
                entity: 'cooperatives',
                path: '/cooperative',
                controller: 'CoopCtrl'
            },
            client: {
                entity: 'clients',
                subentity1 : 'privateClients',
                subentity2 : 'companies',
                path: '/client',
                controller: 'ClientCtrl'
            }
        };
        return service;
    })
});
