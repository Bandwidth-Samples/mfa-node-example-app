/**
 * The configuration listed below are required for the example application to
 * function correctly.  It is also recommended in the production version of any
 * two-factor application to have these configuration elsewhere that makes more
 * sense for your project.
 */
module.exports = {
    /**
     * The Bandwidth API username.  Please consult with your Bandwidth
     * representative to create one.
     */
    apiUser: '',

    /**
     * The Bandwidth API password.  Please consult with your Bandwidth
     * representative to create one.
     */
    apiPass: '',

    /**
     * The Bandwidth AccountId with two-factor enabled.  Please consult with
     * your Bandwidth representative to create one.
     */
    accountId: '',

    /**
     * The Bandwidth applicationId with two-factor enabled.  Please consult with
     * your Bandwidth representative to create one.
     */
    applicationId: '',

    /**
     * The Bandwidth phone number provisioned for two-factor.  Please consult
     * with your Bandwidth representative to provision one.
     *
     * The format for the phone number must be in an E.164 format.
     */
    phoneNum: '',

    /**
     * The URL of the two factor application.  This value is only required if
     * you do not plan on using the SDK.  It is, however, strongly recommended
     * you use the SDK.
     */
    twofactorUrl: 'https://mfa.bandwidth.com/app/two-factor',

    /**
     * The phone number to dial out to.  The pins from two-factor will be sent
     * to this phone number.
     *
     * The format for the phone number must be in an E.164 format.
     */
    phoneNumToDialTo: ''
};