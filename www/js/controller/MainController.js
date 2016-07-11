/*jslint browser: true*/
/*global console, MyApp*/
MyApp.angular.controller('MainController', [
    '$scope', '$compile', '$rootScope', '$templateCache',
    function ($scope, $compile, $rootScope, $templateCache) {
        MyApp.cControllerEnter('MainController');
        $rootScope.pageCompiled = [];
        $$(document).on('pageBeforeAnimation', function (e) {
            // Never recompile index page
            if (e.detail.page.fromPage.name!='formAssistencia') {
            //if (e.detail.page.name != 'index') {
                MyApp.cLog('Will compile...', e.detail.page.name);
                // Ajax pages must be compiled first
                $compile(e.target)($scope);
                $scope.$apply();
                //$compile(e.srcElement)($scope);
            }
            // Send broadcast event when switching to new page
            MyApp.cEventLog('Send broadcast '+e.detail.page.name + 'PageEnter');
            $rootScope.$broadcast(e.detail.page.name + 'PageEnter', e);

            // Send broadcast if a page is left
            if (e.detail.page.fromPage) {
                MyApp.cEventLog('Send broadcast '+e.detail.page.fromPage.name + 'PageLeave');
                $rootScope.$broadcast(e.detail.page.fromPage.name + 'PageLeave', e);
            }
        });

        $rootScope.processClick = function () {
            var args = Array.prototype.slice.call(arguments, 0);
            MyApp.cLog('Processing', args);
            var page = 'index';
            var params = null;
            var forceRegisterEvent = false;

            if (typeof args[0] == "string") page = args[0];
            if (typeof args[1] == "boolean") forceRegisterEvent = args[1];
            if (typeof args[1] == "object") params = args[1];
            if (typeof args[2] == "object") params = args[2];

            if (forceRegisterEvent || !($$('#'+page).length > 0)) {
                // Required if was clicked but new page is not loaded via ajax yet
                $scope.destroyPageEnter =
                    $rootScope.$on(page+'PageEnter',
                        function (event, originalEvent) {
                            MyApp.cEventLog('$on Event '+page+'PageEnter');
                            // When detail page is loaded, send the event
                            MyApp.cEventLog('Send broadcast '+page+'Clicked');
                            $rootScope.$broadcast(page+'Clicked', params);
                            $scope.destroyPageEnter();
                        }
                    );
            } else $rootScope.$broadcast(page+'Clicked', params);
        };

        $rootScope.toIndex = function () {
            $rootScope.processClick('index');
        };

        $rootScope.toListaAssistencia = function (params) {
            $rootScope.processClick('listaAssistencia', params);
        };

        $rootScope.back = function () {
            MyApp.mainView.router.back();
            //MyApp.mainView.router.reloadPreviousPage(url);
        };
    }
]);