/*jslint browser: true*/
/*global console, MyApp*/
MyApp.angular.controller('listaAssistenciaPageController', [
    '$scope', '$http', 'InitService', 'DataService', '$rootScope',
    function ($scope, $http, InitService, DataService, $rootScope) {
        'use strict';
        $scope.pageName = 'listaAssistencia';

        MyApp.cControllerEnter('Processing '+$scope.pageName+'PageController');

        $scope.toEditAssistencia = function (support) {
            //MyApp.cDebug('toEditAssistencia ', support);
            //DataService.supportClicked(support);
            $rootScope.processClick('formAssistencia', support);
        };

        //if ($scope.supports == undefined && $scope.supportsNext == undefined){
        //    DataService.getSupports().then(function (result){
        //        MyApp.cLog('Success:', result);
        //        $scope.supports = result.data._embedded.servico;
        //        $scope.supportsNext = result.data._links.next.href;
        //    }, function (err){
        //        MyApp.cErr('Request Error', err);
        //    });
        //    $scope.$apply();
        //}

        // Gets notified when movie was clicked
        $scope.destroyThisClicked = $rootScope.$on($scope.pageName+'Clicked',
            function (event) {
                MyApp.cEventLog('$on Event '+$scope.pageName+'Clicked');
                if ($scope.supports == undefined && $scope.supportsNext == undefined){
                    DataService.getSupports().then(function (result){
                        MyApp.cLog('Success:', result);
                        $scope.supports = result.data._embedded.servico;
                        $scope.supportsNext = result.data._links.next.href;
                    }, function (err){
                        MyApp.cErr('Request Error', err);
                    });
                    $scope.$apply();
                }
            }
        );
        // Gets notified when Detail page was left
        $scope.destroyThisPageLeave = $rootScope.$on($scope.pageName+'PageLeave',
            function (event, originalEvent) {
                MyApp.cEventLog('$on Event '+$scope.pageName+'PageLeave');
                // Destroy angular DetailPageController, scope and remove event bindings
                $scope.destroyThisClicked();
                $scope.destroyThisPageLeave();
                //$scope.$destroy();
            }
        );

        // Loading flag
        var loading = false;

        // Max items to load
        var maxItems = 60;

        // Attach 'infinite' event handler
        $$('.infinite-scroll').on('infinite', function () {

            // Exit, if loading in progress
            if (loading) return;

            // Set loading flag
            loading = true;

            if ($scope.supportsNext != undefined)
                DataService.getSupports($scope.supportsNext).then(function (result){
                    // Reset loading flag
                    loading = false;

                    if ($scope.supports.length >= maxItems) {
                        // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
                        MyApp.fw7.app.detachInfiniteScroll($$('.infinite-scroll'));
                        // Remove preloader
                        $$('.infinite-scroll-preloader').remove();
                    } else {
                        MyApp.cLog('Success:', result);
                        $scope.supports = $scope.supports.concat(result.data._embedded.servico);
                        $scope.supportsNext = result.data._links.next.href;
                    }
                }, function (err){
                    // Reset loading flag
                    loading = false;
                    MyApp.cErr('Request Error', err);
                });
        });
    }
]);