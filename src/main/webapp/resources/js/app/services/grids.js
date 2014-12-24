define(['./module'], function (services) {
    services.factory('Grids', function ($log,localStorageService,Func) {
        var service = {
            defaultGrid: function (scope,entity) {
                var fkey = entity+".list.filters",
                pkey = entity+".list.page",
                skey = entity+".list.pageSize";
                var _currentPage = localStorageService.get(pkey) || 1, _pageSize =  localStorageService.get(skey) || 10;

                var self =
                {
                    target : entity,
                    filters: localStorageService.get(fkey) || {},
                    enableSorting: true,
                    columnDefs: [],
                    enableScrollbars: false,
                    enableColumnResizing: false,
                    enableColumnMenu: false,
                    pageSizes: [5, 10, 15, 20, 25],
                    paging: { page: _currentPage-1, size: _pageSize },
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
                            localStorageService.set(pkey,_currentPage);
                            $log.info('current page set to '+_currentPage);
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
                            localStorageService.set(skey,_pageSize);
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
                    fetchData: function () {

                    }
                };

                scope.$watch('options.filters', function (newval, oldval) {
                    if (Func.isEmpty(newval) || newval == oldval) {
                        return;
                    }
                    localStorageService.set(fkey, newval);
                    self.currentPage(1);
                }, true);
                return self;
            },
            nestedGrid: {
                _currentPage: 1,
                _pageSize: 10,
                filters: {},
                data : [],
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
        };
        return service;
    })
});
