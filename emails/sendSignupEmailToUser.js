import { transporter } from "../config/nodemailer.js";

export async function sendSignUpEmailToUser(userEmail, userName) {
  try {
    const mailOptions = {
      from: `"Alkaram Cloths House" <no-reply@alkaramcloths.com>`,
      to: userEmail,
      subject: "🎉 Welcome to Alkaram Cloths House!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f7f7f7;">
          <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.08);">
            
            <div style="background: #1f2937; padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">Alkaram Cloths House</h1>
            </div>

            <div style="padding: 25px;">
              <h2 style="color: #333;">Hi ${userName}, 👋</h2>
              <p style="color: #555; line-height: 1.6; font-size: 16px;">
                We're excited to welcome you to <b>Alkaram Cloths House</b>!  
                Your account has been created successfully.  
              </p>

              <p style="color: #555; line-height: 1.6; font-size: 16px;">
                Get ready to explore premium quality fabrics, stylish suits, and 
                seasonal collections crafted just for you.
              </p>

              <div style="text-align: center; margin: 25px 0;">
                <a href="http://localhost:5173"
                  style="background: #2563eb; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-size: 16px;">
                  Visit Store
                </a>
              </div>

              <p style="color: #777; font-size: 14px;">
                If you didn’t sign up, please ignore this email.
              </p>
            </div>

            <div style="background: #f1f1f1; padding: 15px; text-align: center; font-size: 13px; color: #555;">
              © ${new Date().getFullYear()} Alkaram Cloths House. All rights reserved.
            </div>

          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
  }
}
