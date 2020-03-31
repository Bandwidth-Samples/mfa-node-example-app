var express = require('express');
var router = express.Router();

/**
 * Router logic for the index page.
 *
 * In this 2FA example application, the index page server as a simple login
 * page.  The get route will load the `index.pug` view to render a login form.
 */

/**
 * Router logic to render the `index.pug` view
 */
router.get('/', (req, res) => {
  res.render('index', { error: false });
});

module.exports = router;
