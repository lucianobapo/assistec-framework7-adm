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

        MyApp.getFormAssistenciaData = function () {
            var data = {
                perfil:$$("#perfil").val(),
                fotoLogo:$$('#fotoLogo').val(),
                fotoCapa:$$('#fotoCapa').val(),
                nome:$$('#nome').val(),
                descricao:$$('#descricao').val(),
                email:$$('#email').val(),
                telefone:$$('#telefone').val(),
                site:$$('#site').val(),
                endereco:$$('#endereco').val(),
                bairro:$$('#bairro').val(),
                cidade:$$('#cidade').val(),
                estado:$$('#estado').val(),
                cep:$$('#cep').val(),
                complemento:$$('#complemento').val()
            };
            console.log(data);
            return data;
        };

        MyApp.validate = function () {
            var nome = $$('#nome').val();
            if (nome.length>0) return true;
            else {
                MyApp.fw7.app.alert('Digite um nome válido', 'Atenção');
                return false;
            }
        };

        MyApp.clickButtonAtualizar = function () {
            MyApp.cLog('clickButtonAtualizar');
            var id = $$('#id').val();
            if (MyApp.validate() && id>0){
                MyApp.fw7.app.showIndicator();
                DataService.updateSupport(id, MyApp.getFormAssistenciaData()).then(function (result){
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
        };

        MyApp.clickButtonCriar = function () {
            MyApp.cLog('clickButtonCriar');
            if (MyApp.validate()){
                MyApp.fw7.app.showIndicator();
                DataService.createSupport(MyApp.getFormAssistenciaData()).then(function (result){
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

        pub.addEventListener = function (eventName, listener) {
            eventListeners[eventName].push(listener);
        };

        pub.onPageInit = function (page) {
            if (DataService.supports.length>0){
                DataService.supports.forEach(function (item) {
                    if (item.id==page.query.item){
                        // And insert generated list to page content
                        $$(page.container).find('#id').val(item.id);
                        $$(page.container).find('#perfil').val(item.perfil);
                        $$(page.container).find('#fotoLogo').val(item.fotoLogo);
                        $$(page.container).find('#fotoCapa').val(item.fotoCapa);
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