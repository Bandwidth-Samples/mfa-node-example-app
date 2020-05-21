# Bandwidth Two Factor Node Example Application


## Overview
This example application is built to show how to add [Bandwidth multi-factor authentication](dev.bandwidth.com/mfa/about.html) into a simple Node project.  The example application is built on top of Express and other popular javascript libraries.  This project is by no mean a production ready project, please evaluate your individual needs and requirements.

## Requirements

The example application will make use of the following:

* Bandwidth Account with Two-factor enabled
* An active phone to receive the SMS two-factor code

## Using the application

The following steps will guide you to using this example application

1. Obtain a Bandwidth Account with Two-factor enabled, and gather the following 
    * A Bandwidth Api user (username/password)
    * A Bandwidth Account Id associated with two-factor
    * A Bandwidth Application Id associated with two-factor
    * A Bandwidth Phone number provisioned for two-factor
2. Modify `config.js` in the root directory with your information
3. Modify `config.js` `phoneNumToDialTo` to a phone number to receive the code
4. Install dependencies `npm install`
5. Run the Express server `npm start`
6. navigate to `localhost:3000` in a browser
7. Login with `user@bandwidth.com` and `password`, these values are defined in `login.js`