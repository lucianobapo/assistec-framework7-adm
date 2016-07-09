/*jslint browser: true*/
/*global console, MyApp*/

MyApp.angular.controller('ListaAssistenciaPageController', [
    '$scope', '$http', 'InitService', 'DataService',
    function ($scope, $http, InitService, DataService) {
        'use strict';

        InitService.addEventListener('ready', function () {
            // DOM ready
            console.log('ListaAssistenciaPageController: ok, DOM ready');

            DataService.getSupports().then(function successResponse(result){
                console.debug('Success:', result);
                $scope.supports = result.data._embedded.servico;
            }, function errorResponse(err){
                console.error('Request Error', err);
                console.log(err);
            });

            // You can access angular like this:
            // MyApp.angular

            // And you can access Framework7 like this:
            // MyApp.fw7.app
        });

        $scope.$watch(function(){
            return $scope.supportIdSelected;
        }, function(newVal, oldVal) {
            if (oldVal!=newVal) {
                console.log('Value changing... old -> new');
                console.log(oldVal, newVal);
                selectSupport(newVal);
            }
        });

        function selectSupport(id){
            if (id!==undefined){
                console.log('Selecting... ', id);
                $scope.supports.forEach(function(item){
                    if (item.id==id)
                        $scope.selectedSupport = item;
                });

            }
        };
    }
]);