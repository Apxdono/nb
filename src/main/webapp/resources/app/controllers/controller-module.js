define([
    'angular',
    '../constants',
    '../services/login-service'
], function (angular) {
    var controllers = angular.module('nova.controllers',['nova.constants','nova.services']);
    return controllers;
});