define([
    './../directive-module',
    'text!/views/elements/common/reallyModal.html'
], function (directives, template) {
    directives.directive('bsReally', function ($log, $modal) {

        var modalController = function ($scope, $modalInstance, data) {
            $scope.message = data.message;

            $scope.okModal = function () {
                $modalInstance.close(true);
            };

            $scope.cancelModal = function () {
                $modalInstance.dismiss('cancel');
            };
        }


        var dir = {
            restrict: 'A',
            priority: 1,
            terminal: true,
            link: function (scope, element, attrs) {
                $log.debug(arguments);
                var m = attrs.bsReally;
                element.on('click', function () {
                    var inst = $modal.open({
                        size: 'sm',
                        template: template,
                        controller: modalController,
                        resolve: {
                            data : function (){
                            return {
                                message : m
                            }
                        }         }
                    });
                    inst.result.then(function (data) {
                        if (data == true) {
                            $log.debug('Yes we click')
                            scope.$parent.$eval(attrs.ngClick)
                        }
                    }, function () {
                        $log.debug('No we dont click')
                    })
                });
            }
        };
        return dir;
    });
});
