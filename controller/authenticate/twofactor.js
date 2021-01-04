const exampleAppConfig = require('../../config');
const twofactor = require('@bandwidth/mfa');

// Configure the library to use the correct api credentials
twofactor.Configuration.basicAuthUserName = exampleAppConfig.apiUser;
twofactor.Configuration.basicAuthPassword = exampleAppConfig.apiPass;

/**
 * Craft an object required for the Bandwidth two-factor messaging service.  The
 * structure of the object follows
 *
 * {
 *   from: "string",
 *   to: "string",
 *   applicationId: "string",
 *   scope: "string"
 * }
 *
 * To learn more about each field, please refer to the documentation.
 * dev.bandwidth.com/mfa/methods/code/messaging.html
 *
 * @param phoneNumber a phone number to send an SMS with the 2fa code
 */
const sendSmsCode = async (phoneNumber) => {
    controller = twofactor.APIController;

    return await controller.createMessagingTwoFactor(exampleAppConfig.accountId,
      new twofactor.TwoFactorCodeRequestSchema({
        to: phoneNumber,
        applicationId: exampleAppConfig.applicationId,
        scope: 'authorization',
        message: 'Your temporary {NAME} {SCOPE} code is {CODE}'
      }));
};

/**
 * Craft an object required for the Bandwidth two-factor validation service.
 * The structure of the object follows
 *
 * {
 *   from: "string",
 *   to: "string",
 *   applicationId: "string",
 *   scope: "string",
 *   code: "string"
 * }
 *
 * To learn more about each field, please refer to the documentation.
 * dev.bandwidth.com/mfa/methods/code/verify.html
 *
 * @param user an user object with the phone number to send an SMS with the 2fa code
 */
const checkCode = async (user) => {
  controller = twofactor.APIController;

  return await controller.createVerifyTwoFactor(exampleAppConfig.accountId,
    new twofactor.TwoFactorVerifyRequestSchema({
      from: exampleAppConfig.phoneNumber,
      to: user.phone,
      applicationId: exampleAppConfig.applicationId,
      scope: 'authorization',
      code: user.code,
      digits: 6,
      expirationTimeInMinutes: 3
    }));
};

module.exports = {
    sendSmsCode,
    checkCode
};