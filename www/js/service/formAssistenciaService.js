/*jslint browser: true*/
/*global console, Framework7, MyApp, $document*/

MyApp.angular.factory('formAssistenciaService', [
    'DataService', 'listaAssistenciaService',
    function (DataService, listaAssistenciaService) {
        'use strict';

        var pub = {};
        var eventListeners = {
            'ready': []
        };

        pub.addEventListener = function (eventName, listener) {
            eventListeners[eventName].push(listener);
        };

        pub.onPageInit = function (page) {
            if (DataService.supports.length>0){
                DataService.supports.forEach(function (item) {
                    if (item.id==page.query.item){
                        // And insert generated list to page content
                        $$(page.container).find('#id').val(item.id);
                        $$(page.container).find('#nome').val(item.nome);
                        $$(page.container).find('#descricao').val(item.descricao);
                        $$(page.container).find('#email').val(item.email);
                        $$(page.container).find('#telefone').val(item.telefone);
                        $$(page.container).find('#site').val(item.site);
                        $$(page.container).find('#endereco').val(item.endereco);
                        $$(page.container).find('#bairro').val(item.bairro);
                        $$(page.container).find('#cep').val(item.cep);
                        $$(page.container).find('#complemento').val(item.complemento);
                    }
                });
            }

            MyApp.clickButtonAtualizar = function () {
                MyApp.cLog('clickButtonAtualizar');
                if (DataService.supports.length>0){
                    DataService.supports.forEach(function (item) {
                        if (item.id==$$(page.container).find('#id').val()){
                            MyApp.fw7.app.showIndicator();
                            DataService.updateSupport($$(page.container).find('#id').val(), {
                                //id:$$(page.container).find('#id').val(),
                                cidade_id:1,
                                nome:$$(page.container).find('#nome').val(),
                                descricao:$$(page.container).find('#descricao').val(),
                                email:$$(page.container).find('#email').val(),
                                telefone:$$(page.container).find('#telefone').val(),
                                site:$$(page.container).find('#site').val(),
                                endereco:$$(page.container).find('#endereco').val(),
                                bairro:$$(page.container).find('#bairro').val(),
                                cep:$$(page.container).find('#cep').val(),
                                complemento:$$(page.container).find('#complemento').val()
                            }).then(function (result){
                                MyApp.cLog('Success:', result);
                                MyApp.fw7.app.hideIndicator();
                                MyApp.fw7.app.alert('Registro atualizado ID: '+result.data.id, 'Atualizado', function () {
                                    //MyApp.mainView.router.refreshPage();
                                    listaAssistenciaService.loadPage();
                                });
                            }, function (err){
                                // Reset loading flag
                                MyApp.fw7.app.hideIndicator();
                                MyApp.cErr('Request Error', err);
                            });
                        }
                    });
                }
            };
        };

        return pub;
    }
]);