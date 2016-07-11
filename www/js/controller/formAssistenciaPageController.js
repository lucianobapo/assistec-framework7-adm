/*jslint browser: true*/
/*global console, MyApp, mainView*/
MyApp.angular.controller('formAssistenciaPageController', [
    '$scope', '$http', 'InitService', 'DataService', '$rootScope',
    function ($scope, $http, InitService, DataService, $rootScope) {
        'use strict';
        $scope.pageName = 'formAssistencia';
        MyApp.cControllerEnter('Processing '+$scope.pageName+'PageController');

        // Gets notified when movie was clicked
        $scope.destroyThisClicked = $rootScope.$on($scope.pageName+'Clicked',
            function (event, assistencia) {
                MyApp.cEventLog('$on Event '+$scope.pageName+'Clicked', assistencia);
                $scope.selectedSupport = assistencia;
                $scope.$apply();
            }
        );
        // Gets notified when Detail page was left
        $scope.destroyThisPageLeave = $rootScope.$on($scope.pageName+'PageLeave',
            function (event, originalEvent) {
                MyApp.cEventLog('$on Event '+$scope.pageName+'PageLeave');
                // Destroy angular DetailPageController, scope and remove event bindings
                $scope.destroyThisClicked();
                $scope.destroyThisPageLeave();
                $scope.$destroy();
            }
        );
    }
]);