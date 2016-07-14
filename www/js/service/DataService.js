/*jslint browser: true*/
/*global console, Framework7, MyApp, $document*/

MyApp.angular.factory('DataService', ['$document', '$http', function ($document, $http) {
    'use strict';

    var pub = {};
    var eventListeners = {
        'supportClicked': [],
        'ready': []
    };

    pub.supportToDelete = 0;
    pub.supports = [];

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
                //'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: method,
            data: data,
            url: url
        };
        MyApp.cDebug('params:', params);
        return $http(params);
    }

    pub.deleteSupport = function () {
        return sendHttp('DELETE', 'http://assistec.ilhanet.com/servico/'+pub.supportToDelete);
    };

    pub.updateSupport = function (id, data) {
        return sendHttp('PUT', 'http://assistec.ilhanet.com/servico/'+id, data);
    };

    pub.createSupport = function (data) {
        return sendHttp('POST', 'http://assistec.ilhanet.com/servico', data);
    };

    pub.getSupports = function (url) {
        if (url == undefined) url = 'http://assistec.ilhanet.com/servico';
        return sendHttp('GET', url);
    };

    return pub;
}]);