/*jslint browser: true*/
/*global console, MyApp*/
MyApp.angular.controller('MainController', [
    'formAssistenciaService', 'listaAssistenciaService',
    function (formAssistenciaService, listaAssistenciaService) {
        'use strict';
        MyApp.cControllerEnter('MainController');

        $$('#listaAssistenciaLink').on('click', listaAssistenciaService.loadPage);
        $$('#criarAssistenciaLink').on('click', formAssistenciaService.loadPage);

        MyApp.fw7.app.onPageInit('listaAssistenciaTemplatePage', function (page) {
            MyApp.cLog('onPageInit listaAssistenciaTemplatePage');
            listaAssistenciaService.onPageInit();
        });

        MyApp.fw7.app.onPageInit('formAssistenciaTemplatePage', function (page) {
            MyApp.cLog('onPageInit formAssistenciaTemplatePage');
            formAssistenciaService.onPageInit(page);
        });

    }
]);