/*jslint browser: true*/
/*global console, Framework7, MyApp, $document*/

MyApp.angular.factory('listaCidadesService', [
    'DataService',
    function (DataService) {
        'use strict';

        var pub = {};
        var eventListeners = {
            'ready': []
        };

        // Max items to load
        var citiesMax=2;

        var citiesNext;

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

                if (citiesNext != undefined)
                    DataService.getCities(citiesNext).then(function (result){
                        // Reset loading flag
                        loading = false;

                        if (DataService.cities.length >= citiesMax) {
                            // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
                            MyApp.fw7.app.detachInfiniteScroll($$('.infinite-scroll'));
                            // Remove preloader
                            $$('.infinite-scroll-preloader').remove();
                        } else {
                            MyApp.cLog('Success:', result);
                            DataService.cities = DataService.cities.concat(result.data._embedded.cidade);

                            MyApp.fw7.app.template7Data['url:html/pages/listaCidadesTemplate.html'] = {
                                count:DataService.cities.length,
                                total:result.data.total_items,
                                cities:DataService.cities
                            };
                            citiesNext = result.data._links.next.href;
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

            DataService.getCities().then(function (result){
                MyApp.cDebug('Success:', result);
                MyApp.fw7.app.hideIndicator();

                DataService.cities = result.data._embedded.cidade;
                citiesNext = result.data._links.next.href;
                citiesMax = result.data.total_items;

                // Will pass context with retrieved user name
                // to welcome page. Redirect to welcome page
                MyApp.mainView.router.load({
                    url: 'html/pages/listaCidadesTemplate.html',
                    context: {
                        count:DataService.cities.length,
                        total:result.data.total_items,
                        cities: DataService.cities
                    }
                });
            }, function (err){
                MyApp.cErr('Request Error', err);
            });
        };

        return pub;
    }
]);