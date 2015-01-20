define(['angular'], function (angular) {
    var constants = angular.module('nova.constants', []);
    constants.constant('Entity', {
        unitType: {
            entity: 'unitTypes',
            path: '/unittype',
            controller: 'BaseCtrl',
            controllerUrl : './controllers/base-controller'
        },
        unit: {
            entity: 'units',
            path: '/unit',
            controller: 'BaseCtrl',
            controllerUrl : './controllers/base-controller'
        },
        coop: {
            entity: 'cooperatives',
            path: '/cooperative',
            controller: 'BaseCtrl',
            controllerUrl : './controllers/base-controller'
        },
        client: {
            entity: 'clients',
            subtypes: ['privateClients', 'companies'],
            path: '/client',
            controller: 'BaseCtrl',
            controllerUrl : './controllers/base-controller'
        },
        house: {
            entity: 'houses',
            path: '/house',
            controller: 'BaseCtrl',
            controllerUrl : './controllers/base-controller'
        },
        section: {
            entity: 'sections',
            path: '/section',
            controller: 'BaseCtrl',
            controllerUrl : './controllers/base-controller'
        },
        unit: {
            entity: 'units',
            path: '/unit',
            controller: 'BaseCtrl',
            controllerUrl : './controllers/base-controller'
        }
    }).constant('ContactTypeLabels', {
        "CONTACT_PHONE": "Контактный телефон",
        "MOBILE_PHONE": "Мобильный телефон",
        "HOME_PHONE": "Домашний телефон",
        "EMAIL": "Электронная почта",
        "SKYPE": "Skype",
        "FAX": "Факс"
    }).constant('Events', {
        loginRequired: 'event:auth-loginRequired',
        loggedIn: 'event:auth-loginConfirmed',
        userDataSuccess: 'event:user-data-success'
    }).constant('GridOptions', {
        defaultGrid: function (scope, lsserv, entity) {
            var fkey = entity + ".list.filters",
                pkey = entity + ".list.page",
                skey = entity + ".list.pageSize";
            var _currentPage = lsserv.get(pkey) || 1, _pageSize = lsserv.get(skey) || 10;

            var self =
            {
                target: entity,
                filters: lsserv.get(fkey) || {},
                enableSorting: true,
                columnDefs: [],
                enableScrollbars: false,
                enableColumnResizing: false,
                enableColumnMenu: false,
                pageSizes: [5, 10, 15, 20, 25],
                paging: { page: _currentPage - 1, size: _pageSize },
                initFilter: function (filterName, val) {
                    if (!self.filters.hasOwnProperty(filterName)) {
                        self.filters[filterName] = val
                    }
                },
                currentPage: function (value) {
                    if (angular.isDefined(value)) {
                        _currentPage = value;
                        self.paging.page = value - 1;
                        self.restrictCurrentPage();
                        lsserv.set(pkey, _currentPage);
                        $log.info('current page set to ' + _currentPage);
                    }
                    return _currentPage;
                },
                restrictCurrentPage: function () {
                    if (self.pageData && self.pageData.totalPages > 0 && self.currentPage() > self.pageData.totalPages) {
                        self.currentPage(self.pageData.totalPages);
                    }
                    if (self.currentPage() < 1) {
                        self.currentPage(1);
                    }
                },
                size: function (value) {
                    if (angular.isDefined(value)) {
                        _pageSize = value;
                        self.paging.size = value;
                        self.currentPage(1);
                        lsserv.set(skey, _pageSize);
                    }
                    return _pageSize;
                },
                firstPage: function () {
                    self.toPage(1);
                },
                lastPage: function () {
                    self.toPage(self.pageData.totalPages);
                },
                toPage: function (number) {
                    if (self.currentPage() == number || number < 1 || number - 1 > self.pageData.totalPages) return;
                    self.currentPage(number);
                    self.fetchData();
                },
                nextPage: function () {
                    self.toPage(self.currentPage() + 1);
                },
                prevPage: function () {
                    self.toPage(self.currentPage() - 1);
                },
                onRegisterApi: function (api) {
                    self.gridApi = api;
                    self.gridApi.core.on.sortChanged(scope, function () {
                        self.fetchData();
                    })
                },

                fetchData: function () {

                }
            };

            scope.$watch('options.filters', function (newval, oldval) {
                if (isEmpty(newval) || newval == oldval) {
                    return;
                }
                lsserv.set(fkey, newval);
                self.currentPage(1);
            }, true);
            return self;
        },
        nestedGrid: {
            _currentPage: 1,
            _pageSize: 10,
            filters: {},
            data: [],
            initFilter: function (filterName, val) {
                if (!this.filters.hasOwnProperty(filterName)) {
                    this.filters[filterName] = val
                }
            },
            enableSorting: true,
            columnDefs: [],
            enableScrollbars: false,
            enableColumnResizing: false,
            enableColumnMenu: false,
            fetchData: function () {

            }
        }
    });
    return constants;
});