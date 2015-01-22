define([
    'angular',
    'jquery',
    'text!/views/elements/table/paging.html',
    'angular-auth',
    '../constants'], function (angular, $,pagingTpl) {
    var directives = angular.module('nova.directives', ['nova.constants']);

    /*Authorization*/
    directives.directive('authContainer', function (Events) {
        return {
            restrict: 'C',
            link: function (scope, elem, attrs) {
                elem.removeClass('waiting-for-angular');
                var login = $(elem.children()[0]);
                var main = $(elem.children()[1]);
                login.hide();
                scope.$on(Events.loginRequired, function () {
                    main.slideUp('slow');
                    login.slideDown('slow', function () {
                    });
                });
                scope.$on(Events.loggedIn, function () {
                    login.slideUp(function () {
                        main.slideDown('slow');
                    });
                });
            }
        }
    });

    directives.directive('postRender', [ '$timeout', function($timeout) {
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

    /*Select helper*/
    directives.directive('doSelect', function () {
        var dir = {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var items = attrs.ngOptions.substring(attrs.ngOptions.indexOf(' in ') + 4);
                scope.$watch(attrs.ngModel, function (n, o) {
                    var index = 0;
                    angular.forEach(scope[items], function (t, k) {
                        if (n && t.id === n.id) {
                            index = k;
                            return false;
                        }
                    });
                    element.val(index);
                });
            }
        };
        return dir;
    });

    /*Heading*/
    directives.directive('heading', function () {
        var dir = {
            restrict: 'E',
            replace:true,

            scope: {
                label: '@',
                icon: '@',
                href : '@',
                hasNext : '='
            },
            template: [
                    '<span>',
                        '<a href="{{href || $parent.$location.path()}}"><strong><i class="glyphicon {{icon}}"></i> {{label}} </strong></a>',
                        '<span class="bread" ng-show="hasNext"></span>',
                        '<hr ng-show="!hasNext">',
                    '</span>'

            ].join('')
        };
        return dir;
    });

    /*Buttons*/
    directives.directive('newSearch', function () {
        return {
            restrict: 'E',
            replace:true,
            template : [
            '<div class="row" style="margin-top: 10px">',
                '<div class="col-sm-4 col-sm-2">',
                    '<button class="btn btn-success" ng-click="toNew()">Новая запись</button>&nbsp;',
                    '<button class="btn btn-primary" ng-click="options.fetchData()">Поиск</button>',
                '</div>',
            '</div>'
            ].join('')
        }
    });

    directives.directive('saveCancel', function () {
        return {
            restrict: 'E',
            replace: true,
            template: [
                '<div class="form-group">',
                    '<div class="col-sm-offset-2 col-sm-10">',
                        '<button class="btn btn-primary" ng-click="save();">Сохранить</button>&nbsp;',
                        '<button class="btn btn-default" ng-click="cancel()">Отмена</button>',
                    '</div>',
                '</div>'
            ].join('')
        }

    });

    directives.directive('viewEdit', function () {
        return {
            restrict: 'E',
            replace:true,
            template : [
                '<div class="form-group">',
                    '<div class="col-sm-offset-2 col-sm-10">',
                        '<button class="btn btn-primary" ng-click="toEdit();">Редактировать</button>&nbsp;',
                        '<button class="btn btn-default" ng-click="toList();">К списку</button>',
                    '</div>',
                '</div>'
            ].join('')
        }

    });


    /*Form elements*/
    directives.directive('baseInput', function () {
        return {
            restrict: 'E',
            replace:true,
            scope: {
                field: '@',
                model:'=',
                label: '@',
                type : '@',
                labelSpan : '@',
                inputSpan: '@',
                noGroup : '='
            },
            template: [
                '<div ng-class="{&quot;form-group&quot; : !noGroup}">',
                    '<label class="control-label col-sm-{{ labelSpan || 2}}" for="{{field}}">{{label}}</label>',
                    '<div class="col-sm-{{ inputSpan|| 10}}">',
                        '<input id="{{field}}" name="{{field}}" type="{{type}}" ng-model="model[field]" class="form-control">',
                    '</div>',
                '</div>'
            ].join('')
        }
    });

    directives.directive('baseInputRequired', function () {
        return {
            restrict: 'E',
            replace:true,
            scope: {
                field: '@',
                model:'=',
                label: '@',
                type : '@',
                labelSpan : '@',
                inputSpan: '@',
                noGroup : '='
            },
            template: [
                '<div ng-class="{&quot;form-group&quot; : !noGroup}">',
                    '<label class="control-label col-sm-{{ labelSpan|| 2}}" for="{{field}}">{{label}}</label>',
                    '<div class="col-sm-{{ inputSpan|| 10}}">',
                        '<input id="{{field}}" name="{{field}}" type="{{type}}" ng-model="model[field]" xt-validate required class="form-control">',
                    '</div>',
                '</div>'
            ].join('')
        }
    });

    directives.directive('checkbox', function () {
        return {
            restrict: 'E',
            replace:true,
            scope: {
                field: '@',
                model:'=',
                label: '@'
            },
            template : [
                '<div class="form-group">',
                    '<div class="col-sm-offset-2 col-sm-10">',
                        '<div class="checkbox">',
                            '<label>',
                                '<input type="checkbox" ng-model="model[field]"> {{label}}',
                            '</label>',
                        '</div>',
                    '</div>',
                '</div>'
            ].join('')
        }
    });

    directives.directive('viewCheckbox', function () {
        return {
            restrict: 'E',
            replace:true,
            scope: {
                value:'=',
                label: '@'
            },
            template : [
                '<div class="form-group">',
                    '<div class="col-sm-offset-2 col-sm-10">',
                        '<div class="checkbox">',
                            '<label>',
                                '<input type="checkbox" disabled ng-model="value"> {{label}}',
                            '</label>',
                        '</div>',
                    '</div>',
                '</div>'
            ].join('')
        }
    });

    directives.directive('viewRow', function () {
        return {
            restrict: 'E',
            replace:true,
            scope: {
                value:'=',
                label: '@',
                labelSpan : '@',
                valueSpan: '@',
                noGroup: '='
            },
            template : [
                '<div ng-class="{&quot;form-group&quot; : !noGroup}">',
                    '<label class="control-label col-sm-{{ labelSpan|| 2}}">{{label}}</label>',
                    '<div class="col-sm-{{ valueSpan|| 10}} input-group input-group-sm">',
                        '<p class="form-control-static">{{value}}</p>',
                    '</div>',
                '</div>'
            ].join('')
        }

    });

    /*Table*/

    directives.directive('filterInput', function () {
        return {
            restrict: 'E',
            replace:true,
            scope: {
                field: '@',
                options:'=',
                label: '@'
            },
            template : [
                '<div class="col-sm-4">',
                    '<div class="input-group">',
                        '<label class="sr-only">{{label}}</label>',
                        '<input type="text" class="form-control" placeholder="{{label}}" ng-model="options.filters[field]" ng-init="options.initFilter(field,&quot;&quot;)">',
                        '<div class="btn input-group-addon "  ng-click="options.filters[field] = &quot;&quot;;options.fetchData()">',
                            '<span style="color:dimgray" class="glyphicon glyphicon-remove"></span>',
                        '</div>',
                    '</div>',
                '</div>'
            ].join('')
        };
    });

    directives.directive('paging', function () {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            template: pagingTpl
        }
    });

    return directives;
});