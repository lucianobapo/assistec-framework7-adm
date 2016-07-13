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

    function sendHttp(method, url, data){
        var params = {
            headers: {
                //'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json'
                //'Accept': 'application/json'
            },
            method: method,
            data: data,
            url: url
        };
        //MyApp.cDebug('params:', params);
        return $http(params);
    }

    pub.postSupport = function (data) {
        return sendHttp('POST', 'http://assistec.ilhanet.com/servico', data);
    };

    pub.getCities = function () {
        return sendHttp('GET', 'http://assistec.ilhanet.com/cidade');
    };

    pub.getStates = function () {
        return sendHttp('GET', 'http://assistec.ilhanet.com/estado');
    };

    pub.getSupports = function (url) {
        if (url == undefined) url = 'http://assistec.ilhanet.com/servico';
        return sendHttp('GET', url);
    };

    return pub;
}]);