/*jslint browser: true*/
/*global console, MyApp*/
MyApp.angular.controller('indexPageController', [
    '$scope', '$compile', '$http', 'InitService', 'DataService', '$rootScope', 'eventService',
    function ($scope, $compile, $http, InitService, DataService, $rootScope, eventService) {
        'use strict';

        $scope.pageName = 'index';
        MyApp.cControllerEnter('Processing '+$scope.pageName+'PageController');

        // Gets notified when was clicked
        $scope.destroyThisClicked = $rootScope.$on($scope.pageName+'Clicked',
            function (event) {
                MyApp.cEventLog('Event '+$scope.pageName+'Clicked');
                $scope.$apply();
            }
        );
        // Gets notified when page was left
        $scope.destroyThisPageLeave = $rootScope.$on($scope.pageName+'PageLeave',
            function (event, originalEvent) {
                MyApp.cEventLog('Event '+$scope.pageName+'PageLeave');
                // Destroy angular DetailPageController, scope and remove event bindings
                $scope.destroyThisClicked();
                $scope.destroyThisPageLeave();
                $scope.$destroy();
            }
        );

        InitService.addEventListener('ready', function () {
            //DataService.getMovies('moviedata.json').then(function (result) {
            //    $scope.movies = result.data.movies;
            //}, function (err) {
            //    MyApp.cErr(err);
            //});
        });
    }
]);