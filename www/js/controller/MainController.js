/*jslint browser: true*/
/*global console, MyApp*/
MyApp.angular.controller('MainController', [
    '$scope', '$compile', '$rootScope', 'DataService',
    function ($scope, $compile, $rootScope, DataService) {
        'use strict';
        MyApp.cControllerEnter('MainController');

        $scope.loadListaPage = function () {
            MyApp.fw7.app.showIndicator();

            DataService.getSupports().then(function (result){
                MyApp.cLog('Success:', result);
                MyApp.fw7.app.hideIndicator();

                $scope.supports = result.data._embedded.servico;
                $scope.supportsNext = result.data._links.next.href;
                $scope.supportsMax = result.data.total_items;

                // Will pass context with retrieved user name
                // to welcome page. Redirect to welcome page
                MyApp.mainView.router.load({
                    url: 'html/pages/listaAssistenciaTemplate.html',
                    context: {
                        count:$scope.supports.length,
                        total:result.data.total_items,
                        supports: $scope.supports
                    }
                });
            }, function (err){
                MyApp.cErr('Request Error', err);
            });
        };

        MyApp.fw7.app.onPageInit('listaAssistenciaTemplatePage', function (page) {
            MyApp.cLog('onPageInit listaAssistenciaTemplatePage');
            // Loading flag
            var loading = false;

            // Max items to load
            var maxItems = $scope.supportsMax;

            // Attach 'infinite' event handler
            $$('.infinite-scroll').on('infinite', function () {
                MyApp.cLog('infinite-scroll:');
                // Exit, if loading in progress
                if (loading) return;

                // Set loading flag
                loading = true;

                if ($scope.supportsNext != undefined)
                    DataService.getSupports($scope.supportsNext).then(function (result){
                        // Reset loading flag
                        loading = false;

                        if ($scope.supports.length >= maxItems) {
                            // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
                            MyApp.fw7.app.detachInfiniteScroll($$('.infinite-scroll'));
                            // Remove preloader
                            $$('.infinite-scroll-preloader').remove();
                        } else {
                            MyApp.cLog('Success:', result);
                            $scope.supports = $scope.supports.concat(result.data._embedded.servico);

                            MyApp.fw7.app.template7Data['url:html/pages/listaAssistenciaTemplate.html'] = {
                                count:$scope.supports.length,
                                total:result.data.total_items,
                                supports:$scope.supports
                            };
                            $scope.supportsNext = result.data._links.next.href;
                            MyApp.mainView.router.refreshPage();
                        }
                    }, function (err){
                        // Reset loading flag
                        loading = false;
                        MyApp.cErr('Request Error', err);
                    });
            });
        });
        MyApp.fw7.app.onPageBeforeInit('formAssistenciaTemplatePage', function (page) {
            //MyApp.cDebug('onPageBeforeInit formAssistenciaTemplatePage', page);
        });
        MyApp.fw7.app.onPageInit('formAssistenciaTemplatePage', function (page) {
            MyApp.cLog('onPageInit formAssistenciaTemplatePage');

            if ($scope.supports!=undefined){
                $scope.supports.forEach(function (item) {
                    //var testTemplate = $('script#template').html();
                    //var compiledTestTemplate = Template7.compile(testTemplate);
                    //var html = compiledSearchTemplate({/*...some data...*/});
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

            $$('#buttonAtualizar').on('click', function () {
                $scope.supports.forEach(function (item) {
                    if (item.id==page.query.item){
                        MyApp.fw7.app.showIndicator();

                        DataService.postSupport({
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
                            MyApp.fw7.app.alert('Registro atualizado ID: '+result.data.id, 'Atualizado', $scope.loadListaPage);

                        }, function (err){
                            // Reset loading flag
                            MyApp.fw7.app.hideIndicator();
                            MyApp.cErr('Request Error', err);
                        });
                    }
                });
            });
        });

        // Function to handle Submit button on Register page
        $$('#listaAssistenciaLink').on('click', $scope.loadListaPage);
    }
]);