const express = require('express');
const router = express.Router();
const login = require('../controller/authenticate/login');
const {sendSmsCode, checkCode} = require('../controller/authenticate/twofactor');

/**
 * Router logic for the user page
 *
 * The user page consist of two functions; one to initiate two factor and
 * another to server the main content.  The two-factor could be pulled out to
 * it's own page/file, but for the purpose of this example, it's in the same
 * router.
 */

/**
 * The route is directed to users who successfully logged in, and returns an
 * object that contains the phone number to use.  In this example, the
 * loginResult is of the format:
 *
 * { username: 'user@bandwidth.com', phone: '+19195551234' }
 *
 * The loginResult could be structured to any style.  It is the assumption of
 * this example project to have the "user" object contain the phone number to
 * use two-factor.
 *
 * DISCLAIMER: The credentials are being passed in the body, and may not be
 * sufficient for all use cases.  Please evaluate your security needs during
 * implementation.
 */
router.post('/login', (req, res) => {
    let loginResult = login(req.body.username, req.body.password);

    if (loginResult && sendSmsCode(loginResult.phone)) {
        res.render('twofactor', loginResult);
    } else {
        res.render('index', {error: true});
    }
});

/**
 * The route to direct the user to the user's homepage.  For this example app,
 * the view, `users.pug` displays a simple message stating your 2FA works!  The
 * router will direct the user based on the validity check from Bandwidth Two
 * Factor application.
 *
 * For the purpose of this example code, the successful and unsuccessful
 * two-factor redirect the user to the same view with different content.  It is
 * strongly advise to direct the user to two different views in production
 * codes.
 */
router.post('/home', async (req, res) => {
    let checkResult = await checkCode(req.body);

    if (checkResult && checkResult.valid) {
        res.render('users');
    } else {
        res.render('users', {error: "the code was invalid"});
    }
});

module.exports = router;