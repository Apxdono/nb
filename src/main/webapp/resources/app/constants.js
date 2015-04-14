define([
    'angular',
    'text!/views/table/deletedCell.html'
], function (angular,deletedTpl) {
    var constants = angular.module('nova.constants', []);
    constants.constant('Entity', {
        unitType: {
            entity: 'unitTypes',
            path: '/unittype',
            controller: 'BaseCtrl',
            controllerUrl : './controllers/base-controller',
            columnDefs : [
                {name: 'Название', field: 'name', sort: {direction: 'asc'}, cellTemplate: '<div class="ui-grid-cell-contents"><a href="#/unittype/view/{{row.entity.id}}">{{row.entity[col.field]}}</a> </div>'},
                {name: 'Сокращение', field: 'internalName'},
                {name: 'Активно', field: 'active', cellTemplate: deletedTpl}
            ]
        },
        unit: {
            entity: 'units',
            path: '/unit',
            controller: 'UnitCtrl',
            controllerUrl : './controllers/unit-controller'
        },
        coop: {
            entity: 'cooperatives',
            path: '/cooperative',
            controller: 'CoopCtrl',
            controllerUrl : './controllers/coop-controller',
            columnDefs : [
                {name: 'Название', width: '30%', field: 'name', sort: {direction: 'asc'}, cellTemplate: '<div class="ui-grid-cell-contents"><a href="#/cooperative/view/{{row.entity.id}}">{{row.entity[col.field]}}</a> </div>'},
                {name: 'Внутреннее имя', width: '30%', field: 'internalName'},
                {name: 'Председатель', width: '30%', field: 'chairman'},
                {name: 'Активна', width: '10%', minwidth:50, field: 'active', cellTemplate: deletedTpl}
            ]
        },
        client: {
            entity: 'clients',
            subtypes: { 'PRIVATE':'privateClients', 'COMPANY':'companies'},
            path: '/client',
            controller: 'ClientCtrl',
            controllerUrl : './controllers/client-controller',
            columnDefs : [
                {name: 'ФИО/Название', field: 'name', sort: {direction: 'asc'}, cellTemplate: '<div class="ui-grid-cell-contents"><a href="#/client/view/{{row.entity.id}}">{{row.entity[col.field]}}</a> </div>'},
                {name: 'Тип', field: 'type', cellTemplate: '<div class="ui-grid-cell-contents"><span>{{row.entity.type =="PRIVATE"? "Физ. лицо" : "Юр. лицо"}}</span> </div>'},
                {name: 'Запись активна', field: 'active', cellTemplate: deletedTpl}
            ]
        },
        house: {
            entity: 'houses',
            path: '/house',
            controller: 'HouseCtrl',
            controllerUrl : './controllers/house-controller',
            columnDefs : [
                {name: 'Адрес', width: '30%', field: 'address', sort: {direction: 'asc'}, cellTemplate: '<div class="ui-grid-cell-contents"><a href="#/house/view/{{row.entity.id}}">{{row.entity[col.field]+" "+row.entity.zipCode}}</a> </div>'},
                {name: 'Строительный номер', width: '30%', field: 'structuralNumber'},
                {name: 'Активна', width: '10%', minwidth: 50, field: 'active', cellTemplate: deletedTpl}
            ]
        },
        section: {
            entity: 'sections',
            path: '/section',
            controller: 'SectionCtrl',
            controllerUrl : './controllers/section-controller'
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
    }).constant('Grids', {
        defaultGrid: function (scope, lsserv, entity) {
            var fkey = entity + ".list.filters",
                pkey = entity + ".list.page",
                skey = entity + ".list.pageSize";
            var _currentPage = lsserv.get(pkey) || 1, _pageSize = lsserv.get(skey) || 10;

            var self =
            {
                target: entity,
                dataLoaded : false,
                filters: lsserv.get(fkey) || {},
                enableSorting: true,
                columnDefs: [],
                enableScrollbars: false,
                enableVerticalScrollbar: false,
                enableHorizontalScrollbar: false,
                enableColumnResizing: false,
                enableColumnMenu: false,
                pageSizes: [5, 10, 15, 20, 25],
                paging: { page: _currentPage - 1, size: _pageSize },
                initFilter: function (filterName, val) {
                    if (!self.filters.hasOwnProperty(filterName)) {
                        self.filters[filterName] = val || '';
                    }
                },
                currentPage: function (value) {
                    if (angular.isDefined(value)) {
                        _currentPage = value;
                        self.paging.page = value - 1;
                        self.restrictCurrentPage();
                        lsserv.set(pkey, _currentPage);
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
            enableVerticalScrollbar: false,
            enableHorizontalScrollbar: false,
            enableColumnResizing: false,
            enableColumnMenu: false,
            fetchData: function () {

            }
        }
    });
    return constants;
});