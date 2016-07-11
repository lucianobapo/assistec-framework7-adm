/*jslint browser: true*/
/*global console, Framework7, MyApp, $document*/

MyApp.angular.factory('DataService', ['$document', '$http', function ($document, $http) {
    'use strict';

    var pub = {};
    var eventListeners = {
        'supportClicked': [],
        'ready': []
    };

    pub.addEventListener = function (eventName, listener) {
        eventListeners[eventName].push(listener);
    };

    pub.supportClicked = function (support) {
        //MyApp.cDebug('pub.supportClicked ', support);
        MyApp.cDebug('eventListeners ', eventListeners);
        for (var i = 0; i < eventListeners.supportClicked.length; i++){
            eventListeners.supportClicked[i](support);
        }
    };

    function sendHttp(url){
        var params = {
            headers: {
                //'X-Requested-With': 'XMLHttpRequest',
                //'Accept': 'application/json'
            },
            method: 'GET',
            url: url
        };
        return $http(params);
    }

    pub.getCities = function () {
        return sendHttp('http://assistec.ilhanet.com/cidade');
    };

    pub.getStates = function () {
        return sendHttp('http://assistec.ilhanet.com/estado');
    };

    pub.getSupports = function (url) {
        if (url == undefined) url = 'http://assistec.ilhanet.com/servico';
        return sendHttp(url);
    };

    return pub;
}]);