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
                        if (item.patrocinado) $$("#patrocinado").prop("checked", true);
                        else $$("#patrocinado").prop("checked", false);
                        $$(page.container).find('#nome').val(item.nome);
                        $$(page.container).find('#descricao').val(item.descricao);
                        $$(page.container).find('#email').val(item.email);
                        $$(page.container).find('#telefone').val(item.telefone);
                        $$(page.container).find('#site').val(item.site);
                        $$(page.container).find('#endereco').val(item.endereco);
                        $$(page.container).find('#bairro').val(item.bairro);
                        $$(page.container).find('#cidade').val(item.cidade);
                        $$(page.container).find('#estado').val(item.estado);
                        $$(page.container).find('#cep').val(item.cep);
                        $$(page.container).find('#complemento').val(item.complemento);
                    }
                });
            }

            MyApp.validate = function () {
                var nome = $$(page.container).find('#nome').val();
                if (nome.length>0) return true;
                else {
                    MyApp.fw7.app.alert('Digite um nome válido', 'Atenção');
                    return false;
                }
            };

            MyApp.clickButtonCriar = function () {
                MyApp.cLog('clickButtonCriar');
                if (MyApp.validate()){
                    MyApp.fw7.app.showIndicator();
                    DataService.createSupport({
                        patrocinado:$$("#patrocinado").prop("checked"),
                        nome:$$(page.container).find('#nome').val(),
                        descricao:$$(page.container).find('#descricao').val(),
                        email:$$(page.container).find('#email').val(),
                        telefone:$$(page.container).find('#telefone').val(),
                        site:$$(page.container).find('#site').val(),
                        endereco:$$(page.container).find('#endereco').val(),
                        bairro:$$(page.container).find('#bairro').val(),
                        cidade:$$(page.container).find('#cidade').val(),
                        estado:$$(page.container).find('#estado').val(),
                        cep:$$(page.container).find('#cep').val(),
                        complemento:$$(page.container).find('#complemento').val()
                    }).then(function (result){
                        MyApp.cLog('Success:', result);
                        MyApp.fw7.app.hideIndicator();
                        MyApp.fw7.app.alert('Registro criado ID: '+result.data.id, 'Criado', function () {
                            //MyApp.mainView.router.refreshPage();
                            listaAssistenciaService.loadPage();
                        });
                    }, function (err){
                        // Reset loading flag
                        MyApp.fw7.app.hideIndicator();
                        MyApp.cErr('Request Error', err);
                        MyApp.fw7.app.alert('Falha na requisição: '+err.statusText, 'Erro');
                    });
                }
            };

            MyApp.clickButtonAtualizar = function () {
                MyApp.cLog('clickButtonAtualizar');
                if (DataService.supports.length>0){
                    DataService.supports.forEach(function (item) {
                        if (item.id==$$(page.container).find('#id').val()){
                            MyApp.fw7.app.showIndicator();
                            //console.log($$('#patrocinado').val());
                            //console.log($$('#patrocinado').prop("checked"));
                            //console.log($$('#patrocinado').checked());
                            DataService.updateSupport($$(page.container).find('#id').val(), {
                                patrocinado:$$("#patrocinado").prop("checked"),
                                nome:$$(page.container).find('#nome').val(),
                                descricao:$$(page.container).find('#descricao').val(),
                                email:$$(page.container).find('#email').val(),
                                telefone:$$(page.container).find('#telefone').val(),
                                site:$$(page.container).find('#site').val(),
                                endereco:$$(page.container).find('#endereco').val(),
                                bairro:$$(page.container).find('#bairro').val(),
                                cidade:$$(page.container).find('#cidade').val(),
                                estado:$$(page.container).find('#estado').val(),
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
                                MyApp.fw7.app.alert('Falha na requisição: '+err.statusText, 'Erro');
                            });
                        }
                    });
                }
            };
        };

        pub.loadPage = function () {
            MyApp.mainView.router.load({
                url: 'html/pages/formAssistenciaTemplate.html',
                context: {
                    criar: true
                }
            });
        };

        return pub;
    }
]);