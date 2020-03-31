const axios = require('axios');
const exampleAppConfig = require('../../config');

/**
 * Craft a `text2fa` object required for the Bandwidth two-factor service.  The
 * structure of the object follows
 *
 * Text2FA: [
 *  {AccountId: [<<accountId>>]},
 *  {ApplicationId: [<<ApplicationId>>]},
 *  {action: [<<action>>]},
 *  {To: [
 *      {PhoneNum: [<<phoneNumber>>]}
 *  ]},
 *  {From: [
 *      {PhoneNum: [<<phoneNumber>>]}
 *  ]}
 * ]
 *
 * DISCLAIMER: For the sake of simplicity, the example app uses "testing" as the
 * action.  Please read the official two-factor service documentation to
 * determine the proper action to take.
 *
 * @param phoneNumber a phone number to send an SMS with the 2fa code
 */
const sendSmsCode = async (phoneNumber) => {
    const text2fa = {
        Text2FA: [{
            AccountId: [exampleAppConfig.accountId]
        }, {
            ApplicationId: [exampleAppConfig.applicationId]
        }, {
            Action: ["testing"]
        }, {
            To: [{
                PhoneNum: [phoneNumber]
            }]
        }, {
            From: [{
                PhoneNum: [exampleAppConfig.phoneNum]
            }]
        }]
    };

    await axios.post(
        exampleAppConfig.twofactorUrl,
        text2fa,
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
 * Check2FA: [
 *  {AccountId: [<<accountId>>]},
 *  {ApplicationId: [<<ApplicationId>>]},
 *  {action: [<<action>>]},
 *  {To: [
 *      {PhoneNum: [<<phoneNumber>>]}
 *  ]},
 *  {From: [
 *      {PhoneNum: [<<phoneNumber>>]}
 *  ]},
 *  <<pinCode>>
 * ]
 *
 * DISCLAIMER: For the sake of simplicity, the example app uses "testing" as the
 * action.  Please read the official two-factor service documentation to
 * determine the proper action to take.
 *
 * @param user an user object with the phone number to send an SMS with the 2fa code
 */
const checkCode = async (user) => {
    const check2fa = {
        CheckCode: [{
            AccountId: [exampleAppConfig.accountId]
        }, {
            ApplicationId: [exampleAppConfig.applicationId]
        }, {
            Action: ["testing"]
        }, {
            To: [{
                PhoneNum: [user.phone]
            }]
        }, {
            From: [{
                PhoneNum: [exampleAppConfig.phoneNum]
            }]
        }, user.code
        ]
    };

    const response = await axios.post(
        exampleAppConfig.twofactorUrl,
        check2fa,
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