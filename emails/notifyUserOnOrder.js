import { transporter } from "../config/nodemailer.js";

export async function notifyUserOnEmail(userEmail, userName, transactionId, payment) {
  const shopName = "Alkaram Collections";

  const subject = `Your Order is Confirmed – ${shopName}`;

  const htmlContent = `
  <div style="font-family: 'Arial', sans-serif; background-color: #f8f9fa; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden;">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #ff3c3c, #d00000); padding: 25px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 26px; letter-spacing: 1px;">${shopName}</h1>
        <p style="margin-top: 5px; font-size: 14px;">Order Confirmation</p>
      </div>

      <!-- Body -->
      <div style="padding: 30px;">
        <p style="font-size: 16px; color: #333;">Hi <strong>${userName}</strong>,</p>

        <p style="font-size: 15px; color: #555;">
          Thank you for shopping with <strong>${shopName}</strong>! 🎉  
          Your order has been successfully received and is now being processed.
        </p>

        <div style="margin: 25px 0; padding: 20px; background: #f1f5f9; border-left: 5px solid #ff3c3c; border-radius: 8px;">
          <p style="margin: 0; font-size: 16px; color: #333;"><strong>Order Details:</strong></p>
          <p style="margin: 8px 0; font-size: 15px;">Transaction ID: <strong>${transactionId}</strong></p>
          <p style="margin: 8px 0; font-size: 15px;">Payment: <strong>PKR ${payment}</strong></p>
        </div>

        <p style="font-size: 15px; color: #555;">
          You will receive another update once your order is shipped.
        </p>

        <div style="text-align: center; margin-top: 30px;">
          <a href="#"
            style="background-color: #ff3c3c; padding: 12px 22px; color: #fff; text-decoration: none; border-radius: 6px; font-size: 15px; display: inline-block;">
            View Order Status
          </a>
        </div>

        <p style="margin-top: 25px; font-size: 14px; color: #777;">
          If you have any questions, simply reply to this email — we're always here to help!
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f8f9fa; text-align: center; padding: 15px; font-size: 12px; color: #666;">
        © ${new Date().getFullYear()} ${shopName}. All rights reserved.
      </div>
    </div>
  </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"${shopName}" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject,
      html: htmlContent
    });

    return true;

  } catch (error) {
    return false;
  }
}
