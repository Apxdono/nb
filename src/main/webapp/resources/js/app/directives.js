'use strict';

/* Controllers */

angular.module('nova.directives', []).directive('paging', function () {
    return {
        restrict: 'E',
        scope: {
            options: '='
        },
        templateUrl: '/views/elements/paging.html'
    }

}).directive('filterInput', function () {
    return {
        restrict: 'E',
        replace:true,
        scope: {
            field: '@',
            options:'=',
            label: '@'
        },
        templateUrl: '/views/elements/filterInput.html'
    }

}).directive('baseInput', function () {
    return {
        restrict: 'E',
        replace:true,
        scope: {
            field: '@',
            model:'=',
            label: '@',
            type : '@'
        },
        templateUrl: '/views/elements/baseInput.html'
    }

}).directive('baseInputRequired', function () {
    return {
        restrict: 'E',
        replace:true,
        scope: {
            field: '@',
            model:'=',
            label: '@',
            type : '@'
        },
        templateUrl: '/views/elements/baseInputRequired.html'
    }

}).directive('checkbox', function () {
    return {
        restrict: 'E',
        replace:true,
        scope: {
            field: '@',
            model:'=',
            label: '@'
        },
        templateUrl: '/views/elements/baseCheckbox.html'
    }

}).directive('viewRow', function () {
    return {
        restrict: 'E',
        replace:true,
        scope: {
            value:'=',
            label: '@'
        },
        templateUrl: '/views/elements/viewRow.html'
    }

}).directive('viewCheckbox', function () {
    return {
        restrict: 'E',
        replace:true,
        scope: {
            value:'=',
            label: '@'
        },
        templateUrl: '/views/elements/viewCheckbox.html'
    }

}).directive('heading', ['$compile','$location',function ($compile,$location) {
    var dir = {
        restrict: 'E',
        replace:true,
        scope: {
            label: '@',
            icon: '@'
        },
        templateUrl: '/views/elements/heading.html'
    };
//    dir.scope.path = $location.path();

    return dir;

}]).directive('saveCancel', function () {
    return {
        restrict: 'E',
        replace:true,
        templateUrl: '/views/elements/saveCancel.html'
    }

}).directive('viewEdit', function () {
    return {
        restrict: 'E',
        replace:true,
        templateUrl: '/views/elements/viewEdit.html'
    }

}).directive('newSearch', function () {
    return {
        restrict: 'E',
        replace:true,
        templateUrl: '/views/elements/newSearch.html'
    }

}).directive('postRender', [ '$timeout', function($timeout) {
    var def = {
        restrict : 'E',
        terminal : true,
        transclude : true,
        link : function(scope, element, attrs) {
            $timeout(function(){scope.init()}, 0);  //Calling a scoped method
        }
    };
    return def;
}]);