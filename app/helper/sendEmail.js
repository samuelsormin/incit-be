const nodemailer = require("nodemailer");

module.exports = async (payload) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: "noreplay@incittest.com",
        to: payload.receiver,
        subject: payload.subject,
        text: payload.text,
        html: payload.html,
    });

    console.log("Message sent: %s", info.messageId);
}
