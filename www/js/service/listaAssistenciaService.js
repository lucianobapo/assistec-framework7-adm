/*jslint browser: true*/
/*global console, Framework7, MyApp, $document*/

MyApp.angular.factory('listaAssistenciaService', [
    'DataService',
    function (DataService) {
        'use strict';

        var pub = {};
        var eventListeners = {
            'ready': []
        };

        // Max items to load
        var supportsMax=60;

        var supportsNext;

        pub.addEventListener = function (eventName, listener) {
            eventListeners[eventName].push(listener);
        };

        pub.onPageInit = function () {
            // Loading flag
            var loading = false;

            // Attach 'infinite' event handler
            $$('.infinite-scroll').on('infinite', function () {
                MyApp.cLog('infinite-scroll:');
                // Exit, if loading in progress
                if (loading) return;

                // Set loading flag
                loading = true;

                if (supportsNext != undefined)
                    DataService.getSupports(supportsNext).then(function (result){
                        // Reset loading flag
                        loading = false;

                        if (DataService.supports.length >= supportsMax) {
                            // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
                            MyApp.fw7.app.detachInfiniteScroll($$('.infinite-scroll'));
                            // Remove preloader
                            $$('.infinite-scroll-preloader').remove();
                        } else {
                            MyApp.cLog('Success:', result);
                            DataService.supports = DataService.supports.concat(result.data._embedded.servico);

                            MyApp.fw7.app.template7Data['url:html/pages/listaAssistenciaTemplate.html'] = {
                                count:DataService.supports.length,
                                total:result.data.total_items,
                                supports:DataService.supports
                            };
                            supportsNext = result.data._links.next.href;
                            MyApp.mainView.router.refreshPage();
                        }
                    }, function (err){
                        // Reset loading flag
                        loading = false;
                        MyApp.cErr('Request Error', err);
                    });
            });
        };

        pub.loadPage = function () {
            MyApp.fw7.app.showIndicator();

            DataService.getSupports().then(function (result){
                MyApp.cLog('Success:', result);
                MyApp.fw7.app.hideIndicator();

                DataService.supports = result.data._embedded.servico;
                supportsNext = result.data._links.next.href;
                supportsMax = result.data.total_items;

                // Will pass context with retrieved user name
                // to welcome page. Redirect to welcome page
                MyApp.mainView.router.load({
                    url: 'html/pages/listaAssistenciaTemplate.html',
                    context: {
                        count:DataService.supports.length,
                        total:result.data.total_items,
                        supports: DataService.supports
                    }
                });
            }, function (err){
                MyApp.cErr('Request Error', err);
            });
        };

        return pub;
    }
]);