const exampleAppConfig = require('../../config');

/**
 * This example login function mocks a simple user system, checking a hardcoded
 * user. In a real production setting, this would be replaced with your actual
 * login system.
 *
 * It is important to note that the phone number is in E.164 format.
 */
const login = (user, password) => {
    return (user === "user@bandwidth.com" && password === "password") ? {
        username: 'user@bandwidth.com',
        phone: exampleAppConfig.phoneNumberToDialTo
    } : false;
};

module.exports = login;