/*jslint browser: true*/
/*global console, MyApp, angular, Framework7*/

// Export selectors engine
var $$ = Dom7;

var MyApp = {};

MyApp.config = {
};

// Set to "true" if you want the console.log messages to appear.
MyApp.sendLog = MyApp.sendLog || false ;
MyApp.sendEventDebug = MyApp.sendEventDebug || false ;
MyApp.sendEventLog = MyApp.sendEventLog || false ;
MyApp.sendControllerEnter = MyApp.sendControllerEnter || true ;
MyApp.sendCustom1 = MyApp.sendCustom1 || false ;
MyApp.sendCustom2 = MyApp.sendCustom2 || false ;
MyApp.sendDebug = MyApp.sendDebug || true ;
MyApp.sendErr = MyApp.sendErr || true ;

MyApp.cLog = function() { // only emits console.log messages if app.LOG != false
    if( MyApp.sendLog ) {
        var args = Array.prototype.slice.call(arguments, 0) ;
        console.log.apply(console, args) ;
    }
};
MyApp.cEventLog = function() { // only emits console.log messages if app.LOG != false
    if( MyApp.sendEventLog ) {
        var args = Array.prototype.slice.call(arguments, 0) ;
        console.log.apply(console, args) ;
    }
};

MyApp.cEventDebug = function() { // only emits console.log messages if app.LOG != false
    if( MyApp.sendEventDebug ) {
        var args = Array.prototype.slice.call(arguments, 0) ;
        console.debug.apply(console, args) ;
    }
};
MyApp.cControllerEnter = function() { // only emits console.log messages if app.LOG != false
    if( MyApp.sendControllerEnter ) {
        var args = Array.prototype.slice.call(arguments, 0) ;
        console.debug.apply(console, args) ;
    }
};
MyApp.cDebug = function() { // only emits console.log messages if app.LOG != false
    if( MyApp.sendDebug ) {
        var args = Array.prototype.slice.call(arguments, 0) ;
        console.debug.apply(console, args) ;
    }
};

MyApp.cCustom1 = function() { // only emits console.log messages if app.LOG != false
    if( MyApp.sendCustom1 ) {
        var args = Array.prototype.slice.call(arguments, 0) ;
        console.debug.apply(console, args) ;
    }
};

MyApp.cCustom2 = function() { // only emits console.log messages if app.LOG != false
    if( MyApp.sendCustom2 ) {
        var args = Array.prototype.slice.call(arguments, 0) ;
        console.debug.apply(console, args) ;
    }
};

MyApp.cErr = function() { // only emits console.log messages if app.LOG != false
    if( MyApp.sendErr ) {
        var args = Array.prototype.slice.call(arguments, 0) ;
        console.error.apply(console, args) ;
    }
};

// Initialize your app
$$(document).on('DOMContentLoaded', function() {
    MyApp.fw7 = {
        app: new Framework7({
            //precompileTemplates: true,
            template7Pages: true, //enable Template7 rendering for pages
            template7Data: {
                'url:html/pages/listaAssistenciaTemplate.html':{
                    count:'0',
                    total:'0',
                    supports:[]
                }
            },

            pushState: true,
            swipePanel: 'left',
            animateNavBackIcon: true
        }),
        options: {
            dynamicNavbar: true,
            domCache: true
        },
        views: []
    };

    // Add main View
    MyApp.mainView = MyApp.fw7.app.addView('.view-main', {
        // Enable dynamic Navbar
        dynamicNavbar: true,
        // Enable Dom Cache so we can use all inline pages
        domCache: true
    });
});

MyApp.angular = angular.module('MyApp', []);