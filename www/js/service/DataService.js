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

    var urlBase = 'http://app.guiaassistenciatecnica.com';
    // var urlBase = 'http://guiaassistenciatecnica.com/assistec-apigility/public';
    //var urlBase = 'http://assistec.ilhanet.com';
    //var urlBase = 'http://localhost:8888';

    pub.deleteSupport = function () {
        return sendHttp('DELETE', urlBase+'/servico/'+pub.supportToDelete);
    };

    pub.updateSupport = function (id, data) {
        return sendHttp('PATCH', urlBase+'/servico/'+id, data);
    };

    pub.createSupport = function (data) {
        return sendHttp('POST', urlBase+'/servico', data);
    };

    pub.getSupports = function (url) {
        if (url == undefined) url = urlBase+'/servico';
        return sendHttp('GET', url);
    };

    return pub;
}]);