import { transporter } from "../config/nodemailer.js";


export async function sendVerificationEmail(toEmail, code) {
  const htmlTemplate = `
  <div class="bg-gray-100 p-6 flex justify-center items-center font-sans">
    <div class="bg-white rounded-2xl shadow-lg max-w-md w-full p-6">
      <h1 class="text-3xl font-bold text-red-400 text-center mb-4">Alkaram Cloth House</h1>
      <p class="text-gray-700 text-center mb-6">
        Your verification code is:
      </p>
      <div class="bg-red-100 text-red-700 font-bold text-2xl text-center py-3 rounded-lg mb-6">
        ${code}
      </div>
      <p class="text-gray-500 text-center text-sm">
        This code will expire in 10 minutes.
      </p>
      <p class="text-gray-400 text-center text-xs mt-4">
        If you didn’t request this code, please ignore this email.
      </p>
    </div>
  </div>
  `;

  const mailOptions = {
    from: `"Alkaram Cloths House" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your Verification Code",
    html: htmlTemplate,
  };

  try {
    await transporter.sendMail(mailOptions);
    
  } catch (err) {
  }
}
