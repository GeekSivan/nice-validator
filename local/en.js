/*********************************
 * Themes, rules, and i18n support
 * Locale: English
 *********************************/
(function(factory) {
    if (typeof define === 'function') {
        define(function(require, exports, module){
            var $ = require('jquery'); $._VALIDATOR_URI = module.uri;
            require('../jquery.validator')($);
            factory($);
        });
    } else {
        factory(jQuery);
    }
}(function($) {
    /* Global configuration
     */
    $.validator.config({
        //stopOnError: true,
        //focusCleanup: true,
        //theme: 'yellow_right',
        //timely: 2,
        defaultMsg: "This field is not valid.",
        loadingMsg: "Validating...",
        
        // Custom rules
        rules: {
            digits: [/^\d+$/, "Please enter only digits."]
            ,letters: [/^[a-z]+$/i, "Please enter only letters."]
            ,date: [/^\d{4}-\d{1,2}-\d{1,2}$/, "Please enter a valid date, format: yyyy-mm-dd"]
            ,time: [/^([01]\d|2[0-3])(:[0-5]\d){1,2}$/, "Please enter a valid time, between 00:00 and 23:59"]
            ,email: [/^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i, "Please enter a valid email address."]
            ,url: [/^(https?|s?ftp):\/\/\S+$/i, "Please enter a valid URL."]
            ,accept: function (element, params){
                if (!params) return true;
                var ext = params[0];
                return (ext === '*') ||
                       (new RegExp(".(?:" + ext + ")$", "i")).test(element.value) ||
                       this.renderMsg("Only accept {1} file extension.", ext.replace(/\|/g, ', '));
            }
            
        }
    });

    /* Default error messages
     */
    $.validator.config({
        messages: {
            error: "Network Error.",
            timeout: "Request timed out.",
            required: "This field is required.",
            remote: "Please try another name.",
            integer: {
                '*': "Please enter an integer.",
                '+': "Please enter a positive integer.",
                '+0': "Please enter a positive integer or 0.",
                '-': "Please enter a negative integer.",
                '-0': "Please enter a negative integer or 0."
            },
            match: {
                eq: "{0} must be equal to {1}.",
                neq: "{0} must be not equal to {1}.",
                lt: "{0} must be less than {1}.",
                gt: "{0} must be greater than {1}.",
                lte: "{0} must be less than or equal to {1}.",
                gte: "{0} must be greater than or equal to {1}."
            },
            range: {
                rg: "Please enter a number between {1} and {2}.",
                gte: "Please enter a number greater than or equal to {1}.",
                lte: "Please enter a number less than or equal to {1}."
            },
            checked: {
                eq: "Please check {1} items.",
                rg: "Please check between {1} and {2} items.",
                gte: "Please check at least {1} items.",
                lte: "Please check no more than {1} items."
            },
            length: {
                eq: "Please enter {1} characters.",
                rg: "Please enter a value between {1} and {2} characters long.",
                gte: "Please enter at least {1} characters.",
                lte: "Please enter no more than {1} characters.",
                eq_2: "",
                rg_2: "",
                gte_2: "",
                lte_2: ""
            }
        }
    });

    /* Themes
     */
    var TPL_ICON = '<span class="n-arrow"><b>◆</b><i>◆</i></span><span class="n-icon"></span>';
    $.validator.setTheme({
        'simple_right': {
            formClass: 'n-simple',
            msgClass: 'n-right'
        },
        'simple_bottom': {
            formClass: 'n-simple',
            msgClass: 'n-bottom'
        },
        'yellow_top': {
            formClass: 'n-yellow',
            msgClass: 'n-top',
            msgIcon: TPL_ICON
        },
        'yellow_right': {
            formClass: 'n-yellow',
            msgClass: 'n-right',
            msgIcon: TPL_ICON
        },
        'yellow_right_effect': {
            formClass: 'n-yellow',
            msgClass: 'n-right',
            msgIcon: TPL_ICON,
            msgShow: function($msgbox, type){
                var $el = $msgbox.children();
                if ($el.is(':animated')) return;
                if (type === 'error') {
                    $el.css({
                        left: '20px',
                        opacity: 0
                    }).delay(100).show().stop().animate({
                        left: '-4px',
                        opacity: 1
                    }, 150).animate({
                        left: '3px'
                    }, 80).animate({
                        left: 0
                    }, 80);
                } else {
                    $el.css({
                        left: 0,
                        opacity: 1
                    }).fadeIn(200);
                }
            },
            msgHide: function($msgbox, type){
                var $el = $msgbox.children();
                $el.stop().delay(100).show().animate({
                    left: '20px',
                    opacity: 0
                }, 300, function(){
                    $msgbox.hide();
                });
            }
        }
    });
}));