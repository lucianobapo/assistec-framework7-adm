/*jslint browser: true*/
/*global console, MyApp*/
MyApp.angular.controller('MainController', [
    'formAssistenciaService', 'listaAssistenciaService', 'listaCidadesService',
    function (formAssistenciaService, listaAssistenciaService, listaCidadesService) {
        'use strict';
        MyApp.cControllerEnter('MainController');

        $$('#listaAssistenciaLink').on('click', listaAssistenciaService.loadPage);
        $$('#listaCidadesLink').on('click', listaCidadesService.loadPage);

        MyApp.fw7.app.onPageInit('listaCidadesTemplatePage', function (page) {
            MyApp.cLog('onPageInit listaCidadesTemplatePage');
            listaCidadesService.onPageInit();
        });

        MyApp.fw7.app.onPageInit('listaAssistenciaTemplatePage', function (page) {
            MyApp.cLog('onPageInit listaAssistenciaTemplatePage');
            listaAssistenciaService.onPageInit();
        });

        //MyApp.fw7.app.onPageBeforeInit('formAssistenciaTemplatePage', function (page) {
        //    //MyApp.cDebug('onPageBeforeInit formAssistenciaTemplatePage', page);
        //});

        MyApp.fw7.app.onPageInit('formAssistenciaTemplatePage', function (page) {
            MyApp.cDebug('onPageInit formAssistenciaTemplatePage');
            formAssistenciaService.onPageInit(page);
        });
    }
]);