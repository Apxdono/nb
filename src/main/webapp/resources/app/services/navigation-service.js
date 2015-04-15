define([
        'angular',
        './service-module',
        './function-service',
    ],
    function (angular, module) {
        var provider = module.register || module;
        provider.service('Navigation', function ($location, Utils) {

            var NavCallbacks = function(){
                this.list = [];
                this.view = [];
                this.edit = [];
                this.new = [];
                this.addCallback = function(name,func){
                    if(!this.hasOwnProperty(name)){
                        this[name] = [];
                    }
                    if(typeof func == 'function'){
                        this[name].push(func);
                    }
                };
                this.executeCallbacks = function(action,args/*,thisArg*/){
                    if(this.hasOwnProperty(action)){
                        var cbs = this[action];
                        var thisArg = arguments.length >= 3 ? arguments[2] : this;
                        for(var i =0 ;i < cbs.length; i++){
                            cbs[i].apply(thisArg,args);
                        }
                    }
                }
            };

            var Navigation = function (path) {
                this.toNew = function () {
                    $location.path(Utils.makePath(path, 'new'));
                };

                this.toView = function (t) {
                    $location.path(Utils.makePath(path, 'view', t ? t.id : this.model.id));
                };

                this.toEdit = function (t) {
                    $location.path(Utils.makePath(path, 'edit', t ? t.id : this.model.id));
                };

                this.toList = function () {
                    $location.path(Utils.makePath(path, 'list'));
                };

                this.navCallbacks = new NavCallbacks();

                this.addNavCallback = function (action, callback) {
                    if(!action || !callback) return;
                    var actions = action.split(' ');
                    for (var k in actions){
                       this.navCallbacks.addCallback(actions[k],callback);
                    }
                };

            };


            return Navigation;
        });


    });