import { transporter } from "../config/nodemailer.js";

export async function sendEmailToAdminForNotifyOrder(userName, paymentAmount) {
  const shopName = "Alkaram Collections";


  // 2️⃣ Email subject and HTML content
  const subject = `New Order Received - ${shopName}`;

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      
      <div style="background-color: #2563EB; color: white; text-align: center; padding: 20px;">
        <h1 style="margin: 0; font-size: 24px;">${shopName}</h1>
        <p style="margin: 5px 0 0;">New Order Notification</p>
      </div>
      
      <div style="padding: 20px; color: #333;">
        <p>Dear Admin,</p>
        <p>You have received a <strong>new order</strong> from <strong>${userName}</strong>.</p>
        <p><strong>Payment Amount:</strong> PKR ${paymentAmount}</p>
        <p>Please check your admin panel to view the order details and take necessary action.</p>
        <p style="margin-top: 30px;">Thank you,<br/>${shopName} Team</p>
      </div>

      <div style="background-color: #f4f4f4; color: #555; text-align: center; padding: 10px; font-size: 12px;">
        &copy; ${new Date().getFullYear()} ${shopName}. All rights reserved.
      </div>
      
    </div>
  </div>
  `;

  // 3️⃣ Send email
  try {
    const info = await transporter.sendMail({
      from: `"${shopName}" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject,
      html: htmlContent
    });


    return true;
  } catch (error) {
    return false;
  }
}
