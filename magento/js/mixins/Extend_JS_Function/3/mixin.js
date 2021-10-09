define([
    'mage/utils/wrapper',
    'Custom_Checkout/js/action/fraud-detection'
], function (wrapper, serviceFraudDetection) {
    'use strict';

    /**
     * Intercept click on "Next" button in checkout
     * to validate and save service input values.
     */
    return function (setShippingInformationAction) {
        return wrapper.wrap(setShippingInformationAction, function (originalAction) {
            //return serviceFraudDetection().done(originalAction);
            return serviceFraudDetection()
            .done(
                function (response) {
                    console.log(response);
                    var redirect = response[0].redirect;

                    if(redirect != '') {
                        window.location.href = redirect;
                    }
                    originalAction();
                }
            );
        });
    }
});
