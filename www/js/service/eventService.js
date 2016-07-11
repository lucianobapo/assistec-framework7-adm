/*jslint browser: true*/
/*global console, Framework7, MyApp, $document*/

MyApp.angular.service('eventService', function($rootScope) {
    'use strict';

    var eventos = [];
    var registrado = [];

    this.broadcast = function(name, data) {
        MyApp.cCustom1('Firing event '+name);
        $rootScope.$broadcast(name, data);

        //if(eventos[name] == undefined){
        //    MyApp.cCustom1('Event not registered '+name, eventos);
        //}else {
        //    MyApp.cCustom1('Firing event '+name);
        //    $rootScope.$broadcast(name, data);
        //    //onAllCallbacks.forEach(function(cb) { cb(name, data); });
        //}
    };

    this.register = function(name, callback) {
        if (eventos.indexOf(name)==-1){
            MyApp.cCustom1('Registering event '+name);
            eventos.push(name);
            //registrado[name] = $rootScope.$on(name, callback);
        } else {
            MyApp.cCustom1('Already registered event '+name, eventos);
        }
        $rootScope.$on(name, callback);

        //if(eventos[name] == undefined){
        //    //eventos.push(name);
        //    eventos[name] = $rootScope.$on(name, callback);
        //    MyApp.cCustom1('Registering event '+name, eventos);
        //} else {
        //    MyApp.cCustom1('Already registered event '+name);
        //}
    };

    this.destroy = function(name, callback) {
        MyApp.cCustom1('Try to Destroy no event '+name);
        //registrado[name]();
        //if(eventos[name] == undefined){
        //    MyApp.cCustom2('Try to Destroy no event '+name);
        //} else {
        //    //eventos[name]();
        //    delete eventos[name];
        //    //eventos[name] = undefined
        //    //MyApp.cErr(eventos[name]);
        //    //eventos.splice(eventos.indexOf(name), 1);
        //    MyApp.cCustom2('Destroy event '+name, eventos);
        //    //$rootScope.$on(name, callback);
        //}
    };
});

MyApp.angular.config(function($provide) {
    $provide.decorator("$rootScope", function($delegate) {
        var eventos = [];

        var Scope = $delegate.constructor;
        var origOn = Scope.prototype.$on;
        var origBroadcast = Scope.prototype.$broadcast;
        var origEmit = Scope.prototype.$emit;

        Scope.prototype.$on = function() {
            MyApp.cEventDebug("$on was called on $scope " + this.$id + " with arguments:",
                arguments);
            return origOn.apply(this, arguments);
        };
        Scope.prototype.$broadcast = function() {
            MyApp.cEventDebug("$broadcast was called on $scope " + this.$id + " with arguments:",
                arguments);
            return origBroadcast.apply(this, arguments);
        };
        Scope.prototype.$emit = function() {
            MyApp.cEventDebug("$emit was called on $scope " + this.$id + " with arguments:",
                arguments);
            return origEmit.apply(this, arguments);
        };
        return $delegate;
    });
});