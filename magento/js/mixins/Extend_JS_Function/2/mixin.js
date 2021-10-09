define([
    'mage/utils/wrapper',
    'Custom_Checkout/js/action/fraud-detection'
], function (wrapper, serviceFraudDetection) {
    'use strict';

    /**
     * Intercept click on "Next" button in checkout
     * to validate and save service input values.
     */
    return function (placeOrder) {
        return wrapper.wrap(placeOrder, function (originalAction, paymentData, messageContainer) {
            //return serviceFraudDetection().done(originalAction);
            return serviceFraudDetection(paymentData)
            .done(
                function (response) {
                    console.log(response);
                    var redirect = response[0].redirect;

                    if(redirect != '') {
                        window.location.href = redirect;
                    }
                    originalAction(paymentData, messageContainer);
                }
            );
        });
    }
});
