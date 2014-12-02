define(['./module'], function (services) {
    services.factory('Grids', function () {
        var service = {
            defaultGrid: {
                _currentPage: 1,
                _pageSize: 10,
                filters: {},
                paging : {},
                initFilter: function (filterName, val) {
                    if (!this.filters.hasOwnProperty(filterName)) {
                        this.filters[filterName] = val
                    }
                },
                currentPage: function (value) {
                    if (angular.isDefined(value)) {
                        this._currentPage = value;
                        this.paging.page = value - 1;
                        this.restrictCurrentPage();
                    }
                    return this._currentPage;
                },
                restrictCurrentPage: function () {
                    if (this.pageData && this.pageData.totalPages > 0 && this.currentPage() > this.pageData.totalPages) {
                        this.currentPage(this.pageData.totalPages);
                    }
                    if (this.currentPage() < 1) {
                        this.currentPage(1);
                    }
                },
                size: function (value) {
                    if (angular.isDefined(value)) {
                        this._pageSize = value;
                        this.currentPage(1);
                        this.paging.size = value;
                    }
                    return this._pageSize;
                },
                pageSizes: [5, 10, 15, 20, 25],
                paging: {
                    page: 0,
                    size: 10
                },
                enableSorting: true,
                columnDefs: [],
                enableScrollbars: false,
                enableColumnResizing: false,
                enableColumnMenu: false,
                firstPage: function () {
                    this.toPage(1);
                },
                lastPage: function () {
                    this.toPage(this.pageData.totalPages);
                },
                toPage: function (number) {
                    if (this.currentPage() == number || number < 1 || number - 1 > this.pageData.totalPages) return;
                    this.currentPage(number);
                    this.fetchData();
                },
                nextPage: function () {
                    this.toPage(this.currentPage() + 1);
                },
                prevPage: function () {
                    this.toPage(this.currentPage() - 1);
                },
                fetchData: function () {

                }
            },
            nestedGrid : {
                _currentPage: 1,
                _pageSize: 10,
                filters: {},
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
