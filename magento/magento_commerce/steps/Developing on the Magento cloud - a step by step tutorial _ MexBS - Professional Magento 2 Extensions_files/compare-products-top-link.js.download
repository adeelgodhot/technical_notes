/**
 *
 * Copyright © 2015 TemplateMonster. All rights reserved.
 * See COPYING.txt for license details.
 *
 */
define([
    'jquery',
    'mage/translate',
    'Magento_Ui/js/modal/alert',
    'Magento_Ui/js/modal/modal',
    'Magento_Catalog/js/compare',
    'mage/loader'
],function($,$t,alert,modal) {
    'use strict';

    var isLoadCompareAjax = false;

    $.widget('tm.showCompareProduct',{

        productInCompareList: [],

        _create: function() {
            if(!compareProductAddAjax) {
                return false;
            }
            this._initProductCompareListArray();
            this._actionAddToCompare();
            this._actionCompare();
            this._actionPrint();
            this._actionRemoveProduct();
        },

        _actionCompare : function(){
            $('body').on('click','.action.compare',function(e){
                e.preventDefault();

                var href = $(e.currentTarget).attr('href');

                $.ajaxSetup({showLoader: true});
                $.post(href,function(data){
                    var compareProductBox = $('#productComparePopup');
                    compareProductBox.html('');
                    compareProductBox.html(data.content);
                    compareProductBox.modal();
                    compareProductBox.modal('openModal');
                }).fail(function(){
                    alert({
                        content: $t('Can not finish request.Try again.')
                    });
                });
                return false;
            });
        },

        _actionPrint : function(){
            //Print compare product
            $('body').on('click', '.action.print',function(e) {
                e.preventDefault();
                window.print();
            });

        },

        _actionRemoveProduct : function(){
            //  Add event for remove in modal compare product
            $('body').on('click','.cell.remove.product',function(e){

                if(isLoadCompareAjax) {return false;}
                isLoadCompareAjax = true;

                e.preventDefault();

                var index;
                index = $( ".cell.remove.product" ).index( this );
                var params = $(e.currentTarget).children('a').data('post');
                var postParams = params.data;

                postParams['form_key'] = $('input[name="form_key"]').val();

                $.ajaxSetup({showLoader: true});
                $.post(params.action,postParams,function(data){
                }).success(function(){
                    ++index; // Psevdo class nth-child starts count from 1
                    ++index; // Add Label product column
                    //Remove product information from modal window
                    $('#product-comparison .cell.product.attribute:nth-child(' + index + ')').remove();
                    $('#product-comparison .cell.product.info:nth-child(' + index + ')').remove();
                    $('#product-comparison .cell.remove.product:nth-child(' + index + ')').remove();
                }).fail(function(){
                    alert({
                        content: $t('Can not finish request.Try again.')
                    });
                }).always(function(){
                    isLoadCompareAjax = false;
                });
                return false;
            });
        },

        _actionAddToCompare : function(){
            $('body').on('click','a[data-post].tocompare', $.proxy(function(e){

                e.preventDefault();

                var params = $(e.currentTarget).data('post');
                var postParams = params.data;

                //Check if product is in compare list already.
                if($.inArray(postParams.product,this.productInCompareList) !== -1) {
                    alert({
                        content: $t('Current product is already in the comparison list.')
                    });
                    return false;
                }

                postParams['form_key'] = $('input[name="form_key"]').val();

                $.ajaxSetup({showLoader: true});
                $.post(params.action,postParams,function(data){
                    $('body').trigger('contentUpdated');
                }).fail(function(){
                    alert({
                        content: $t('Can not finish request.Try again.')
                    });
                });
                return false;
            },this));
        },

        _initProductCompareListArray: function()
        {
            //On init widget create array.
            this._getProductCompareArray();
            //Create array on ajax action.
            $(document).on('ajaxComplete', $.proxy(this._getProductCompareArray,this));
        },

        _getProductCompareArray: function() {
            var storage = $.localStorage;
            var cacheStorage = storage.get('mage-cache-storage');
            if(cacheStorage.hasOwnProperty('compare-products')) {
                var compareProduct = cacheStorage['compare-products'];
                this.productInCompareList = [];
                if(compareProduct.count !== 0) {
                    $.each(compareProduct.items,$.proxy(function(index,value){
                        if($.inArray(value.id,this.productInCompareList) === -1) {
                            this.productInCompareList.push(value.id);
                        }
                    },this));
                }
            }
        }

    });

    return $.tm.showCompareProduct;

});