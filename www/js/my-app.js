/*jslint browser: true*/
/*global console, MyApp, angular, Framework7*/
var MyApp = {};

MyApp.config = {
};

MyApp.angular = angular.module('MyApp', []);

MyApp.fw7 = {
    app : new Framework7({
        animateNavBackIcon: true
    }),
    options : {
        dynamicNavbar: true,
        domCache: true
    },
    views : []
};

// Initialize your app
//var myApp = new Framework7({
//    animateNavBackIcon:true
//});

// Export selectors engine
var $$ = Dom7;

// Add main View
var mainView = MyApp.fw7.app.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: true,
    // Enable Dom Cache so we can use all inline pages
    domCache: true
});
