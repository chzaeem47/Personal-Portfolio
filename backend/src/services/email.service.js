require('dotenv').config();
const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
    service : "gmail",
    auth:{
        type : 'OAUTH2',
        user : process.env.EMAIL_USER,
        clientId : process.env.CLIENT_ID,
        clientSecret : process.env.CLIENT_SECRET,
        refreshToken : process.env.REFRESH_TOKEN    
    },
});

transporter.verify((err,success)=>{
    if(err){
        console.log("Error while connecting to Email Server" , err)
    }else{
        console.log('Email server is Ready to send Messages')
    }
})

const sendEmail = async (to,subject,text,html)=>{

    try {
    const info = await transporter.sendMail({
      from: `"Mr. Zaeem Ahmad" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodeMailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

async function sendContactEmail(userEmail, name, description) {
    const subject = "Thanks for reaching out!";
    
    const text = `Hello ${name},\n\nThank you for visiting my portfolio and reaching out. I have received your message and will get back to you as soon as possible.\n\nBest regards,\nZaeem Ahmad\nFull-Stack Developer`;

    const html = `
<div style="margin: 0; padding: 0; background-color: #030014; font-family: Arial, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #030014; padding: 40px 10px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" style="max-width: 600px; background-color: #0b0d17; border: 1px solid #2e1065; border-top: 4px solid #06eeee; border-radius: 20px; overflow: hidden;" cellspacing="0" cellpadding="0" border="0">
                    
                    <tr>
                        <td style="padding: 40px 30px 20px 30px;">
                            <h1 style="margin: 0; font-size: 28px; color: #ffffff; letter-spacing: -0.5px; font-weight: bold;">
                                Zaeem Ahmad<span style="color: #06eeee;">.</span>
                            </h1>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 20px 30px 40px 30px;">
                            <h2 style="color: #c084fc; font-size: 22px; margin-bottom: 20px;">Hi ${name},</h2>
                            <p style="color: #94a3b8; line-height: 1.8; font-size: 16px; margin-bottom: 25px;">
                                I have received your transmission. Thank you for reaching out through my digital portfolio.
                            </p>
                            
                            <div style="background-color: rgba(6, 238, 238, 0.05); border-left: 3px solid #06eeee; padding: 15px 20px; margin: 30px 0;">
                                <p style="margin: 0; color: #06eeee; font-style: italic;">
                                    "Wielding JavaScript like lightning & bending servers to my will."
                                </p>
                            </div>

                            <p style="color: #94a3b8; line-height: 1.8; font-size: 16px; margin-bottom: 25px;">
                                I am currently reviewing your details. As a <strong>Full-Stack Sorcerer</strong>, I usually respond within 24 hours.
                            </p>
                            
                            <div style="text-align: center; margin: 40px 0;">
                                <a href="https://github.com/chzaeem47" style="background-color: #8b5cf6; background: linear-gradient(135deg, #06eeee 0%, #8b5cf6 100%); color: #ffffff; padding: 14px 35px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block;">
                                    Explore My Github
                                </a>
                            </div>

                            <p style="color: #94a3b8; font-size: 16px;">
                                Stay tuned,<br>
                                <span style="color: #06eeee; font-weight: bold;">Zaeem Ahmad</span>
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="background-color: #05060f; padding: 30px; text-align: center; border-top: 1px solid #1e293b;">
                            <p style="color: #475569; font-size: 12px; margin: 0;">Sahiwal, Pakistan | 2026</p>
                            <div style="margin-top: 15px;">
                                <a href="https://github.com/chzaeem47" style="color: #8b5cf6; text-decoration: none; margin: 0 10px; font-weight: bold;">GitHub</a>
                                <a href="https://linkedin.com/in/zaeem-ahmad-06a5a0363/" style="color: #8b5cf6; text-decoration: none; margin: 0 10px; font-weight: bold;">LinkedIn</a>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>
`;
await sendEmail(
  process.env.EMAIL_USER,
  `New Portfolio Message from ${name}`,
  `
Name: ${name}
Email: ${userEmail}
Message: ${description || "No message provided"}
  `,
  `
    <h2>New Portfolio Contact Message</h2>
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${userEmail}</p>
    <p><b>Message:</b></p>
    <p>${description || "No message provided"}</p>
  `
);

    await sendEmail(userEmail, subject, text, html);
}

module.exports = { sendContactEmail , transporter }