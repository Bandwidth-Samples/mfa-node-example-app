const axios = require('axios');
const exampleAppConfig = require('../../config');

/**
 * Craft a `text2fa` object required for the Bandwidth two-factor service.  The
 * structure of the object follows
 *
 *  {
 *      "to": "<<E164 Number>>",
 *      "from": "<<E164 Number>>",
 *      "applicationId": "<<ApplicationId>>",
 *      "scope": "<<scope>>"
 *  }
 *
 * DISCLAIMER: For the sake of simplicity, the example app uses "testing" as the
 * action.  Please read the official two-factor service documentation to
 * determine the proper action to take.
 *
 * @param phoneNumber a phone number to send an SMS with the 2fa code
 */
const sendSmsCode = async (phoneNumber) => {
    await axios.post(
        exampleAppConfig.twofactorUrl(exampleAppConfig.accountId, "messaging"),
        {
            to: phoneNumber,
            from: exampleAppConfig.phoneNumber,
            applicationId: exampleAppConfig.applicationId,
            scope: "example"
        },
        {
            auth: {
                username: exampleAppConfig.apiUser,
                password: exampleAppConfig.apiPass
            }
        })
    .then(function (response) {
        return true;
    })
    .catch(function (error) {
        console.log(error);
        return false;
    });
};

/**
 * Craft a `check2fa` object required for the Bandwidth two-factor service.  The
 * structure of the object follows
 *
 *  {
 *      "to": "<<E164 Number>>",
 *      "from": "<<E164 Number>>",
 *      "applicationId": "<<ApplicationId>>",
 *      "scope": "<<scope>>",
 *      "code": "<<code>>"
 *  }
 *
 * DISCLAIMER: For the sake of simplicity, the example app uses "testing" as the
 * action.  Please read the official two-factor service documentation to
 * determine the proper action to take.
 *
 * @param user an user object with the phone number to send an SMS with the 2fa code
 */
const checkCode = async (user) => {
    const response = await axios.post(
        exampleAppConfig.twofactorUrl(exampleAppConfig.accountId, "verify"),
        {
            to: user.phone,
            from: exampleAppConfig.phoneNumber,
            applicationId: exampleAppConfig.applicationId,
            scope: "example",
            code: user.code
        },
        {
            auth: {
                username: exampleAppConfig.apiUser,
                password: exampleAppConfig.apiPass
            }
        });

    return response.data;
};

module.exports = {
    sendSmsCode,
    checkCode
};