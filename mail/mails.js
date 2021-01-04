const sgMail = require('@sendgrid/mail');
const Keys = require('../config/keys');

sgMail.setApiKey(Keys.sendGridKey);

async function welcomeMail(email, username) {
    await sgMail.send({
        to: email,
        from: 'oloobico@gmail.com',
        subject: 'Welcome to Dev Connector',
        text: `We are happy to see you ${username}.  Thank you for subscribing to Dev Connector`,
    });
}

async function passwordResetMail(email, token) {
    await sgMail.send({
        to: email,
        from: 'oloobico@gmail.com',
        subject: 'Reset Token',
        html: `
		<p>You made a password request.</p>
		<p>Click here <a href='${Keys.redirectDomain}/reset/${token}'>link<a/> to reset your password</p>
		<p>Please ignore if not you.</p>
		`,
    });
}

module.exports = {
    welcomeMail,
    passwordResetMail,
};
